import { StyleSheet, View } from "react-native";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { TipoPokemon } from "../types/pokemon";
import { spacing } from "../constants/spacing";

export type PokemonTypeBadgeListProps = {
    tipos: TipoPokemon[];
}

export function PokemonTypeBadgeList({ tipos }: PokemonTypeBadgeListProps) {
    return (
        <View style={styles.badges}>
            {tipos.map((tipo) => (
                <PokemonTypeBadge key={tipo} tipo={tipo} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginTop: spacing.xs,
    },
});