// MINI 02 — Ejercicio: Pasar parámetros entre pantallas
//
// OBJETIVO: Enviar datos de PantallaA a PantallaB mediante route.params
//
// TODO 1: En PantallaA, al navegar pasa un objeto con { nombre: 'Ana', ciudad: 'Madrid' }
//           navigation.navigate('PantallaB', { nombre: '...', ciudad: '...' })
// TODO 2: En PantallaB, recibe los params con route.params y muéstralos en pantalla
//           const { nombre, ciudad } = route.params;

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
        onPress={() => {
          // TODO: navega a PantallaB pasando { nombre: 'Ana', ciudad: 'Madrid' }
          navigation.navigate('PantallaB');
        }}
      >
        <Text style={styles.btnTxt}>Enviar datos →</Text>
      </TouchableOpacity>
    </View>
  );
}

function PantallaB({ route, navigation }: any) {
  // TODO: desestructura nombre y ciudad de route.params
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📥 Datos recibidos</Text>
      {/* TODO: muestra nombre y ciudad */}
      <Text style={styles.hint}>Aquí mostrarás los parámetros recibidos</Text>
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#607d8b' }]} onPress={() => navigation.goBack()}>
        <Text style={styles.btnTxt}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Mini02Ejercicio() {
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
  hint:      { color: '#888', textAlign: 'center', marginBottom: 16 },
  btn:       { backgroundColor: '#1a73e8', padding: 14, borderRadius: 8, marginTop: 8 },
  btnTxt:    { color: 'white', fontSize: 16, fontWeight: '600' },
});
