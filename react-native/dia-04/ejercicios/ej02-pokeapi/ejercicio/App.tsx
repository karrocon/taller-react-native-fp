/**
 * EJERCICIO 2 — Lista de Pokémon desde PokéAPI
 * ──────────────────────────────────────────────
 * Partimos del patrón fetch del ejercicio anterior (ej01-fetch-usuarios)
 * y lo adaptamos para consumir la PokéAPI.
 *
 * ENUNCIADO:
 *   Crea una app que cargue los primeros 20 Pokémon desde:
 *     https://pokeapi.co/api/v2/pokemon?limit=20
 *
 *   Muestra cada Pokémon con:
 *     - Su nombre (capitalizado)
 *     - Su imagen (sprite oficial)
 *     - Su número de ID
 *
 *   BONUS: al pulsar un Pokémon, muestra su peso y altura en un Modal
 *
 * TODO:
 *   1. Cambia el tipo de datos de Usuario[] a PokemonLista[]
 *   2. Cambia la API_URL a 'https://pokeapi.co/api/v2/pokemon?limit=20'
 *   3. En cargarDatos(), transforma data.results con getId()
 *   4. Adapta la FlatList con numColumns={2} y usa <Image> para el sprite
 *   5. BONUS: añade un Modal para mostrar peso y altura al pulsar
 *
 * CONCEPTS: fetch anidado, FlatList, Image, TouchableOpacity, Modal, tipos TS
 */

import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Image, ActivityIndicator,
  TouchableOpacity, StyleSheet, RefreshControl,
} from 'react-native';

// TODO: cambia el tipo a PokemonLista
type Usuario = {
  id: number;
  name: string;
  email: string;
  address: { city: string };
};

// TODO: usa estas utilidades para la PokéAPI
// type PokemonLista = { name: string; url: string; id: string };
// const API = 'https://pokeapi.co/api/v2/pokemon?limit=20';
// const getId  = (url: string): string => url.split('/').filter(Boolean).pop()!;
// const cap    = (s: string): string   => s.charAt(0).toUpperCase() + s.slice(1);
// const SPRITE = (id: string): string  =>
//   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const API_URL = 'https://jsonplaceholder.typicode.com/users';  // TODO: cambia a la PokéAPI

export default function App() {
  const [datos,      setDatos]      = useState<Usuario[]>([]);   // TODO: PokemonLista[]
  const [cargando,   setCargando]   = useState<boolean>(true);
  const [error,      setError]      = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos(esRefresh: boolean = false): Promise<void> {
    try {
      if (esRefresh) setRefreshing(true);
      else setCargando(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const json = await res.json();
      setDatos(json);  // TODO: transformar data.results con getId()
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
      setRefreshing(false);
    }
  }

  if (cargando) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{ color: 'white', marginTop: 10 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔴 Pokédex</Text>
      {/* TODO: FlatList numColumns={2} con sprite e Image */}
      {/* TODO BONUS: Modal con peso y altura al pulsar */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cc0000', paddingTop: 40 },
  titulo:    { fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 10 },
});
