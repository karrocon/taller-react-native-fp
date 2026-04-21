/**
 * EJERCICIO 2 — Tarjeta con estilos
 * ────────────────────────────────────
 * ENUNCIADO:
 *   Parte de la solución del ejercicio anterior.
 *   Añade estilos con StyleSheet para que la tarjeta quede centrada y con color.
 *
 * TODO:
 *   1. Importa StyleSheet de react-native
 *   2. Crea un objeto styles con StyleSheet.create({...})
 *   3. Aplica estilos: container centrado, nombre en azul y grande,
 *      edad y ciudad en gris, emoji al final
 *
 * CONCEPTOS: StyleSheet.create, flex, justifyContent, alignItems, fontSize, color
 */

import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>Juan García</Text>
      <Text style={styles.edad}>20 años</Text>
      {/* TODO: añade ciudad y favorito con sus estilos */}
    </View>
  );
}

// TODO: completa los estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    // TODO: color azul (#1a73e8)
  },
  edad: {
    fontSize: 18,
    // TODO: color gris
  },
});
