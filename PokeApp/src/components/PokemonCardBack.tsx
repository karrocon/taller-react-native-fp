import { StyleSheet, Text, View } from 'react-native';
import { Pokemon } from '../types/pokemon';
import { tipoColor } from '../constants/tipoColor';
import { CARD_WIDTH } from '../utils/styles';
import { spacing } from '../constants/spacing';
import { GOLD_HEX_FILL, GOLD_HEX_GRID, HEXAGON_RATIO } from '../constants/cardColors';
import { cardNameStyle } from './CardFrame';
import CardFrame from './CardFrame';
import PokemonStatsHexagon from './PokemonStatsHexagon';

const HEX_SIZE = Math.floor(CARD_WIDTH * HEXAGON_RATIO);

export type PokemonCardBackProps = { pokemon: Pokemon };

export default function PokemonCardBack({ pokemon }: PokemonCardBackProps) {
    const primaryColor = tipoColor[pokemon.tipos[0]];

    return (
        <CardFrame primaryColor={primaryColor}>
            <View style={styles.content}>
                <Text style={styles.name}>{pokemon.nombre.toUpperCase()}</Text>
                <PokemonStatsHexagon
                    stats={pokemon.stats}
                    size={HEX_SIZE}
                    fillColor={GOLD_HEX_FILL}
                    gridColor={GOLD_HEX_GRID}
                />
            </View>
            <Text style={styles.hint}>Toca para volver</Text>
        </CardFrame>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    name: {
        ...cardNameStyle,
        marginBottom: spacing.sm,
    },
    hint: {
        position: 'absolute',
        bottom: spacing.xl,
        alignSelf: 'center',
        fontSize: 10,
        color: 'rgba(200,168,75,0.45)',
        letterSpacing: 0.5,
    },
});
