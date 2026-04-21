/**
 * EJERCICIO 1 — Contador mejorado con useState
 * ───────────────────────────────────────────────
 * Partimos del contador del Día 1 (bonus).
 *
 * NUEVO en este ejercicio:
 *   - El contador NO puede bajar de 0 (usa Math.max)
 *   - El número es ROJO si > 5, GRIS si es 0, AZUL en otro caso
 *   - Orden de botones: −1 | +1 | Reset
 *
 * TODO:
 *   1. Corrige el botón −1 para que no permita negativos:
 *        onPress={() => setContador(Math.max(0, contador - 1))}
 *   2. Ajusta el color: gris (#aaa) si 0, rojo (#f44336) si > 5
 *   3. BONUS: extrae la lógica a src/hooks/useContador.ts
 *
 * CONCEPTOS: Math.max, estilos condicionales con arrays, custom hooks
 */

import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [contador, setContador] = useState<number>(0);

  // TODO: calcula el color (cero → '#aaa', > 5 → '#f44336', default → '#1a73e8')
  const colorNumero: string = '#1a73e8';

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Contador</Text>

      <Text style={[styles.numero, { color: colorNumero }]}>{contador}</Text>

      <View style={styles.botones}>
        <TouchableOpacity
          style={[styles.btn, styles.btnMenos]}
          onPress={() => setContador(contador - 1)}  // TODO: añade Math.max(0, ...)
        >
          <Text style={styles.btnTxt}>−1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnMas]}
          onPress={() => setContador(contador + 1)}
        >
          <Text style={styles.btnTxt}>+1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnReset]}
          onPress={() => setContador(0)}
        >
          <Text style={styles.btnTxt}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* TODO: mensaje condicional si contador > 5 → "🔥 ¡En llamas!" */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  titulo:    { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  numero:    { fontSize: 72, fontWeight: 'bold', marginBottom: 30 },
  botones:   { flexDirection: 'row', gap: 12 },
  btn:       { width: 80, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  btnMas:    { backgroundColor: '#4caf50' },
  btnMenos:  { backgroundColor: '#f44336' },
  btnReset:  { backgroundColor: '#9e9e9e' },
  btnTxt:    { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
