/**
 * EJERCICIO 3 — Tarjeta con imagen circular
 * ───────────────────────────────────────────
 * ENUNCIADO:
 *   Parte de la solución del ejercicio anterior (tarjeta con estilos).
 *   Añade una imagen circular en la parte superior de la tarjeta.
 *
 * TODO:
 *   1. Importa Image de react-native
 *   2. Usa <Image source={{ uri: 'https://picsum.photos/200' }} />
 *   3. Aplica borderRadius = mitad del ancho/alto para obtener un círculo
 *   4. Añade un separador horizontal y datos extra debajo del nombre
 *
 * CONCEPTOS: Image, borderRadius, uri remota, separadores con View
 */

import { Text, View, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* TODO: imagen circular */}

      <Text style={styles.nombre}>Juan García</Text>
      <Text style={styles.subtitulo}>20 años · Madrid</Text>

      {/* TODO: separador */}

      {/* TODO: datos extra (aficiones, etc.) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  nombre:    { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 6 },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 6 },
  // TODO: añade avatar, separador, dato...
});
