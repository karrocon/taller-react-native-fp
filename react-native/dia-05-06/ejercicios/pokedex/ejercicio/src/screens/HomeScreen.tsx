// src/screens/HomeScreen.tsx — Lista principal de Pokémon (stub)
import { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import { fetchLista } from '../api/pokeapi';
import type { HomeScreenProps, PokemonLista } from '../types/pokemon';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [pokemon,  setPokemon]  = useState<PokemonLista[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    // TODO: llama a fetchLista(151) y guarda el resultado
    //       maneja el error con .catch()
  }, []);

  // TODO: si cargando → ActivityIndicator
  // TODO: si error    → mensaje de error

  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item: PokemonLista) => item.id}
      numColumns={2}
      contentContainerStyle={styles.lista}
      renderItem={({ item }: { item: PokemonLista }) => (
        <PokemonCard
          pokemon={item}
          onPress={() => {
            // TODO: navigation.navigate('Detalle', { id: item.id, nombre: ... })
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista:       { padding: 8, backgroundColor: '#f5f5f5' },
  centrado:    { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  cargandoTxt: { color: '#666', fontSize: 14 },
});
