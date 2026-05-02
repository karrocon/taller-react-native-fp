import { useState, useCallback } from 'react';
import { Modal, View, Text, Pressable, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Basado en PokedexScreen.tsx de PokeApp — versión simplificada sin dependencias externas

const POKEMONS = [
  { id: 1,  nombre: 'bulbasaur',  tipos: ['planta', 'veneno'] },
  { id: 4,  nombre: 'charmander', tipos: ['fuego'] },
  { id: 7,  nombre: 'squirtle',   tipos: ['agua'] },
  { id: 25, nombre: 'pikachu',    tipos: ['eléctrico'] },
  { id: 94, nombre: 'gengar',     tipos: ['fantasma', 'veneno'] },
  { id: 131,nombre: 'lapras',     tipos: ['agua', 'hielo'] },
];

type Pokemon = typeof POKEMONS[number];

export default function PokemonModal() {
  const [selected, setSelected]   = useState<Pokemon | null>(null);
  const handleSelect = useCallback((p: Pokemon) => setSelected(p), []);
  const handleClose  = useCallback(() => setSelected(null), []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={POKEMONS}
        keyExtractor={(p) => p.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)} activeOpacity={0.8}>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` }}
              style={styles.sprite}
            />
            <Text style={styles.nombre}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />

      {/* ── Modal ─────────────────────────────────────────────────────── */}
      <Modal
        visible={selected !== null}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        {/* Backdrop: toca para cerrar */}
        <Pressable style={styles.backdrop} onPress={handleClose}>
          {/* Contenedor interior: evita cerrar al tocar la tarjeta */}
          <Pressable style={styles.card} onPress={() => {}}>
            {selected && (
              <>
                <Image
                  source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selected.id}.png` }}
                  style={styles.artwork}
                />
                <Text style={styles.cardNombre}>{selected.nombre}</Text>
                <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {selected.tipos.map((t) => (
                    <Text key={t} style={styles.tipoBadge}>{t}</Text>
                  ))}
                </View>
                <Pressable onPress={handleClose} style={styles.closeBtn}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:    { flex: 1, backgroundColor: '#F5F5F5' },
  item:      { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3 },
  sprite:    { width: 56, height: 56 },
  nombre:    { fontSize: 16, fontWeight: '700', textTransform: 'capitalize', color: '#212121', marginLeft: 12 },
  backdrop:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  card:      { backgroundColor: '#fff', borderRadius: 24, padding: 24, alignItems: 'center', gap: 12, width: 280, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 12 },
  artwork:   { width: 180, height: 180 },
  cardNombre:{ fontSize: 22, fontWeight: '700', textTransform: 'capitalize', color: '#212121' },
  tipoBadge: { backgroundColor: '#EF5350', color: '#fff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, fontSize: 12, fontWeight: '600', textTransform: 'capitalize', overflow: 'hidden' },
  closeBtn:  { backgroundColor: '#EF5350', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8, marginTop: 8 },
});
