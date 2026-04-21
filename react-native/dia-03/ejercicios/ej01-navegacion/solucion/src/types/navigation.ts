import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home:    undefined;
  Detalle: { nombre: string; rol: string };
  Ajustes: undefined;
};

export type HomeProps    = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetalleProps = NativeStackScreenProps<RootStackParamList, 'Detalle'>;
export type AjustesProps = NativeStackScreenProps<RootStackParamList, 'Ajustes'>;
