import { useState } from 'react';
import { View, Text, Switch, Pressable, StyleSheet, ScrollView } from 'react-native';

// Basado en SettingsScreen de PokeApp — versión simplificada sin dependencias externas

type ThemeMode = 'light' | 'dark' | 'system';

export default function SettingsSliders() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [volumenMusica, setVolumenMusica] = useState(70);
  const [volumenFx, setVolumenFx] = useState(80);
  const [modo, setModo] = useState<ThemeMode>('system');

  const bg = modoOscuro ? '#121212' : '#F5F5F5';
  const card = modoOscuro ? '#1E1E1E' : '#fff';
  const textPrimary = modoOscuro ? '#EFEFEF' : '#212121';
  const textSecondary = modoOscuro ? '#9E9E9E' : '#757575';

  return (
    <ScrollView style={[styles.screen, { backgroundColor: bg }]}>

      <Text style={[styles.sectionHeader, { color: textSecondary }]}>Pantalla</Text>
      <View style={[styles.card, { backgroundColor: card }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: textPrimary }]}>Modo oscuro</Text>
          <Switch
            value={modoOscuro}
            onValueChange={setModoOscuro}
            trackColor={{ true: '#EF5350' }}
          />
        </View>

        <View style={[styles.row, { borderTopWidth: 1, borderTopColor: modoOscuro ? '#333' : '#EEE' }]}>
          <Text style={[styles.label, { color: textPrimary }]}>Tema</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {(['system', 'light', 'dark'] as ThemeMode[]).map((m) => (
              <Pressable
                key={m}
                onPress={() => setModo(m)}
                style={[styles.modeBtn, modo === m && styles.modeBtnActive]}
              >
                <Text style={[styles.modeBtnText, modo === m && { color: '#fff' }]}>
                  {{ system: 'Auto', light: 'Claro', dark: 'Oscuro' }[m]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <Text style={[styles.sectionHeader, { color: textSecondary }]}>Sonido</Text>
      <View style={[styles.card, { backgroundColor: card }]}>
        <VolumeRow
          label="Música"
          valor={volumenMusica}
          onChange={setVolumenMusica}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
        />
        <View style={{ borderTopWidth: 1, borderTopColor: modoOscuro ? '#333' : '#EEE' }} />
        <VolumeRow
          label="Efectos"
          valor={volumenFx}
          onChange={setVolumenFx}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
        />
      </View>

    </ScrollView>
  );
}

type VolumeRowProps = {
  label: string;
  valor: number;
  onChange: (v: number) => void;
  textPrimary: string;
  textSecondary: string;
};

function VolumeRow({ label, valor, onChange, textPrimary, textSecondary }: VolumeRowProps) {
  const dec = () => onChange(Math.max(0, valor - 10));
  const inc = () => onChange(Math.min(100, valor + 10));

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: textPrimary }]}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Pressable onPress={dec} style={styles.volBtn}><Text style={styles.volBtnText}>−</Text></Pressable>
        <Text style={{ color: textSecondary, fontWeight: '700', minWidth: 36, textAlign: 'center' }}>
          {valor}%
        </Text>
        <Pressable onPress={inc} style={styles.volBtn}><Text style={styles.volBtnText}>+</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  sectionHeader: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 20, marginBottom: 8, marginLeft: 4 },
  card: { borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  label: { fontSize: 16, fontWeight: '600' },
  modeBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' },
  modeBtnActive: { backgroundColor: '#EF5350', borderColor: '#EF5350' },
  modeBtnText: { fontSize: 13, fontWeight: '600', color: '#555' },
  volBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EF5350', alignItems: 'center', justifyContent: 'center' },
  volBtnText: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 22 },
});
