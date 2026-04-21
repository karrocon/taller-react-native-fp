import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [contador, setContador] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Contador</Text>

      <Text style={[
        styles.numero,
        contador === 0 && styles.cero,
        contador > 5  && styles.rojo,
      ]}>
        {contador}
      </Text>

      <View style={styles.botones}>
        <TouchableOpacity style={[styles.btn, styles.btnMenos]} onPress={() => setContador(Math.max(0, contador - 1))}>
          <Text style={styles.btnTxt}>−1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnMas]} onPress={() => setContador(contador + 1)}>
          <Text style={styles.btnTxt}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={() => setContador(0)}>
          <Text style={styles.btnTxt}>Reset</Text>
        </TouchableOpacity>
      </View>

      {contador > 5 && <Text style={styles.mensaje}>🔥 ¡En llamas! ({contador})</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  titulo:    { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  numero:    { fontSize: 72, fontWeight: 'bold', color: '#1a73e8', marginBottom: 30 },
  cero:      { color: '#aaa' },
  rojo:      { color: '#f44336' },
  botones:   { flexDirection: 'row', gap: 12 },
  btn:       { width: 80, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  btnMas:    { backgroundColor: '#4caf50' },
  btnMenos:  { backgroundColor: '#f44336' },
  btnReset:  { backgroundColor: '#9e9e9e' },
  btnTxt:    { color: 'white', fontSize: 18, fontWeight: 'bold' },
  mensaje:   { marginTop: 20, fontSize: 16, color: '#ff9800' },
});

// ─── BONUS: src/hooks/useContador.ts ────────────────────────────────────────
// import { useState } from 'react';
// export function useContador(inicial: number = 0) {
//   const [n, setN] = useState<number>(inicial);
//   return { n, inc: () => setN(n + 1), dec: () => setN(Math.max(0, n - 1)), reset: () => setN(0) };
// }
