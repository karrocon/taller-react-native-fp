import { View, Text, StyleSheet } from 'react-native';

// TODO 1: Define el tipo TipoPokemon — una unión de strings:
//   'fuego' | 'agua' | 'planta' | 'eléctrico' | 'normal' | (más tipos…)
// TODO 2: Crea un diccionario TIPO_COLOR: Record<TipoPokemon, string>
//   mapeando cada tipo a su color hex (ej. fuego → '#FF6B35')
// TODO 3: El componente recibe la prop `tipo: TipoPokemon`
// TODO 4: Aplica el color correspondiente como backgroundColor del badge
// TODO 5: Añade un prop opcional `size?: 'sm' | 'md'` que cambie el tamaño del texto

type TipoPokemon = 'normal'; // TODO: amplía la unión

type PokemonTypeBadgeProps = {
  tipo: TipoPokemon;
  // TODO: añade size
};

export default function PokemonTypeBadge({ tipo }: PokemonTypeBadgeProps) {
  // TODO: obtén el color del diccionario
  const color = '#BDBDBD';

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.label}>{tipo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  label: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
