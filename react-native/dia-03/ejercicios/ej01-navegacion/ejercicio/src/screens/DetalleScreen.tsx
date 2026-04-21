import { View, Text, StyleSheet } from 'react-native';
import type { DetalleScreenProps } from '../types/navigation';
export default function DetalleScreen({ route }: DetalleScreenProps) {
  const { nombre, rol } = route.params;
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 48 }}>person</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
});
