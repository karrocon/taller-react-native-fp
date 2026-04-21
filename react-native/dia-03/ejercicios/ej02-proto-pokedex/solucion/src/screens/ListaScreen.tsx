import { FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import type { ListaProps } from '../types/navigation';
import { POKEMON_DATA } from '../types/pokemon';

export default function ListaScreen({ navigation }: ListaProps) {
  return (
    <FlatList
      data={POKEMON_DATA}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Detalle', { pokemon: item })}
        >
          <Image source={{ uri: item.sprite }} style={styles.sprite} />
          <Text style={styles.num}>#{item.id.padStart(3, '0')}</Text>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.tipo}>{item.tipo}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list:   { padding: 8, backgroundColor: '#f5f5f5' },
  card:   { flex: 1, margin: 6, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', padding: 12, elevation: 2 },
  sprite: { width: 80, height: 80 },
  num:    { color: '#888', fontSize: 12 },
  nombre: { fontWeight: 'bold', fontSize: 15 },
  tipo:   { color: '#cc0000', fontSize: 13 },
});
