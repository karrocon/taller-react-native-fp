/**
 * EJERCICIO 1 — Tarjeta de presentación
 * ───────────────────────────────────────
 * ENUNCIADO:
 *   Muestra una tarjeta con: nombre, edad, ciudad y emoji favorito.
 *
 * TODO:
 *   1. Declara las variables con los tipos correctos:
 *        const nombre: string = 'Tu nombre';
 *        const edad:   number = 20;
 *   2. Renderízalas dentro de <View> usando <Text>
 *   3. Personaliza los valores con los tuyos
 *
 * CONCEPTOS: Text, View, tipos primitivos en TypeScript (string, number)
 */

import { Text, View } from 'react-native';

export default function App() {
  // TODO: declara las variables con tipos explícitos
  const nombre: string = '';
  const edad: number   = 0;
  const ciudad: string = '';
  const emoji: string  = '';

  return (
    <View style={{ padding: 20 }}>
      {/* TODO: muestra nombre, edad, ciudad y emoji */}
    </View>
  );
}
