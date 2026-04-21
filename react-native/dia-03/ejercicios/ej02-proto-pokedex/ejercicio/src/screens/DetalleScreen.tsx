import { View, Text, StyleSheet } from 'react-native';
import type { DetalleScreenProps } from '../types/navigation';

export default function DetalleScreen({ route }: DetalleScreenProps) {
  const { pokemon } = route.params;
  return (
    <View style={styles.container}>
      {/* TODO 1: Añade una Image con source={{ uri: pokemon.sprite }} */}
      {/* TODO 2: Muestra el número formateado como #001, el nombre y el tipo */}
      <Text style={styles.hint}>👆 Muestra los datos del pokémon</Text>
      <Text style={styles.nombre}>{pokemon.nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  hint:      { color: '#888', marginBottom: 12, fontSize: 14 },
  nombre:    { fontSize: 24, fontWeight: 'bold', color: '#333' },
});
