/**
 * EJERCICIO 3 — Lista de tareas (To-Do)
 * ───────────────────────────────────────
 * ENUNCIADO:
 *   Crea una app de lista de tareas donde el usuario pueda:
 *     1. Escribir una tarea en un TextInput
 *     2. Pulsar "Añadir" para agregarla a la lista
 *     3. Ver todas las tareas usando .map()
 *     4. Bonus: marcar una tarea como completada (tachado)
 *
 * TODO:
 *   1. Define el tipo Tarea (ya está, no lo muevas)
 *   2. Declara los estados: tareas (Tarea[]) e input (string)
 *   3. Implementa handleAnadir: añade al array y limpia el input
 *   4. Renderiza la lista con .map() dentro del ScrollView
 *   5. BONUS: toggleTarea(id) para marcar/desmarcar completadas
 *
 * CONCEPTOS: tipos en TS, arrays en estado, spread operator, .map()
 */

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Tipo para una tarea (en un proyecto real → src/types/tarea.ts)
type Tarea = { id: number; texto: string; completada: boolean };

export default function App() {
  // TODO: const [tareas, setTareas] = useState<Tarea[]>([]);
  // TODO: const [input,  setInput]  = useState<string>('');

  const handleAnadir = (): void => {
    // TODO: añadir tarea al array y limpiar input
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📝 Mis Tareas</Text>

      <View style={styles.inputRow}>
        {/* TODO: TextInput ligado a input */}
        {/* TODO: botón "+" que llame a handleAnadir */}
      </View>

      <ScrollView>
        {/* TODO: tareas.map(tarea => ...) */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo:    { fontSize: 26, fontWeight: 'bold', marginBottom: 16, marginTop: 40 },
  inputRow:  { flexDirection: 'row', marginBottom: 16, gap: 8 },
  input:     { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 15 },
  btnAnadir: { backgroundColor: '#1a73e8', width: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnAnadirTxt: { color: 'white', fontSize: 28, lineHeight: 32 },
});
