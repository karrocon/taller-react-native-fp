import { View, Text, StyleSheet } from 'react-native';
import type { ListaScreenProps } from '../types/navigation';
import type { PokemonData } from '../types/pokemon';

const POKEMON_DATA: PokemonData[] = [
  { id: '1',   nombre: 'Bulbasaur',  tipo: 'Planta',  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: '4',   nombre: 'Charmander', tipo: 'Fuego',   sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: '7',   nombre: 'Squirtle',   tipo: 'Agua',    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { id: '25',  nombre: 'Pikachu',    tipo: 'Electro', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { id: '133', nombre: 'Eevee',      tipo: 'Normal',  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
];

export default function ListaScreen({ navigation }: ListaScreenProps) {
  return (
    <View style={styles.container}>
      {/* TODO 1: Añade un FlatList con numColumns={2} mostrando las tarjetas de POKEMON_DATA */}
      {/* Cada tarjeta debe mostrar el sprite (Image), número, nombre y tipo */}
      {/* TODO 2: Al presionar una tarjeta, navega a 'Detalle' pasando { pokemon: item } */}
      <Text style={styles.hint}>👆 Implementa el FlatList con numColumns={2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 8 },
  hint:      { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 },
});
