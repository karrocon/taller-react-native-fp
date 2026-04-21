import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { PokemonData } from './pokemon';

export type RootStackParamList = {
  Lista:   undefined;
  Detalle: { pokemon: PokemonData };
};

export type ListaScreenProps   = NativeStackScreenProps<RootStackParamList, 'Lista'>;
export type DetalleScreenProps = NativeStackScreenProps<RootStackParamList, 'Detalle'>;
