/**
 * DÍAS 5-6 — Pokédex completa: App.tsx (stub)
 * ──────────────────────────────────────────────
 * Partimos del ej02-pokeapi (día 4) y lo expandimos con:
 *   - Arquitectura modular en src/
 *   - React Navigation para detalle
 *   - Componente PokemonCard reutilizable
 *   - Pantalla de detalle con stats
 *
 * ESTRUCTURA DEL PROYECTO:
 *   App.tsx                       ← NavigationContainer + Stack (aquí)
 *   src/
 *     types/pokemon.ts            ← PokemonLista, PokemonDetalle, RootStackParamList
 *     api/pokeapi.ts              ← fetchLista, fetchDetalle, TIPO_COLOR, cap
 *     components/PokemonCard.tsx  ← tarjeta reutilizable
 *     screens/HomeScreen.tsx      ← FlatList de Pokémon (TODO)
 *     screens/DetalleScreen.tsx   ← detalle con stats y tipos (TODO)
 *
 * TODO en App.tsx:
 *   - Añade HomeScreen y DetalleScreen al Stack
 *   - Configura headerStyle (rojo #cc0000)
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types/pokemon';
import HomeScreen    from './src/screens/HomeScreen';
import DetalleScreen from './src/screens/DetalleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* TODO: añade HomeScreen y DetalleScreen con opciones de header */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
