import { StyleSheet, Text, View } from 'react-native';

export type TipoPokemon =
  | 'normal' | 'fuego' | 'agua' | 'planta' | 'eléctrico'
  | 'hielo' | 'lucha' | 'veneno' | 'tierra' | 'volador'
  | 'psíquico' | 'bicho' | 'roca' | 'fantasma' | 'dragón'
  | 'siniestro' | 'acero' | 'hada';

const tipoColor: Record<TipoPokemon, string> = {
  normal:    '#A8A878',
  fuego:     '#F08030',
  agua:      '#6890F0',
  planta:    '#78C850',
  eléctrico: '#F8D030',
  hielo:     '#98D8D8',
  lucha:     '#C03028',
  veneno:    '#A040A0',
  tierra:    '#E0C068',
  volador:   '#A890F0',
  psíquico:  '#F85888',
  bicho:     '#A8B820',
  roca:      '#B8A038',
  fantasma:  '#705898',
  dragón:    '#7038F8',
  siniestro: '#705848',
  acero:     '#B8B8D0',
  hada:      '#EE99AC',
};

export type PokemonTypeBadgeProps = {
  tipo: TipoPokemon;
};

export default function PokemonTypeBadge({ tipo }: PokemonTypeBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: tipoColor[tipo] }]}>
      <Text style={styles.label}>{tipo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
    includeFontPadding: false,
    lineHeight: 16,
  },
});
