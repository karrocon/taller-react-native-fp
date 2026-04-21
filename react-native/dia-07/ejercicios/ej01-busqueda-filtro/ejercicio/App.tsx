/**
 * DÍA 7 — Pokédex con búsqueda y filtros (stub)
 * ─────────────────────────────────────────────────
 * Partimos de la Pokédex completa (días 5-6) y añadimos:
 *   1. TextInput de búsqueda que filtre por nombre
 *   2. Botones horizontales con tipos (agua, fuego, planta…)
 *   3. FlatList que filtra según búsqueda + tipo activo
 *
 * TODO:
 *   1. Descomenta y completa el useMemo para filtrar por nombre y tipo:
 *      const filtrados = useMemo<PokemonLista[]>(() => {
 *        return pokemon.filter(p => {
 *          const coincideNombre = p.name.includes(busqueda.toLowerCase().trim());
 *          const coincideTipo   = tipoActivo === 'todos' || (p.tipos ?? []).includes(tipoActivo);
 *          return coincideNombre && coincideTipo;
 *        });
 *      }, [pokemon, busqueda, tipoActivo]);
 *
 *   2. Añade el TextInput de búsqueda (value={busqueda}, onChangeText={setBusqueda})
 *   3. Añade la barra de tipos con ScrollView horizontal
 *   4. BONUS: muestra un contador "X Pokémon encontrados"
 *
 * CONCEPTS: useMemo, TextInput búsqueda, ScrollView horizontal
 */

import { useState, useEffect, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, ScrollView,
  TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import PokemonCard from './src/components/PokemonCard';
import { fetchLista, TIPO_COLOR, cap } from './src/api/pokeapi';
import type { PokemonLista } from './src/types/pokemon';

const TIPOS: string[] = ['todos', 'fire', 'water', 'grass', 'electric', 'psychic', 'ghost', 'dragon', 'normal'];

export default function App() {
  const [pokemon,    setPokemon]    = useState<PokemonLista[]>([]);
  const [cargando,   setCargando]   = useState<boolean>(true);
  const [busqueda,   setBusqueda]   = useState<string>('');
  const [tipoActivo, setTipoActivo] = useState<string>('todos');

  useEffect(() => {
    fetchLista(151).then((lista: PokemonLista[]) => { setPokemon(lista); setCargando(false); });
  }, []);

  // TODO: filtrar pokemon por busqueda (nombre) y tipoActivo con useMemo
  // const filtrados = useMemo<PokemonLista[]>(() => {
  //   return pokemon.filter(p => {
  //     const coincideNombre = p.name.includes(busqueda.toLowerCase().trim());
  //     const coincideTipo   = tipoActivo === 'todos' || (p.tipos ?? []).includes(tipoActivo);
  //     return coincideNombre && coincideTipo;
  //   });
  // }, [pokemon, busqueda, tipoActivo]);

  const filtrados = pokemon; // reemplaza esto con useMemo

  if (cargando) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#cc0000" />;

  return (
    <View style={styles.container}>
      {/* TODO: TextInput de búsqueda */}

      {/* TODO: ScrollView horizontal con botones de tipo */}
      {/* {TIPOS.map((tipo: string) => ( ... ))} */}

      {/* TODO: contador de resultados */}

      <FlatList
        data={filtrados}
        keyExtractor={(item: PokemonLista) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }: { item: PokemonLista }) => (
          <PokemonCard pokemon={item} onPress={() => {}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  search:    { margin: 12, marginBottom: 6, padding: 10, borderRadius: 8, backgroundColor: 'white', fontSize: 15, borderWidth: 1, borderColor: '#ddd' },
  tiposRow:  { paddingLeft: 12, marginBottom: 8 },
  tipoBtn:   { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  tipoBtnTxt:{ fontSize: 13, fontWeight: '600' },
  contador:  { paddingHorizontal: 16, marginBottom: 4, color: '#888', fontSize: 13 },
});
