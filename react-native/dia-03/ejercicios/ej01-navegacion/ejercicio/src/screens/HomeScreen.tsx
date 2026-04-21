import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { HomeScreenProps } from '../types/navigation';
const PERSONAS = [
  { id: '1', nombre: 'Ana Garcia',   rol: 'Disenadora' },
  { id: '2', nombre: 'Carlos Lopez', rol: 'Desarrollador' },
  { id: '3', nombre: 'Marta Ruiz',   rol: 'Product Manager' },
];
export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Directorio</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: '#f5f5f5' },
  titulo:    { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1a73e8' },
});
