// src/screens/HomeScreen.tsx — Lista principal de Pokémon
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
    fetchLista(151)
      .then((lista: PokemonLista[]) => { setPokemon(lista); setCargando(false); })
      .catch((e: Error) => { setError(e.message); setCargando(false); });
  }, []);

  if (cargando) return (
    <View style={styles.centrado}>
      <ActivityIndicator size="large" color="#cc0000" />
      <Text style={styles.cargandoTxt}>Cargando 151 Pokémon...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.centrado}>
      <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
    </View>
  );

  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item: PokemonLista) => item.id}
      numColumns={2}
      contentContainerStyle={styles.lista}
      renderItem={({ item }: { item: PokemonLista }) => (
        <PokemonCard
          pokemon={item}
          onPress={() => navigation.navigate('Detalle', {
            id:     item.id,
            nombre: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          })}
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
