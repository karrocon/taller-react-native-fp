// src/screens/DetalleScreen.tsx — Pantalla de detalle del Pokémon (stub)
import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchDetalle, getSprite, cap, TIPO_COLOR } from '../api/pokeapi';
import type { DetalleScreenProps, PokemonDetalle } from '../types/pokemon';

export default function DetalleScreen({ route }: DetalleScreenProps) {
  const { id } = route.params;
  const [datos,    setDatos]    = useState<PokemonDetalle | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    // TODO: llama a fetchDetalle(id) y guarda en setDatos
  }, [id]);

  // TODO: si cargando → ActivityIndicator
  // TODO: si !datos   → mensaje de error

  return (
    <ScrollView style={styles.container}>
      {/* TODO: cabecera con sprite, número, nombre y tipos */}
      {/* TODO: fila de info (peso, altura, exp base) */}
      {/* TODO: barras de estadísticas */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centrado:  { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
