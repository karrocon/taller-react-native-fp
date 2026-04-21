import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import type { HomeProps } from '../types/navigation';

type Persona = { id: string; nombre: string; rol: string };

const PERSONAS: Persona[] = [
  { id: '1', nombre: 'Ana Garcia',   rol: 'Disenadora' },
  { id: '2', nombre: 'Carlos Lopez', rol: 'Desarrollador' },
  { id: '3', nombre: 'Marta Ruiz',   rol: 'Product Manager' },
];

export default function HomeScreen({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Directorio</Text>
      <FlatList
        data={PERSONAS}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}
            onPress={() => navigation.navigate('Detalle', { nombre: item.nombre, rol: item.rol })}>
            <Text style={styles.cardNombre}>{item.nombre}</Text>
            <Text style={styles.cardRol}>{item.rol}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#607d8b', marginBottom: 30 }]}
        onPress={() => navigation.navigate('Ajustes')}>
        <Text style={styles.btnTxt}>Ajustes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  titulo:    { fontSize: 24, fontWeight: 'bold', color: '#1a73e8', marginTop: 20, marginBottom: 12, textAlign: 'center' },
  card:      { backgroundColor: 'white', borderRadius: 10, padding: 14, marginBottom: 8, elevation: 2 },
  cardNombre:{ fontWeight: '700', fontSize: 15 },
  cardRol:   { color: '#888', fontSize: 13 },
  btn:       { padding: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 16, marginTop: 8 },
  btnTxt:    { color: 'white', fontSize: 16, fontWeight: '600' },
});
