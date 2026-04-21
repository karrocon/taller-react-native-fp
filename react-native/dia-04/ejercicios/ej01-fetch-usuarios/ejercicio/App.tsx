/**
 * EJERCICIO 1 — Consumo de API con fetch y useEffect
 * ─────────────────────────────────────────────────────
 * ENUNCIADO:
 *   Crea una app que cargue una lista de usuarios desde:
 *     https://jsonplaceholder.typicode.com/users
 *
 *   Debe mostrar:
 *     - Indicador de carga mientras se descarga (ActivityIndicator)
 *     - La lista de usuarios (nombre + email)
 *     - Un mensaje de error si la petición falla
 *     - Botón "Recargar" para volver a pedir los datos
 *
 * CONCEPTS: fetch, async/await, useEffect, estados loading/error, tipos en TS
 *
 * PISTAS:
 *   type Usuario = { id: number; name: string; email: string; address: { city: string } };
 *
 *   const [datos,    setDatos]    = useState<Usuario[]>([]);
 *   const [cargando, setCargando] = useState<boolean>(true);
 *   const [error,    setError]    = useState<string | null>(null);
 *
 *   useEffect(() => { cargarDatos(); }, []);
 *
 *   async function cargarDatos(): Promise<void> {
 *     try { ... } catch (e) { setError((e as Error).message); } finally { ... }
 *   }
 */

import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

// En un proyecto real → src/types/usuario.ts
type Usuario = {
  id: number;
  name: string;
  email: string;
  address: { city: string };
};

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  // TODO: estados para datos, cargando y error

  // TODO: useEffect que llama a cargarDatos al montar

  // TODO: función cargarDatos con fetch, async/await y try/catch

  // TODO: si cargando → mostrar ActivityIndicator
  // TODO: si error    → mostrar mensaje + botón recargar
  // TODO: si ok       → mostrar FlatList con los usuarios

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Usuarios</Text>
      {/* TODO */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo:    { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 16 },
});
