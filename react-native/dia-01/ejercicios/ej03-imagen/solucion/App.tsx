import { Text, View, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={styles.avatar}
      />
      <Text style={styles.nombre}>Juan García</Text>
      <Text style={styles.subtitulo}>20 años · Madrid</Text>
      <Text style={styles.bio}>Estudiante de DAM 📱</Text>
      <View style={styles.separador} />
      <Text style={styles.dato}>🎮 Videojuegos</Text>
      <Text style={styles.dato}>💻 Programación</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', justifyContent: 'center', alignItems: 'center', padding: 24 },
  avatar:    { width: 120, height: 120, borderRadius: 60, marginBottom: 16, borderWidth: 3, borderColor: '#1a73e8' },
  nombre:    { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 6 },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 6 },
  bio:       { fontSize: 15, color: '#888', marginBottom: 16 },
  separador: { width: '60%', height: 1, backgroundColor: '#ddd', marginBottom: 16 },
  dato:      { fontSize: 15, color: '#555', marginBottom: 6 },
});
