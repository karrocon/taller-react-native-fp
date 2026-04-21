// src/types/navigation.ts — Tipos de navegacion para el ejercicio 1
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
export type RootStackParamList = {
  Home:    undefined;
  Detalle: { nombre: string; rol: string };
  Ajustes: undefined;
};
export type HomeScreenProps    = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetalleScreenProps = NativeStackScreenProps<RootStackParamList, 'Detalle'>;
export type AjustesScreenProps = NativeStackScreenProps<RootStackParamList, 'Ajustes'>;
