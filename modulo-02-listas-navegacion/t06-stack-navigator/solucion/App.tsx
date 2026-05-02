import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// ── Tipos ──────────────────────────────────────────────────────────────────────
type PokedexStackParamList = {
  Pokedex: undefined;
  Detalle: { nombre: string; id: number };
};

type PokedexScreenProps = NativeStackScreenProps<PokedexStackParamList, 'Pokedex'>;
type DetalleScreenProps = NativeStackScreenProps<PokedexStackParamList, 'Detalle'>;

const Stack = createNativeStackNavigator<PokedexStackParamList>();

// ── Datos ──────────────────────────────────────────────────────────────────────
const POKEMONS = [
  { id: 1, nombre: 'bulbasaur' },
  { id: 4, nombre: 'charmander' },
  { id: 7, nombre: 'squirtle' },
  { id: 25, nombre: 'pikachu' },
];

// ── Pantallas ──────────────────────────────────────────────────────────────────
function PokedexScreen({ navigation }: PokedexScreenProps) {
  return (
    <FlatList
      data={POKEMONS}
      keyExtractor={(p) => p.id.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Detalle', { nombre: item.nombre, id: item.id })}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` }}
            style={styles.sprite}
          />
          <Text style={styles.nombre}>{item.nombre}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

function DetalleScreen({ route, navigation }: DetalleScreenProps) {
  const { nombre, id } = route.params;
  return (
    <View style={styles.center}>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
        style={styles.artwork}
      />
      <Text style={styles.title}>{nombre}</Text>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── App root ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#EF5350' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Pokedex" component={PokedexScreen} options={{ title: 'Mi Pokédex' }} />
        <Stack.Screen
          name="Detalle"
          component={DetalleScreen}
          options={({ route }) => ({ title: route.params.nombre })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3 },
  sprite: { width: 56, height: 56 },
  nombre: { fontSize: 15, fontWeight: '700', textTransform: 'capitalize', marginLeft: 12, color: '#212121' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#fff' },
  artwork: { width: 200, height: 200 },
  title: { fontSize: 26, fontWeight: '700', textTransform: 'capitalize', color: '#212121' },
  backBtn: { backgroundColor: '#EF5350', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  backText: { color: '#fff', fontWeight: '700' },
});
