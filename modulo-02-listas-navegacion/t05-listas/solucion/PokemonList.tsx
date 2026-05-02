import { FlatList, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

type TipoPokemon =
  | 'normal' | 'fuego' | 'agua' | 'planta' | 'eléctrico' | 'hielo'
  | 'lucha' | 'veneno' | 'tierra' | 'volador' | 'psíquico' | 'bicho'
  | 'roca' | 'fantasma' | 'dragón' | 'siniestro' | 'acero' | 'hada';

const tipoColor: Record<TipoPokemon, string> = {
  normal: '#A8A878', fuego: '#F08030', agua: '#6890F0', planta: '#78C850',
  eléctrico: '#F8D030', hielo: '#98D8D8', lucha: '#C03028', veneno: '#A040A0',
  tierra: '#E0C068', volador: '#A890F0', psíquico: '#F85888', bicho: '#A8B820',
  roca: '#B8A038', fantasma: '#705898', dragón: '#7038F8', siniestro: '#705848',
  acero: '#B8B8D0', hada: '#EE99AC',
};

type Pokemon = {
  id: number;
  indice: number;
  nombre: string;
  thumbnail: string;
  tipos: TipoPokemon[];
};

const MOCK_POKEMONS: Pokemon[] = [
  { id: 1,  indice: 1,  nombre: 'bulbasaur',  thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',  tipos: ['planta', 'veneno'] },
  { id: 4,  indice: 4,  nombre: 'charmander', thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',  tipos: ['fuego'] },
  { id: 7,  indice: 7,  nombre: 'squirtle',   thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',  tipos: ['agua'] },
  { id: 25, indice: 25, nombre: 'pikachu',    thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', tipos: ['eléctrico'] },
  { id: 39, indice: 39, nombre: 'jigglypuff', thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png', tipos: ['normal', 'hada'] },
  { id: 94, indice: 94, nombre: 'gengar',     thumbnail: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png', tipos: ['fantasma', 'veneno'] },
];

type Props = {
  data?: Pokemon[];
  onSelect?: (pokemon: Pokemon) => void;
};

export default function PokemonList({ data = MOCK_POKEMONS, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PokemonListItem pokemon={item} onSelect={onSelect} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text style={styles.empty}>No hay Pokémon</Text>}
      contentContainerStyle={styles.list}
    />
  );
}

type ListItemProps = { pokemon: Pokemon; onSelect?: (p: Pokemon) => void };

function PokemonListItem({ pokemon, onSelect }: ListItemProps) {
  const { indice, nombre, thumbnail, tipos } = pokemon;
  const primaryColor = tipoColor[tipos[0]];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect?.(pokemon)}
      activeOpacity={0.8}
    >
      <View style={[styles.stripe, { backgroundColor: primaryColor }]} />
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.index}>#{String(indice).padStart(3, '0')}</Text>
        <Text style={styles.nombre}>{nombre}</Text>
        <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
          {tipos.map((t) => (
            <View key={t} style={[styles.badge, { backgroundColor: tipoColor[t] }]}>
              <Text style={styles.badgeText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 8 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginHorizontal: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
  stripe: { width: 6, alignSelf: 'stretch' },
  image: { width: 72, height: 72, margin: 8 },
  info: { flex: 1, paddingVertical: 10, paddingRight: 12, justifyContent: 'center', gap: 4 },
  index: { fontSize: 12, color: '#9E9E9E', fontWeight: '600' },
  nombre: { fontSize: 15, fontWeight: '700', textTransform: 'capitalize', color: '#212121' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { fontSize: 10, color: '#fff', fontWeight: '600', textTransform: 'capitalize' },
  separator: { height: 8 },
  empty: { textAlign: 'center', padding: 32, color: '#9E9E9E' },
});
