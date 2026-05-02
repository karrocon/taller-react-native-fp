import { useState } from 'react';
import { Modal, View, Text, Pressable, Image, StyleSheet, FlatList } from 'react-native';

// TODO 1: Añade el estado `selected` para guardar el Pokémon seleccionado (o null)
// TODO 2: Al pulsar un item de la lista, guarda el Pokémon en `selected`
// TODO 3: Usa <Modal visible={selected !== null} transparent animationType="fade">
// TODO 4: Dentro del Modal, muestra imagen + nombre del Pokémon seleccionado
// TODO 5: Crea un <Pressable> de fondo (backdrop) que cierre el modal
// TODO 6 (bonus): Añade animationType="slide" y compara con "fade"

const POKEMONS = [
  { id: 1,  nombre: 'bulbasaur' },
  { id: 4,  nombre: 'charmander' },
  { id: 7,  nombre: 'squirtle' },
  { id: 25, nombre: 'pikachu' },
];

type Pokemon = typeof POKEMONS[number];

export default function PokemonModal() {
  // TODO: const [selected, setSelected] = useState<Pokemon | null>(null);

  return (
    <View style={styles.screen}>
      <FlatList
        data={POKEMONS}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => { /* TODO: setSelected(item) */ }}
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
          </Pressable>
        )}
      />

      {/* TODO: Modal aquí */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  item:   { backgroundColor: '#fff', padding: 16, marginHorizontal: 12, marginVertical: 4, borderRadius: 8 },
  nombre: { fontSize: 16, fontWeight: '600', textTransform: 'capitalize', color: '#212121' },
});
