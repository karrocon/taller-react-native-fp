import { StyleSheet, Text, View } from "react-native";
import { TipoPokemon } from "../types/pokemon";
import { tipoColor } from "../constants/tipoColor";

export type PokemonTypeBadgeProps = {
    tipo: TipoPokemon;
}

export default function PokemonTypeBadge({ tipo }: PokemonTypeBadgeProps) {
    return (
        <View style={[styles.badge, { backgroundColor: tipoColor[tipo] }]}>
            <Text style={styles.label}>{tipo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
        overflow: 'hidden',
    },
    label: {
        fontSize: 11,
        fontWeight: '600',
        color: '#fff',
        textTransform: 'capitalize',
        includeFontPadding: false,
        lineHeight: 16,
    },
});