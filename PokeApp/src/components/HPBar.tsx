import { StyleSheet, Text, View } from 'react-native';
import type { CombatantHP } from '../hooks/useBattleState';

type Props = {
    hp: CombatantHP;
    /** Name label shown above the bar */
    name: string;
    /** 'top' → label+bar above the avatar; 'bottom' → below (mirrored alignment) */
    align?: 'left' | 'right';
};

function hpColor(ratio: number): string {
    if (ratio > 0.5) return '#4CAF50';   // green
    if (ratio > 0.25) return '#FFC107';  // yellow
    return '#F44336';                     // red
}

export default function HPBar({ hp, name, align = 'left' }: Props) {
    const ratio = hp.max > 0 ? hp.current / hp.max : 0;
    const pct   = Math.round(ratio * 100);
    const color = hpColor(ratio);

    return (
        <View style={[styles.container, align === 'right' && styles.containerRight]}>
            <View style={styles.header}>
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <Text style={styles.hpText}>{hp.current}/{hp.max}</Text>
            </View>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${pct}%` as any, backgroundColor: color }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 140,
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    containerRight: {
        alignSelf: 'flex-end',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    name: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'capitalize',
        flex: 1,
        marginRight: 4,
    },
    hpText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
    track: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
});
