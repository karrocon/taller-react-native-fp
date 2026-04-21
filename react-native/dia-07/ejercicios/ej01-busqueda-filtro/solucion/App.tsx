// SOLUCIÓN — Día 7: Búsqueda y filtros en la Pokédex

import { useState, useEffect, useMemo } from 'react';
import {
  View, Text, TextInput, FlatList, ScrollView,
  TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import PokemonCard from './src/components/PokemonCard';
import { TIPO_COLOR, cap } from './src/api/pokeapi';
import type { PokemonLista } from './src/types/pokemon';

const BASE   = 'https://pokeapi.co/api/v2';
const getId  = (url: string): string => url.split('/').filter(Boolean).pop()!;

const TIPOS_VISIBLES: string[] = [
  'todos', 'fire', 'water', 'grass', 'electric', 'psychic',
  'ghost', 'dragon', 'normal', 'poison', 'bug', 'rock',
];

export default function App() {
  const [pokemon,    setPokemon]    = useState<PokemonLista[]>([]);
  const [cargando,   setCargando]   = useState<boolean>(true);
  const [busqueda,   setBusqueda]   = useState<string>('');
  const [tipoActivo, setTipoActivo] = useState<string>('todos');

  useEffect(() => {
    async function cargarConTipos(): Promise<void> {
      try {
        const res  = await fetch(`${BASE}/pokemon?limit=151`);
        const data: { results: Array<{ name: string; url: string }> } = await res.json();
        const lista: PokemonLista[] = data.results.map(p => ({ name: p.name, url: p.url, id: getId(p.url) }));

        const enriquecida = await enriquecerConTipos(lista);
        setPokemon(enriquecida);
      } finally {
        setCargando(false);
      }
    }
    cargarConTipos();
  }, []);

  async function enriquecerConTipos(lista: PokemonLista[]): Promise<PokemonLista[]> {
    const grupos: PokemonLista[][] = [];
    for (let i = 0; i < lista.length; i += 30) grupos.push(lista.slice(i, i + 30));

    const resultado: PokemonLista[] = [];
    for (const grupo of grupos) {
      const detalles = await Promise.all(
        grupo.map((p: PokemonLista) =>
          fetch(`${BASE}/pokemon/${p.id}`).then(r => r.json())
        )
      );
      detalles.forEach((d: any, i: number) => {
        resultado.push({ ...grupo[i], tipos: d.types.map((t: any) => t.type.name) });
      });
    }
    return resultado;
  }

  // Lista filtrada por nombre y tipo
  const filtrados = useMemo<PokemonLista[]>(() => {
    return pokemon.filter((p: PokemonLista) => {
      const coincideNombre = p.name.includes(busqueda.toLowerCase().trim());
      const coincideTipo   = tipoActivo === 'todos' || (p.tipos ?? []).includes(tipoActivo);
      return coincideNombre && coincideTipo;
    });
  }, [pokemon, busqueda, tipoActivo]);

  if (cargando) return (
    <View style={styles.centrado}>
      <ActivityIndicator size="large" color="#cc0000" />
      <Text style={{ marginTop: 10, color: '#666' }}>Cargando Pokédex… (puede tardar)</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <TextInput
        style={styles.search}
        placeholder="🔍 Buscar Pokémon..."
        value={busqueda}
        onChangeText={(t: string) => setBusqueda(t)}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {/* Filtros de tipo */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tiposRow}
        contentContainerStyle={{ paddingRight: 12 }}
      >
        {TIPOS_VISIBLES.map((tipo: string) => {
          const activo = tipo === tipoActivo;
          const color  = tipo === 'todos' ? '#cc0000' : (TIPO_COLOR[tipo] ?? '#aaa');
          return (
            <TouchableOpacity
              key={tipo}
              style={[styles.tipoBtn, { backgroundColor: activo ? color : color + '33', borderColor: color, borderWidth: 1 }]}
              onPress={() => setTipoActivo(tipo)}
            >
              <Text style={[styles.tipoBtnTxt, { color: activo ? 'white' : color }]}>{cap(tipo)}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Contador */}
      <Text style={styles.contador}>{filtrados.length} Pokémon encontrados</Text>

      {/* Lista */}
      <FlatList
        data={filtrados}
        keyExtractor={(item: PokemonLista) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        ListEmptyComponent={<Text style={styles.vacio}>No hay Pokémon que coincidan.</Text>}
        renderItem={({ item }: { item: PokemonLista }) => (
          <PokemonCard pokemon={item} onPress={() => {}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centrado:  { flex: 1, alignItems: 'center', justifyContent: 'center' },
  search:    { margin: 12, marginBottom: 6, padding: 10, borderRadius: 8, backgroundColor: 'white', fontSize: 15, borderWidth: 1, borderColor: '#ddd' },
  tiposRow:  { paddingLeft: 12, marginBottom: 8 },
  tipoBtn:   { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  tipoBtnTxt:{ fontSize: 13, fontWeight: '600' },
  contador:  { paddingHorizontal: 16, marginBottom: 4, color: '#888', fontSize: 13 },
  vacio:     { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 15 },
});
