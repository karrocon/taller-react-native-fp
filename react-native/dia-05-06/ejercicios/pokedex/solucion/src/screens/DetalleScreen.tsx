// src/screens/DetalleScreen.tsx — Pantalla de detalle del Pokémon
import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchDetalle, getSprite, cap, TIPO_COLOR } from '../api/pokeapi';
import type { DetalleScreenProps, PokemonDetalle } from '../types/pokemon';

export default function DetalleScreen({ route }: DetalleScreenProps) {
  const { id } = route.params;
  const [datos,    setDatos]    = useState<PokemonDetalle | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    fetchDetalle(id)
      .then((d: PokemonDetalle) => { setDatos(d); setCargando(false); })
      .catch(() => setCargando(false));
  }, [id]);

  if (cargando) return (
    <View style={styles.centrado}><ActivityIndicator size="large" color="#cc0000" /></View>
  );

  if (!datos) return (
    <View style={styles.centrado}><Text>No se encontraron datos.</Text></View>
  );

  const tipoColor: string = TIPO_COLOR[datos.types[0].type.name] ?? '#999';
  const maxStat = 255;

  return (
    <ScrollView style={[styles.container, { backgroundColor: tipoColor + '22' }]}>
      <View style={[styles.header, { backgroundColor: tipoColor }]}>
        <Image source={{ uri: getSprite(id) }} style={styles.sprite} />
        <Text style={styles.num}>#{String(id).padStart(3, '0')}</Text>
        <Text style={styles.nombre}>{cap(datos.name)}</Text>
        <View style={styles.tipos}>
          {datos.types.map(t => (
            <View key={t.type.name} style={[styles.tipoBadge, { backgroundColor: TIPO_COLOR[t.type.name] ?? '#999' }]}>
              <Text style={styles.tipoTxt}>{cap(t.type.name)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoVal}>{datos.weight / 10} kg</Text>
          <Text style={styles.infoLabel}>Peso</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoVal}>{datos.height / 10} m</Text>
          <Text style={styles.infoLabel}>Altura</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoVal}>{datos.base_experience ?? '?'}</Text>
          <Text style={styles.infoLabel}>Exp. base</Text>
        </View>
      </View>

      <Text style={styles.sectionTitulo}>Estadísticas base</Text>
      <View style={styles.statsContainer}>
        {datos.stats.map(s => (
          <View key={s.stat.name} style={styles.statRow}>
            <Text style={styles.statNombre}>{cap(s.stat.name.replace('-', ' '))}</Text>
            <Text style={styles.statVal}>{s.base_stat}</Text>
            <View style={styles.statBar}>
              <View style={[styles.statFill, { width: `${(s.base_stat / maxStat) * 100}%` as any, backgroundColor: tipoColor }]} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  centrado:       { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header:         { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 16 },
  sprite:         { width: 150, height: 150 },
  num:            { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  nombre:         { color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  tipos:          { flexDirection: 'row', gap: 8 },
  tipoBadge:      { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  tipoTxt:        { color: 'white', fontWeight: '600', fontSize: 13 },
  infoRow:        { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: 'white', margin: 12, borderRadius: 12, elevation: 1 },
  infoItem:       { alignItems: 'center' },
  infoVal:        { fontSize: 18, fontWeight: 'bold', color: '#333' },
  infoLabel:      { fontSize: 12, color: '#888', marginTop: 2 },
  sectionTitulo:  { fontSize: 17, fontWeight: 'bold', paddingHorizontal: 16, marginBottom: 8, color: '#333' },
  statsContainer: { backgroundColor: 'white', marginHorizontal: 12, borderRadius: 12, padding: 16, marginBottom: 20 },
  statRow:        { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statNombre:     { width: 100, fontSize: 12, color: '#666' },
  statVal:        { width: 34, textAlign: 'right', fontWeight: 'bold', fontSize: 13, color: '#333', marginRight: 8 },
  statBar:        { flex: 1, height: 8, backgroundColor: '#eee', borderRadius: 4, overflow: 'hidden' },
  statFill:       { height: '100%', borderRadius: 4 },
});
