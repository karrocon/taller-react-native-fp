import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SPLASH, MAIN, POKEDEX_TAB, AJUSTES_TAB, HOME_TAB, DETALLE, POKEDEX, HOME, CONFIGURAR_EQUIPO, BATALLA } from '../constants/navigation';
import { Pokemon } from './pokemon';

// Root Stack: Splash → aplicación principal
export type RootStackParamList = {
  [SPLASH]: undefined;
  [MAIN]:   undefined;
};

// Bottom Tabs: Pokédex + Ajustes
export type TabsParamList = {
  [HOME_TAB]: undefined;
  [POKEDEX_TAB]: undefined;
  [AJUSTES_TAB]: undefined;
};

// Home Stack: Home + ConfigurarEquipo + Batalla
export type HomeStackParamList = {
  [HOME]: undefined;
  [CONFIGURAR_EQUIPO]: undefined;
  [BATALLA]: { equipo: Pokemon[] };
}

// Pokédex Stack (dentro del tab Pokédex)
export type PokedexStackParamList = {
  [POKEDEX]: undefined;
  [DETALLE]: { pokemon: Pokemon };
};

// Props de cada pantalla
export type SplashScreenProps =
  NativeStackScreenProps<RootStackParamList, typeof SPLASH>;
export type PokedexScreenProps =
  NativeStackScreenProps<PokedexStackParamList, typeof POKEDEX>;
export type DetallePokemonScreenProps =
  NativeStackScreenProps<PokedexStackParamList, typeof DETALLE>;
export type HomeScreenProps =
  NativeStackScreenProps<HomeStackParamList, typeof HOME>;
export type ConfigurarEquipoScreenProps =
  NativeStackScreenProps<HomeStackParamList, typeof CONFIGURAR_EQUIPO>;
export type BatallaScreenProps =
  NativeStackScreenProps<HomeStackParamList, typeof BATALLA>;