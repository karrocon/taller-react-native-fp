// src/components/PokemonCard.tsx
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { PokemonLista } from '../types/pokemon';
import { getSprite, cap } from '../api/pokeapi';

type Props = {
  pokemon: PokemonLista;
  onPress: () => void;
};

export default function PokemonCard({ pokemon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: getSprite(pokemon.id) }}
        style={styles.sprite}
        resizeMode="contain"
      />
      <Text style={styles.num}>#{String(pokemon.id).padStart(3, '0')}</Text>
      <Text style={styles.nombre}>{cap(pokemon.name)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:   { flex: 1, backgroundColor: 'white', margin: 6, borderRadius: 12, alignItems: 'center', padding: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4 },
  sprite: { width: 90, height: 90 },
  num:    { color: '#aaa', fontSize: 12, marginTop: 4 },
  nombre: { fontWeight: '600', fontSize: 14, color: '#333', marginTop: 2 },
});
