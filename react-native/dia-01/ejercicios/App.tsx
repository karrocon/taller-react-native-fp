/**
 * App.tsx — Ejercicios Día 1
 *
 * Este archivo es reemplazado automáticamente por run-ejercicio.ps1
 * cuando seleccionas un ejercicio.
 *
 * Ejecuta desde react-native/dia-01/:
 *   .\run-ejercicio.ps1 -Ejercicio ej01
 *   .\run-ejercicio.ps1 -Ejercicio ej02 -Target android
 *   .\run-ejercicio.ps1 -Ejercicio bonus -Target web
 */

import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RN Ejercicios — Día 1</Text>
      <Text style={styles.subtitle}>Ejecuta run-ejercicio.ps1 para cargar un ejercicio.</Text>
      <Text style={styles.code}>.\run-ejercicio.ps1 -Ejercicio ej01</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2078f3',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    backgroundColor: '#282c34',
    color: '#98c379',
    padding: 10,
    borderRadius: 6,
  },
});
