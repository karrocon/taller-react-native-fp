/**
 * useBattleState
 *
 * Manages battle game-state:
 * - HP for each combatant (initialised from stats.hp)
 * - Attack action: applies damage (random 5-15% of enemy max HP)
 * - isAttacking flag while cry plays
 */
import { useState, useCallback, useMemo } from 'react';
import type { Pokemon } from '../types/pokemon';

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

/** Simple damage formula: 5-15% of target's max HP */
function calcDamage(targetMaxHp: number): number {
    const pct = 0.05 + Math.random() * 0.10;   // 5 – 15 %
    return Math.round(targetMaxHp * pct);
}

export type CombatantHP = {
    current: number;
    max: number;
};

export function useBattleState(topPokemons: Pokemon[], bottomPokemons: Pokemon[]) {
    const initHP = (pokemons: Pokemon[]): CombatantHP[] =>
        pokemons.map(p => ({ current: p.stats.hp, max: p.stats.hp }));

    const [topHP,    setTopHP]    = useState<CombatantHP[]>(() => initHP(topPokemons));
    const [bottomHP, setBottomHP] = useState<CombatantHP[]>(() => initHP(bottomPokemons));
    const [isAttacking, setIsAttacking] = useState(false);

    const isOver = useMemo(
        () => topHP.some(h => h.current <= 0) || bottomHP.some(h => h.current <= 0),
        [topHP, bottomHP],
    );

    /**
     * Player attacks: bottom[0] deals damage to top[0], then top[0]
     * counter-attacks (if still alive) to bottom[0].
     * Returns a promise that resolves when attack is "committed" so the
     * caller can time the cry sound effect.
     */
    const attack = useCallback(async (playCry: () => Promise<void>) => {
        if (isAttacking || isOver) return;
        setIsAttacking(true);

        // Player attacks enemy
        setTopHP(prev => {
            const next = [...prev];
            if (next[0]) {
                const dmg = calcDamage(next[0].max);
                next[0] = { ...next[0], current: clamp(next[0].current - dmg, 0, next[0].max) };
            }
            return next;
        });

        await playCry();

        // Enemy counter-attacks (only if still alive)
        setTopHP(current => {
            if (current[0]?.current > 0) {
                setBottomHP(prev => {
                    const next = [...prev];
                    if (next[0]) {
                        const dmg = calcDamage(next[0].max);
                        next[0] = { ...next[0], current: clamp(next[0].current - dmg, 0, next[0].max) };
                    }
                    return next;
                });
            }
            return current;
        });

        setIsAttacking(false);
    }, [isAttacking, isOver]);

    return { topHP, bottomHP, isAttacking, isOver, attack };
}
