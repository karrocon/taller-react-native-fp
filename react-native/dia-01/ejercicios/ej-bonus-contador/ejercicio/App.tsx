/**
 * EJERCICIO BONUS — Contador interactivo con useState
 * ──────────────────────────────────────────────────────
 * ENUNCIADO:
 *   Parte de la tarjeta con estilos del ejercicio anterior.
 *   Conviértela en un contador interactivo usando useState.
 *
 * TODO:
 *   1. Importa useState de 'react'
 *   2. Declara: const [contador, setContador] = useState<number>(0)
 *   3. Añade tres TouchableOpacity: +1, -1 y Reset
 *   4. Muestra el número en grande en el centro
 *   5. Cambia el color del número según su valor:
 *        - positivo → azul (#1a73e8)
 *        - negativo → rojo (#d32f2f)
 *        - cero     → gris (#333)
 *
 * CONCEPTOS: useState<T>, onPress, estilos condicionales, TouchableOpacity
 */

import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  // TODO: declara el estado del contador
  // const [contador, setContador] = useState<number>(0);

  // TODO: calcula el color según el valor
  // const colorNumero: string = ...

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Contador</Text>

      {/* TODO: muestra el contador con color condicional */}
      <Text style={styles.numero}>0</Text>

      <View style={styles.botones}>
        {/* TODO: botón −1 */}
        {/* TODO: botón Reset */}
        {/* TODO: botón +1 */}
      </View>

      {/* TODO: mensaje condicional (ej: > 10 → "¡Llevas mucho rato!") */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', padding: 24 },
  titulo:    { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 16 },
  numero:    { fontSize: 80, fontWeight: 'bold', marginBottom: 32 },
  botones:   { flexDirection: 'row', gap: 12 },
});
