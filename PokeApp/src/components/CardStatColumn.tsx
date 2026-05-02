import { StyleSheet, View } from 'react-native';
import CardStatItem, { CardStatItemProps } from './CardStatItem';
import { spacing } from '../constants/spacing';
import { STAT_PILL_WIDTH } from '../constants/cardColors';

type Props = { items: CardStatItemProps[]; side: 'left' | 'right' };

export default function CardStatColumn({ items, side }: Props) {
    return (
        <View style={[styles.column, side === 'left' ? styles.left : styles.right]}>
            {items.map((item, i) => <CardStatItem key={i} {...item} side={side} />)}
        </View>
    );
}

const styles = StyleSheet.create({
    column: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: STAT_PILL_WIDTH,
        zIndex: 2,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        paddingVertical: spacing.md,
    },
    left:  { left:  0 },
    right: { right: 0 },
});
