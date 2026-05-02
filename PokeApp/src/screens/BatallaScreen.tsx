import { ImageBackground, View, useWindowDimensions } from "react-native";
import { useMemo, useCallback } from "react";
import BattleHUD from "../components/BattleHUD";
import PokemonAvatar from "../components/PokemonAvatar";
import HPBar from "../components/HPBar";
import { usePokemonsContext } from "../hooks/usePokemonsContext";
import { useTheme } from "../hooks/useTheme";
import { makeStyles } from "../utils/styles";
import { useSoundSettings } from "../hooks/useSoundSettings";
import { useBattleAudio } from "../hooks/useBattleAudio";
import { useBattleState } from "../hooks/useBattleState";
import type { Pokemon } from "../types/pokemon";
import type { BatallaScreenProps } from "../types/navigation";

// ── Battle layout constants (fractions of screen size) ───────────────────────
const LAYOUT = {
    top:    { centerY: 0.375, xStart: 0.15, xEnd: 1 },
    bottom: { centerY: 0.75,  xStart: 0,    xEnd: 0.85 },
} as const;

const AVATAR_SIZE = 108;
const HP_BAR_OFFSET = 12; // px gap between avatar edge and HP bar

function platformPositions(
    pokemons: Pokemon[],
    zone: { centerY: number; xStart: number; xEnd: number },
    screenW: number,
    screenH: number,
): { top: number; left: number }[] {
    const n = pokemons.length;
    return pokemons.map((_, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const cx = (zone.xStart + t * (zone.xEnd - zone.xStart)) * screenW;
        const cy = zone.centerY * screenH;
        return { top: cy - AVATAR_SIZE / 2, left: cx - AVATAR_SIZE / 2 };
    });
}

function pickRandom(pool: Pokemon[], count: number): Pokemon[] {
    return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
}

export function BatallaScreen({ navigation }: BatallaScreenProps) {
    const { theme } = useTheme();
    const s = makeStyles(theme);
    const { pokemons, isLoading } = usePokemonsContext();
    const { width, height } = useWindowDimensions();
    const { playHuir } = useSoundSettings();

    // Pick random combatants once per battle (stable across renders)
    const topPokemons    = useMemo(() => pickRandom(pokemons, 1), [pokemons]);
    const bottomPokemons = useMemo(() => pickRandom(pokemons, 1), [pokemons]);

    // ── Audio (BGM + cries) ────────────────────────────────────────────────────
    const { stopBgm, playCry } = useBattleAudio({ attacker: bottomPokemons[0] ?? null });

    // ── Battle state (HP + attack logic) ──────────────────────────────────────
    const { topHP, bottomHP, isAttacking, isOver, attack } = useBattleState(
        topPokemons,
        bottomPokemons,
    );

    // ── Navigation ────────────────────────────────────────────────────────────
    const handleBack = useCallback(async () => {
        await stopBgm();
        playHuir();
        navigation.goBack();
    }, [navigation, stopBgm, playHuir]);

    const handleAttack = useCallback(() => {
        attack(playCry);
    }, [attack, playCry]);

    // ── Render ────────────────────────────────────────────────────────────────
    const battlegroundImage = require('../../assets/battleground-grass.png');

    if (isLoading) {
        return <ImageBackground source={battlegroundImage} style={s.backgroundImage} />;
    }

    const topPositions    = platformPositions(topPokemons,    LAYOUT.top,    width, height);
    const bottomPositions = platformPositions(bottomPokemons, LAYOUT.bottom, width, height);

    return (
        <ImageBackground source={battlegroundImage} style={s.backgroundImage}>
            {/* Enemy Pokémon + HP bar above */}
            {topPokemons.map((pokemon, i) => (
                <View key={`top-${pokemon.id}`} style={{ position: 'absolute', ...topPositions[i] }}>
                    <HPBar hp={topHP[i]!} name={pokemon.nombre} align="right" />
                    <View style={{ height: HP_BAR_OFFSET }} />
                    <PokemonAvatar pokemon={pokemon} facing="front" width={AVATAR_SIZE * 0.85} height={AVATAR_SIZE * 0.85} />
                </View>
            ))}

            {/* Player Pokémon + HP bar below */}
            {bottomPokemons.map((pokemon, i) => (
                <View key={`bottom-${pokemon.id}`} style={{ position: 'absolute', ...bottomPositions[i] }}>
                    <PokemonAvatar pokemon={pokemon} facing="back" width={AVATAR_SIZE} height={AVATAR_SIZE} />
                    <View style={{ height: HP_BAR_OFFSET }} />
                    <HPBar hp={bottomHP[i]!} name={pokemon.nombre} align="left" />
                </View>
            ))}

            <BattleHUD
                isOver={isOver}
                playerLost={bottomHP[0]?.current === 0}
                isAttacking={isAttacking}
                onBack={handleBack}
                onAttack={handleAttack}
            />
        </ImageBackground>
    );
}


