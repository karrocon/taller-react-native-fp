import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { STAT_PILL_WIDTH, STAT_PILL_HEIGHT } from '../constants/cardColors';

export type StatIcon =
    | { lib: 'ion'; name: React.ComponentProps<typeof Ionicons>['name'] }
    | { lib: 'mci'; name: React.ComponentProps<typeof MaterialCommunityIcons>['name'] };

export type CardStatItemProps = { icon: StatIcon; value: number; color: string };

type Props = CardStatItemProps & { side?: 'left' | 'right' };

const R = STAT_PILL_WIDTH / 2;

export default function CardStatItem({ icon, value, color, side = 'right' }: Props) {
    const iconEl = icon.lib === 'ion'
        ? <Ionicons name={icon.name} size={18} color="#fff" />
        : <MaterialCommunityIcons name={icon.name} size={18} color="#fff" />;

    const roundedEdge = side === 'left'
        ? { borderTopRightRadius: R, borderBottomRightRadius: R, borderLeftWidth: 0 }
        : { borderTopLeftRadius: R, borderBottomLeftRadius: R, borderRightWidth: 0 };

    return (
        <View style={[styles.pill, roundedEdge, { backgroundColor: color }]}>
            <>{iconEl}<Text style={styles.value}>{value}</Text></>
            {/* {side === 'left'
                ? <><Text style={styles.value}>{value}</Text>{iconEl}</>
                : <>{iconEl}<Text style={styles.value}>{value}</Text></>
            } */}
        </View>
    );
}

const styles = StyleSheet.create({
    pill: {
        width: STAT_PILL_WIDTH,
        height: STAT_PILL_HEIGHT,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.30)',
        opacity: 0.9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 3,
        elevation: 5,
    },
    value: {
        fontSize: 14,
        fontWeight: '900',
        color: '#ffffff',
        textShadowColor: 'rgba(0,0,0,0.9)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
});

