import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [contador, setContador] = useState<number>(0);

  const colorNumero: string =
    contador > 0 ? '#1a73e8' :
    contador < 0 ? '#d32f2f' :
    '#333';

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Contador</Text>
      <Text style={[styles.numero, { color: colorNumero }]}>{contador}</Text>

      <View style={styles.botones}>
        <TouchableOpacity style={[styles.boton, styles.botonMenos]} onPress={() => setContador(contador - 1)}>
          <Text style={styles.botonTexto}>−1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton, styles.botonReset]} onPress={() => setContador(0)}>
          <Text style={styles.botonTexto}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton, styles.botonMas]} onPress={() => setContador(contador + 1)}>
          <Text style={styles.botonTexto}>+1</Text>
        </TouchableOpacity>
      </View>

      {contador === 0  && <Text style={styles.mensaje}>Pulsa un botón para empezar</Text>}
      {contador > 10   && <Text style={styles.mensaje}>¡Llevas mucho rato pulsando! 😄</Text>}
      {contador < -5   && <Text style={styles.mensaje}>Vaya, esto va para abajo... 📉</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', padding: 24 },
  titulo:     { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 16 },
  numero:     { fontSize: 80, fontWeight: 'bold', marginBottom: 32 },
  botones:    { flexDirection: 'row', gap: 12 },
  boton:      { width: 80, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  botonMas:   { backgroundColor: '#4caf50' },
  botonMenos: { backgroundColor: '#f44336' },
  botonReset: { backgroundColor: '#9e9e9e' },
  botonTexto: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  mensaje:    { marginTop: 24, fontSize: 15, color: '#888' },
});
