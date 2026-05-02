import { View } from "react-native";
import { DetallePokemonScreenProps } from "../types/navigation";
import { useTheme } from "../hooks/useTheme";
import { makeStyles, layout } from "../utils/styles";
import DetallePokemon from "../components/DetallePokemon";

export default function DetallePokemonScreen({ route }: DetallePokemonScreenProps) {
    const { pokemon } = route.params;
    const { theme } = useTheme();
    const s = makeStyles(theme);
    return (
        <View style={[s.screen, layout.center]}>
            <DetallePokemon pokemon={pokemon} />
        </View>
    );
}