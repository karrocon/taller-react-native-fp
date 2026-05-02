import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    isOver: boolean;
    playerLost: boolean;
    isAttacking: boolean;
    onBack: () => void;
    onAttack: () => void;
};

export default function BattleHUD({ isOver, playerLost, isAttacking, onBack, onAttack }: Props) {
    return (
        <>
            {/* Battle-over overlay */}
            {isOver && (
                <View style={styles.overOverlay}>
                    <Text style={styles.overText}>
                        {playerLost ? '¡Has perdido!' : '¡Has ganado!'}
                    </Text>
                </View>
            )}

            {/* HUD buttons */}
            <View style={styles.container}>
                <Pressable style={[styles.btn, styles.btnBack]} onPress={onBack}>
                    <Text style={styles.btnText}>← Huir</Text>
                </Pressable>

                <Pressable
                    style={[styles.btn, styles.btnAttack, (isAttacking || isOver) && styles.btnDisabled]}
                    onPress={onAttack}
                    disabled={isAttacking || isOver}
                >
                    <Text style={styles.btnText}>⚔ Atacar</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 32,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    btn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 6,
    },
    btnBack: {
        backgroundColor: '#444',
    },
    btnAttack: {
        backgroundColor: '#CC2200',
    },
    btnDisabled: {
        opacity: 0.5,
    },
    btnText: {
        color: '#FFF',
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    overOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    overText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '900',
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
});
