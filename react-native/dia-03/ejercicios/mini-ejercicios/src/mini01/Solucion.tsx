// MINI 01 — Solución: Tu primer Stack Navigator

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function PantallaA({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏠 Pantalla A</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PantallaB')}>
        <Text style={styles.btnTxt}>Ir a Pantalla B →</Text>
      </TouchableOpacity>
    </View>
  );
}

function PantallaB({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📄 Pantalla B</Text>
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#607d8b' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.btnTxt}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Mini01Solucion() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1a73e8' }, headerTintColor: 'white' }}>
        <Stack.Screen name="PantallaA" component={PantallaA} options={{ title: 'Pantalla A' }} />
        <Stack.Screen name="PantallaB" component={PantallaB} options={{ title: 'Pantalla B' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  titulo:    { fontSize: 24, fontWeight: 'bold', color: '#1a73e8', marginBottom: 16 },
  btn:       { backgroundColor: '#1a73e8', padding: 14, borderRadius: 8, marginTop: 16 },
  btnTxt:    { color: 'white', fontSize: 16, fontWeight: '600' },
});
