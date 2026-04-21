// MINI 01 — Ejercicio: Tu primer Stack Navigator
//
// OBJETIVO: Conectar dos pantallas con navegación Stack.
//
// TODO 1: Crea el Stack Navigator con NavigationContainer + createNativeStackNavigator
// TODO 2: Registra las dos pantallas: PantallaA y PantallaB
// TODO 3: En PantallaA añade un botón que navegue a PantallaB
// TODO 4: En PantallaB añade un botón que vuelva atrás (navigation.goBack())

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// TODO: importa NavigationContainer y createNativeStackNavigator
// TODO: define el Stack

function PantallaA({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏠 Pantalla A</Text>
      {/* TODO: añade un TouchableOpacity que navegue a PantallaB */}
      <Text style={styles.hint}>Añade un botón para ir a Pantalla B</Text>
    </View>
  );
}

function PantallaB({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📄 Pantalla B</Text>
      {/* TODO: añade un botón que llame a navigation.goBack() */}
      <Text style={styles.hint}>Añade un botón para volver</Text>
    </View>
  );
}

export default function Mini01Ejercicio() {
  // TODO: envuelve en NavigationContainer + Stack.Navigator con PantallaA y PantallaB
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mini 01 — Sin resolver</Text>
      <Text style={styles.hint}>Implementa el navigator en este archivo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  titulo:    { fontSize: 24, fontWeight: 'bold', color: '#1a73e8', marginBottom: 16 },
  hint:      { color: '#888', textAlign: 'center', paddingHorizontal: 32 },
  btn:       { backgroundColor: '#1a73e8', padding: 14, borderRadius: 8, marginTop: 16 },
  btnTxt:    { color: 'white', fontSize: 16, fontWeight: '600' },
});
