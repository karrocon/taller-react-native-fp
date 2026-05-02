import { FlatList, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Tipo simplificado para el ejercicio
type Pokemon = {
  id: number;
  nombre: string;
  thumbnail: string;
};

// Datos de muestra para probar sin API
const MOCK_POKEMONS: Pokemon[] = [
  { id: 1,  nombre: 'bulbasaur',  thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 4,  nombre: 'charmander', thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 7,  nombre: 'squirtle',   thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { id: 25, nombre: 'pikachu',    thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
];

type Props = {
  data?: Pokemon[];
  onSelect?: (pokemon: Pokemon) => void;
};

// TODO 1: Usa <FlatList> con la prop `data` (usa MOCK_POKEMONS si no hay data)
// TODO 2: Implementa `renderItem` mostrando imagen + nombre
// TODO 3: Añade `keyExtractor` usando pokemon.id
// TODO 4: Añade `ItemSeparatorComponent` con una línea divisoria
// TODO 5 (bonus): Añade un `ListEmptyComponent` que muestre "No hay Pokémon"
// TODO 6 (bonus): Añade `numColumns={2}` para diseño en cuadrícula

export default function PokemonList({ data = MOCK_POKEMONS, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        // TODO: renderiza cada Pokémon
        <View style={styles.item}>
          <Text>{item.nombre}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      // TODO: ItemSeparatorComponent
      // TODO: ListEmptyComponent
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: '#fff',
  },
  // TODO: image, nombre, separator
});
