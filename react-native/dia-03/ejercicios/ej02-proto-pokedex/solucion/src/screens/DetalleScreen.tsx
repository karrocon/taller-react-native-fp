import { View, Text, Image, StyleSheet } from 'react-native';
import type { DetalleProps } from '../types/navigation';

export default function DetalleScreen({ route }: DetalleProps) {
  const { pokemon } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.sprite }} style={styles.sprite} />
      <Text style={styles.num}>#{pokemon.id.padStart(3, '0')}</Text>
      <Text style={styles.nombre}>{pokemon.nombre}</Text>
      <View style={styles.tipoBadge}>
        <Text style={styles.tipoTxt}>{pokemon.tipo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  sprite:     { width: 150, height: 150 },
  num:        { color: '#888', fontSize: 16, marginTop: 8 },
  nombre:     { fontSize: 28, fontWeight: 'bold', color: '#333' },
  tipoBadge:  { backgroundColor: '#cc0000', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 4, marginTop: 8 },
  tipoTxt:    { color: 'white', fontWeight: 'bold', fontSize: 14 },
});
