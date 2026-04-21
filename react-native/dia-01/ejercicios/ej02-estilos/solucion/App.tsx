import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>Juan García</Text>
      <Text style={styles.edad}>20 años</Text>
      <Text style={styles.ciudad}>📍 Madrid</Text>
      <Text style={styles.favorito}>Favorito: 🎮</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4fd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nombre:   { fontSize: 28, fontWeight: 'bold', color: '#1a73e8', marginBottom: 8 },
  edad:     { fontSize: 18, color: '#444', marginBottom: 4 },
  ciudad:   { fontSize: 16, color: '#666', marginBottom: 4 },
  favorito: { fontSize: 16, color: '#888', marginTop: 8 },
});
