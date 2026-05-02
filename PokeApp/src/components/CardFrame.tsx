import { StyleSheet, Text, View } from 'react-native';
import { CARD_WIDTH, CARD_HEIGHT, glowShadow, radii } from '../utils/styles';
import { spacing } from '../constants/spacing';
import { GOLD, GOLD_DIM, CARD_BG, INNER_BORDER_INSET } from '../constants/cardColors';

export const cardNameStyle = {
    fontSize: 22,
    fontWeight: '900' as const,
    color: '#f5e0a0',
    letterSpacing: 2.5,
    textShadowColor: GOLD,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
};

type Props = { primaryColor: string; children: React.ReactNode };

export default function CardFrame({ primaryColor, children }: Props) {
    return (
        <View style={[styles.card, glowShadow(primaryColor)]}>
            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: CARD_BG }]} />
            <View style={styles.innerBorder} />
            <Text style={[styles.corner, styles.cornerTL]}>✦</Text>
            <Text style={[styles.corner, styles.cornerTR]}>✦</Text>
            <Text style={[styles.corner, styles.cornerBL]}>✦</Text>
            <Text style={[styles.corner, styles.cornerBR]}>✦</Text>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: radii.lg + 4,
        borderWidth: 3,
        borderColor: GOLD,
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
    },
    innerBorder: {
        position: 'absolute',
        top: INNER_BORDER_INSET,
        left: INNER_BORDER_INSET,
        right: INNER_BORDER_INSET,
        bottom: INNER_BORDER_INSET,
        borderRadius: radii.lg + 1,
        borderWidth: 1,
        borderColor: GOLD_DIM,
    },
    corner: {
        position: 'absolute',
        color: GOLD,
        fontSize: 18,
        lineHeight: 18,
    },
    cornerTL: { top: spacing.md,    left: spacing.md  },
    cornerTR: { top: spacing.md,    right: spacing.md },
    cornerBL: { bottom: spacing.md,  left: spacing.md  },
    cornerBR: { bottom: spacing.md,  right: spacing.md },
});
