import { Image, StyleSheet, Text, View } from 'react-native';
import { Pokemon } from '../types/pokemon';
import { tipoColor } from '../constants/tipoColor';
import { CARD_WIDTH } from '../utils/styles';
import { spacing } from '../constants/spacing';
import { GOLD, GOLD_DIM, STAT_COLORS, CARD_IMAGE_RATIO, CARD_TYPE_BANNER_PADDING, CARD_DESC_PADDING_BOTTOM } from '../constants/cardColors';
import { cardNameStyle } from './CardFrame';
import CardFrame from './CardFrame';
import CardStatColumn from './CardStatColumn';
import { CardStatItemProps } from './CardStatItem';

export type PokemonCardFrontProps = { pokemon: Pokemon };

export default function PokemonCardFront({ pokemon }: PokemonCardFrontProps) {
    const primaryColor = tipoColor[pokemon.tipos[0]];

    const leftStats: CardStatItemProps[] = [
        { icon: { lib: 'mci', name: 'sword'            }, value: pokemon.stats.ataque,         color: STAT_COLORS.ataque         },
        { icon: { lib: 'mci', name: 'star-four-points' }, value: pokemon.stats.ataqueEspecial,  color: STAT_COLORS.ataqueEspecial  },
        { icon: { lib: 'ion', name: 'flash'            }, value: pokemon.stats.velocidad,       color: STAT_COLORS.velocidad       },
    ];

    const rightStats: CardStatItemProps[] = [
        { icon: { lib: 'ion', name: 'shield'           }, value: pokemon.stats.defensa,          color: STAT_COLORS.defensa          },
        { icon: { lib: 'mci', name: 'shield-half-full' }, value: pokemon.stats.defensaEspecial,  color: STAT_COLORS.defensaEspecial  },
        { icon: { lib: 'ion', name: 'heart'            }, value: pokemon.stats.hp,               color: STAT_COLORS.hp               },
    ];

    return (
        <CardFrame primaryColor={primaryColor}>
            <View style={styles.nameRow}>
                <Text style={styles.name} numberOfLines={1}>
                    {pokemon.nombre.toUpperCase()}
                </Text>
                <View style={styles.nameDivider} />
            </View>

            <View style={styles.artArea}>
                <Image source={{ uri: pokemon.imagen }} style={styles.image} resizeMode="contain" />
                <CardStatColumn items={leftStats} side="left" />
                <CardStatColumn items={rightStats} side="right" />
            </View>

            <View style={styles.typeBanner}>
                <Text style={styles.typeText}>
                    {pokemon.tipos.map(t => t.toUpperCase()).join(' / ')}
                </Text>
            </View>

            <View style={styles.descBox}>
                <Text style={styles.descText} numberOfLines={3}>
                    {pokemon.descripcion ?? '—'}
                </Text>
            </View>
        </CardFrame>
    );
}

const styles = StyleSheet.create({
    nameRow: {
        alignItems: 'center',
        paddingTop: spacing.xl,
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xs,
    },
    name: cardNameStyle,
    nameDivider: {
        width: '70%',
        height: 1,
        backgroundColor: GOLD_DIM,
        marginTop: spacing.xs,
        opacity: 0.8,
    },
    artArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: CARD_WIDTH * CARD_IMAGE_RATIO,
        height: '100%',
    },
    typeBanner: {
        width: '100%',
        backgroundColor: GOLD,
        paddingVertical: CARD_TYPE_BANNER_PADDING,
        alignItems: 'center',
    },
    typeText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#150e00',
        letterSpacing: 3,
    },
    descBox: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        paddingBottom: CARD_DESC_PADDING_BOTTOM,
    },
    descText: {
        fontSize: 11,
        color: '#d4c08a',
        lineHeight: 16,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});
