import Svg, { Polygon, Line, Circle, Text as SvgText } from "react-native-svg";
import { PokemonStats } from "../types/pokemon";

export type PokemonStatsHexagonProps = {
    stats: PokemonStats;
    size?: number;
    fillColor?: string;
    gridColor?: string;
};

const STAT_LABELS: Array<{ key: keyof PokemonStats; label: string }> = [
    { key: 'hp',              label: 'HP' },
    { key: 'ataque',          label: 'ATQ' },
    { key: 'defensa',         label: 'DEF' },
    { key: 'velocidad',       label: 'VEL' },
    { key: 'defensaEspecial', label: 'DEF.E' },
    { key: 'ataqueEspecial',  label: 'ATQ.E' },
];

const MAX_STAT = 255;
const ANGLES = STAT_LABELS.map((_, i) => (Math.PI * 2 * i) / 6 - Math.PI / 2);

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
    return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
    };
}

export default function PokemonStatsHexagon({
    stats,
    size = 200,
    fillColor = 'rgba(80,200,120,0.5)',
    gridColor = 'rgba(255,255,255,0.18)',
}: PokemonStatsHexagonProps) {
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.32;
    const labelR  = size * 0.42;

    const outerPoints = ANGLES.map((a) => polarToXY(a, outerR, cx, cy));
    const outerStr = outerPoints.map((p) => `${p.x},${p.y}`).join(' ');

    const dataPoints = STAT_LABELS.map(({ key }, i) => {
        const ratio = Math.min(stats[key] / MAX_STAT, 1);
        return polarToXY(ANGLES[i], outerR * ratio, cx, cy);
    });
    const dataStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

    const strokeColor = fillColor.replace(/[\d.]+\)$/, '0.9)');

    return (
        <Svg width={size} height={size}>
            {/* Rejilla */}
            {[0.25, 0.5, 0.75, 1].map((factor) => {
                const pts = ANGLES.map((a) => polarToXY(a, outerR * factor, cx, cy));
                return (
                    <Polygon
                        key={factor}
                        points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke={gridColor}
                        strokeWidth={1}
                    />
                );
            })}

            {/* Radiales */}
            {outerPoints.map((p, i) => (
                <Line
                    key={i}
                    x1={cx} y1={cy}
                    x2={p.x} y2={p.y}
                    stroke={gridColor}
                    strokeWidth={1}
                />
            ))}

            {/* Área de stats */}
            <Polygon points={dataStr} fill={fillColor} stroke={strokeColor} strokeWidth={2} />

            {/* Puntos */}
            {dataPoints.map((p, i) => (
                <Circle key={i} cx={p.x} cy={p.y} r={3} fill="white" />
            ))}

            {/* Labels */}
            {STAT_LABELS.map(({ label, key }, i) => {
                const { x, y } = polarToXY(ANGLES[i], labelR, cx, cy);
                const value = stats[key];
                return (
                    <SvgText
                        key={i}
                        x={x}
                        y={y - 5}
                        textAnchor="middle"
                        fontSize={14}
                        fontWeight="500"
                        fill="rgba(255,255,255,0.8)"
                    >
                        {label}
                    </SvgText>
                );
            })}

            {/* Valores numéricos */}
            {STAT_LABELS.map(({ key }, i) => {
                const { x, y } = polarToXY(ANGLES[i], labelR, cx, cy);
                return (
                    <SvgText
                        key={`v${i}`}
                        x={x}
                        y={y + 18}
                        textAnchor="middle"
                        fontSize={20}
                        fontWeight="700"
                        fill="#ffffff"
                    >
                        {stats[key]}
                    </SvgText>
                );
            })}
        </Svg>
    );
}

