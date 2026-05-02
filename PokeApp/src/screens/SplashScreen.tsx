import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { SplashScreenProps } from "../types/navigation";
import { MAIN } from "../constants/navigation";
import { useTheme } from "../hooks/useTheme";
import { makeStyles, layout } from "../utils/styles";
import { usePokemonsContext } from "../hooks/usePokemonsContext";

export default function SplashScreen({ navigation }: SplashScreenProps) {
    const { theme } = useTheme();
    const s = makeStyles(theme);
    const {isLoading, loadingPercentage, isError, error} = usePokemonsContext();

    useEffect(() => {
        if (!isLoading) {
            navigation.navigate(MAIN);
            return;
        }
    }, [isLoading, navigation]);

    useEffect(() => {
        if (isError) {
            alert(`Error al cargar los pokemons: ${error}`);
        }
    }, [isError, error]);

    return (
        <View style={[s.screen, layout.center]}>
            <Image source={require('../../assets/splash.png')} style={s.splash} />
            <Text style={s.textPrimary}>Cargando datos...</Text>
            <Text style={s.textSecondary}>{loadingPercentage.toFixed(0)}%</Text>
        </View>
    );
}