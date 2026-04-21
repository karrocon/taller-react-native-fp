// MINI 02 — Solución: Pasar parámetros entre pantallas

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function PantallaA({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📤 Enviar datos</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('PantallaB', { nombre: 'Ana', ciudad: 'Madrid' })}
      >
        <Text style={styles.btnTxt}>Enviar datos →</Text>
      </TouchableOpacity>
    </View>
  );
}

function PantallaB({ route, navigation }: any) {
  const { nombre, ciudad } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📥 Datos recibidos</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.valor}>{nombre}</Text>
        <Text style={styles.label}>Ciudad:</Text>
        <Text style={styles.valor}>{ciudad}</Text>
      </View>
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#607d8b' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.btnTxt}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Mini02Solucion() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1a73e8' }, headerTintColor: 'white' }}>
        <Stack.Screen name="PantallaA" component={PantallaA} options={{ title: 'Origen' }} />
        <Stack.Screen name="PantallaB" component={PantallaB} options={{ title: 'Destino' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo:    { fontSize: 24, fontWeight: 'bold', color: '#1a73e8', marginBottom: 16 },
  card:      { backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%', elevation: 2, marginBottom: 16 },
  label:     { color: '#888', fontSize: 13, marginTop: 8 },
  valor:     { fontSize: 18, fontWeight: 'bold', color: '#333' },
  btn:       { backgroundColor: '#1a73e8', padding: 14, borderRadius: 8, marginTop: 8 },
  btnTxt:    { color: 'white', fontSize: 16, fontWeight: '600' },
});
