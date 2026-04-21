import { View, Text, StyleSheet } from 'react-native';
import type { DetalleProps } from '../types/navigation';

export default function DetalleScreen({ route }: DetalleProps) {
  const { nombre, rol } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.rol}>{rol}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoTxt}>Perfil de {nombre}</Text>
        <Text style={styles.infoTxt}>Rol: {rol}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  nombre:    { fontSize: 26, fontWeight: 'bold', color: '#333' },
  rol:       { fontSize: 16, color: '#888', marginBottom: 20 },
  infoBox:   { backgroundColor: 'white', borderRadius: 10, padding: 18, elevation: 2, width: '90%' },
  infoTxt:   { fontSize: 14, color: '#555', marginBottom: 4 },
});
