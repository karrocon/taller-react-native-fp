// src/types/pokemon.ts — Tipos compartidos del proyecto Pokédex
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/** Un elemento de la lista de Pokémon */
export type PokemonLista = {
  id: string;
  name: string;
  url: string;
  tipos?: string[];
};

/** Respuesta completa de /pokemon/{id} */
export type PokemonDetalle = {
  id: number;
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  types: Array<{ type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: { front_default: string };
};

/** Rutas de la navegación */
export type RootStackParamList = {
  Home:    undefined;
  Detalle: { id: string; nombre: string };
};

export type HomeScreenProps    = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetalleScreenProps = NativeStackScreenProps<RootStackParamList, 'Detalle'>;
