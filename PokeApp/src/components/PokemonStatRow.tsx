import { Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { makeStyles } from "../utils/styles";

export type PokemonStatRowProps = {
    nombre: string;
    valor: number;
    maxValor?: number;
};

/** Mezcla dos colores RGB según un factor t ∈ [0,1] */
function mixColor(
    from: { r: number; g: number; b: number },
    to: { r: number; g: number; b: number },
    t: number,
): string {
    const r = Math.round(from.r + (to.r - from.r) * t);
    const g = Math.round(from.g + (to.g - from.g) * t);
    const b = Math.round(from.b + (to.b - from.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
}

export default function PokemonStatRow({ nombre, valor, maxValor = 255 }: PokemonStatRowProps) {
    const { theme } = useTheme();
    const s = makeStyles(theme);
    const ratio = Math.min(valor / maxValor, 1);
    const barColor = mixColor({ r: 220, g: 50, b: 50 }, { r: 60, g: 200, b: 80 }, ratio);

    return (
        <View style={s.statRow}>
            <Text style={s.statLabel}>{nombre}</Text>
            <View style={s.statBarTrack}>
                <View style={{ width: `${ratio * 100}%`, height: '100%', backgroundColor: barColor }} />
            </View>
            <Text style={s.statValue}>{valor}</Text>
        </View>
    );
}
