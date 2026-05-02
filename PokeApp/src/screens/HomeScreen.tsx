import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { layout } from "../utils/styles";
import { HomeScreenProps } from "../types/navigation";
import { BATALLA } from "../constants/navigation";
import { useSoundSettings } from "../hooks/useSoundSettings";

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const { theme } = useTheme();
    const { playTap } = useSoundSettings();
    return (
        <ImageBackground source={require('../../assets/main-bg.png')} resizeMode="cover" style={styles.bg}>
            <View style={layout.center}>
                <Pressable
                    style={({ pressed }) => [styles.jugarBtn, pressed && { opacity: 0.75 }]}
                    onPress={() => { playTap(); navigation.navigate(BATALLA, { equipo: [] }); }}
                >
                    <Text style={styles.jugarText}>Jugar</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    jugarBtn: {
        backgroundColor: 'rgba(204, 0, 0, 0.88)',
        paddingHorizontal: 52,
        paddingVertical: 18,
        borderRadius: 14,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.45,
        shadowRadius: 10,
    },
    jugarText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
});