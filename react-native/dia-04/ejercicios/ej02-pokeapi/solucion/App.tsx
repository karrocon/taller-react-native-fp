import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Image, ActivityIndicator,
  TouchableOpacity, StyleSheet, Modal,
} from 'react-native';

// En un proyecto real → src/types/pokemon.ts
type PokemonLista = { name: string; url: string; id: string };
type PokemonDetalle = {
  weight: number;
  height: number;
  types: Array<{ type: { name: string } }>;
};

const API    = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const getId  = (url: string): string => url.split('/').filter(Boolean).pop()!;
const cap    = (s: string): string   => s.charAt(0).toUpperCase() + s.slice(1);
const SPRITE = (id: string): string  =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export default function App() {
  const [pokemon,      setPokemon]      = useState<PokemonLista[]>([]);
  const [cargando,     setCargando]     = useState<boolean>(true);
  const [seleccionado, setSeleccionado] = useState<PokemonLista | null>(null);
  const [detalle,      setDetalle]      = useState<PokemonDetalle | null>(null);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then((data: { results: Array<{ name: string; url: string }> }) => {
        setPokemon(data.results.map(p => ({ name: p.name, url: p.url, id: getId(p.url) })));
        setCargando(false);
      });
  }, []);

  const handleSeleccionar = async (p: PokemonLista): Promise<void> => {
    setSeleccionado(p);
    setDetalle(null);
    const res  = await fetch(p.url);
    const json: PokemonDetalle = await res.json();
    setDetalle(json);
  };

  if (cargando) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{ color: 'white', marginTop: 10 }}>Cargando Pokédex...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔴 Pokédex</Text>

      <FlatList
        data={pokemon}
        keyExtractor={(item: PokemonLista) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
        renderItem={({ item }: { item: PokemonLista }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSeleccionar(item)}>
            <Image source={{ uri: SPRITE(item.id) }} style={styles.sprite} />
            <Text style={styles.cardNum}>#{item.id.padStart(3, '0')}</Text>
            <Text style={styles.cardNombre}>{cap(item.name)}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!seleccionado} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {seleccionado && (
              <>
                <Image source={{ uri: SPRITE(seleccionado.id) }} style={styles.modalSprite} />
                <Text style={styles.modalNombre}>#{seleccionado.id} {cap(seleccionado.name)}</Text>
                {detalle ? (
                  <>
                    <Text style={styles.modalDato}>⚖️ Peso: {detalle.weight / 10} kg</Text>
                    <Text style={styles.modalDato}>📏 Altura: {detalle.height / 10} m</Text>
                    <Text style={styles.modalDato}>
                      🏷️ Tipos: {detalle.types.map(t => cap(t.type.name)).join(', ')}
                    </Text>
                  </>
                ) : (
                  <ActivityIndicator style={{ margin: 12 }} />
                )}
              </>
            )}
            <TouchableOpacity style={styles.cerrarBtn} onPress={() => setSeleccionado(null)}>
              <Text style={styles.cerrarTxt}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#cc0000', paddingTop: 40 },
  titulo:       { fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 10 },
  card:         { flex: 1, backgroundColor: 'white', margin: 6, borderRadius: 12, alignItems: 'center', padding: 10, elevation: 3 },
  sprite:       { width: 90, height: 90 },
  cardNum:      { color: '#aaa', fontSize: 12 },
  cardNombre:   { fontWeight: '600', fontSize: 14, color: '#333' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', borderRadius: 20, padding: 24, alignItems: 'center', width: 280 },
  modalSprite:  { width: 130, height: 130 },
  modalNombre:  { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#cc0000' },
  modalDato:    { fontSize: 16, marginBottom: 6, color: '#444' },
  cerrarBtn:    { marginTop: 16, backgroundColor: '#cc0000', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 8 },
  cerrarTxt:    { color: 'white', fontWeight: 'bold', fontSize: 15 },
});
