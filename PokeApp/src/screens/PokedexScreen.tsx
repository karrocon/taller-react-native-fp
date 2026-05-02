import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useState, useCallback, useMemo } from "react";
import { useTheme } from "../hooks/useTheme";
import { usePokemonsContext } from "../hooks/usePokemonsContext";
import { useDebounce } from "../hooks/useDebounce";
import { makeStyles } from "../utils/styles";
import PokemonList from "../components/PokemonList";
import DetallePokemon from "../components/DetallePokemon";
import { Pokemon, TipoPokemon } from "../types/pokemon";
import { tipoColor } from "../constants/tipoColor";
import { spacing } from "../constants/spacing";

const ALL_TYPES = Object.keys(tipoColor) as TipoPokemon[];

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export default function PokedexScreen() {
    const { theme } = useTheme();
    const s = makeStyles(theme);
    const { pokemons } = usePokemonsContext();

    // ── Search + filter state ──────────────────────────────────────────────
    const [query, setQuery] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<Set<TipoPokemon>>(new Set());
    const debouncedQuery = useDebounce(query, 300);

    const filtered = useMemo<Pokemon[]>(() => {
        const q = normalize(debouncedQuery);
        return pokemons.filter(p => {
            const matchesName = q === '' || normalize(p.nombre).includes(q);
            const matchesType = selectedTypes.size === 0 || p.tipos.some(t => selectedTypes.has(t));
            return matchesName && matchesType;
        });
    }, [pokemons, debouncedQuery, selectedTypes]);

    // ── Detail modal ───────────────────────────────────────────────────────
    const [selected, setSelected] = useState<Pokemon | null>(null);
    const handleSelect = useCallback((p: Pokemon) => setSelected(p), []);
    const handleClose  = useCallback(() => setSelected(null), []);

    const handleTypePress = useCallback((type: TipoPokemon) => {
        setSelectedTypes(prev => {
            const next = new Set(prev);
            next.has(type) ? next.delete(type) : next.add(type);
            return next;
        });
    }, []);

    return (
        <View style={s.screen}>
            {/* Search bar */}
            <View style={[styles.searchRow, { backgroundColor: theme.backgroundCard }]}>
                <TextInput
                    style={[styles.searchInput, { color: theme.textPrimary, borderColor: theme.border }]}
                    placeholder="Buscar por nombre…"
                    placeholderTextColor={theme.textSecondary}
                    value={query}
                    onChangeText={setQuery}
                    autoCorrect={false}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                />
            </View>

            {/* Type filter chips */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
            >
                {ALL_TYPES.map(type => {
                    const active = selectedTypes.has(type);
                    const color = tipoColor[type];
                    return (
                        <Pressable
                            key={type}
                            onPress={() => handleTypePress(type)}
                            style={[
                                styles.chip,
                                { backgroundColor: active ? color : theme.backgroundCard, borderColor: color },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    { color: active ? '#fff' : color },
                                ]}
                            >
                                {type}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>

            <PokemonList data={filtered} onSelect={handleSelect} />

            <Modal
                visible={selected !== null}
                transparent
                animationType="fade"
                onRequestClose={handleClose}
            >
                <Pressable style={styles.backdrop} onPress={handleClose}>
                    <Pressable style={styles.container} onPress={() => {}}>
                        {selected && <DetallePokemon pokemon={selected} />}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    searchRow: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        fontSize: 15,
    },
    chipsRow: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.xs,
    },
    chip: {
        borderWidth: 1.5,
        borderRadius: 16,
        paddingHorizontal: spacing.md,
        paddingVertical: 5,
        flexShrink: 0,
    },
    chipText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
        includeFontPadding: false,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});