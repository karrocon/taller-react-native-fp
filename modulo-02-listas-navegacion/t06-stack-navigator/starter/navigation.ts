import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// ── Stack de la Pokédex (igual que PokeApp) ────────────────────────────────────
export type PokedexStackParamList = {
  Pokedex:  undefined;
  Detalle:  { nombre: string; id: number };
};

export type PokedexScreenProps  = NativeStackScreenProps<PokedexStackParamList, 'Pokedex'>;
export type DetalleScreenProps  = NativeStackScreenProps<PokedexStackParamList, 'Detalle'>;
