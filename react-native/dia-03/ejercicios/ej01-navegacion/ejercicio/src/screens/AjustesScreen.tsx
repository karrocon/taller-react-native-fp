import { View, Text, StyleSheet } from 'react-native';
import type { AjustesScreenProps } from '../types/navigation';
export default function AjustesScreen(_props: AjustesScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajustes</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  titulo:    { fontSize: 22, fontWeight: 'bold', marginTop: 8, color: '#333' },
});
