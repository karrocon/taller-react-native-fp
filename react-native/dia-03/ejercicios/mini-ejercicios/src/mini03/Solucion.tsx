// MINI 03 — Solución: Personalizar el header

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function PantallaA({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>✏️ Introduce tu nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre..."
        value={nombre}
        onChangeText={setNombre}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('PantallaB', { nombre: nombre || 'Anónimo' })}
      >
        <Text style={styles.btnTxt}>Continuar →</Text>
      </TouchableOpacity>
    </View>
  );
}

function PantallaB({ route }: any) {
  const { nombre } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👋 ¡Hola, {nombre}!</Text>
      <Text style={styles.hint}>El título del header muestra tu nombre</Text>
    </View>
  );
}

export default function Mini03Solucion() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#e91e63' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="PantallaA" component={PantallaA} options={{ title: 'Inicio' }} />
        <Stack.Screen
          name="PantallaB"
          component={PantallaB}
          options={({ route }) => ({ title: (route.params as any).nombre })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo:    { fontSize: 24, fontWeight: 'bold', color: '#e91e63', marginBottom: 16 },
  hint:      { color: '#888', textAlign: 'center' },
  input:     { backgroundColor: 'white', borderRadius: 8, padding: 12, width: '90%', fontSize: 16, borderWidth: 1, borderColor: '#ddd', marginBottom: 12 },
  btn:       { backgroundColor: '#e91e63', padding: 14, borderRadius: 8, width: '90%', alignItems: 'center' },
  btnTxt:    { color: 'white', fontSize: 16, fontWeight: '600' },
});
