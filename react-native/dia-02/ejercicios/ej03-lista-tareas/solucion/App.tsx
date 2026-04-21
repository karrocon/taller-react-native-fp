import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

type Tarea = { id: number; texto: string; completada: boolean };

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, texto: 'Estudiar React Native', completada: false },
    { id: 2, texto: 'Hacer ejercicios del día', completada: false },
  ]);
  const [input, setInput] = useState<string>('');

  const handleAnadir = (): void => {
    const texto = input.trim();
    if (!texto) { Alert.alert('Campo vacío', 'Escribe una tarea antes de añadir.'); return; }
    setTareas([...tareas, { id: Date.now(), texto, completada: false }]);
    setInput('');
  };

  const toggleTarea = (id: number): void => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const eliminarTarea = (id: number): void => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const pendientes: number = tareas.filter(t => !t.completada).length;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📝 Mis Tareas</Text>
      <Text style={styles.subtitulo}>{pendientes} pendiente(s) de {tareas.length}</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Nueva tarea..." value={input}
          onChangeText={setInput} onSubmitEditing={handleAnadir} returnKeyType="done" />
        <TouchableOpacity style={styles.btnAnadir} onPress={handleAnadir}>
          <Text style={styles.btnAnadirTxt}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {tareas.length === 0 && <Text style={styles.vacia}>¡No hay tareas! Añade una arriba 👆</Text>}
        {tareas.map((tarea: Tarea) => (
          <View key={String(tarea.id)} style={styles.tareaRow}>
            <TouchableOpacity style={styles.tareaCheck} onPress={() => toggleTarea(tarea.id)}>
              <Text style={styles.checkIcon}>{tarea.completada ? '✅' : '⬜'}</Text>
            </TouchableOpacity>
            <Text style={[styles.tareaTexto, tarea.completada && styles.tachada]}>{tarea.texto}</Text>
            <TouchableOpacity onPress={() => eliminarTarea(tarea.id)}>
              <Text style={styles.eliminar}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo:       { fontSize: 26, fontWeight: 'bold', marginTop: 40, color: '#1a73e8' },
  subtitulo:    { fontSize: 13, color: '#888', marginBottom: 16 },
  inputRow:     { flexDirection: 'row', marginBottom: 16, gap: 8 },
  input:        { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 15 },
  btnAnadir:    { backgroundColor: '#1a73e8', width: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnAnadirTxt: { color: 'white', fontSize: 28, lineHeight: 32 },
  tareaRow:     { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  tareaCheck:   { marginRight: 10 },
  checkIcon:    { fontSize: 22 },
  tareaTexto:   { flex: 1, fontSize: 16, color: '#333' },
  tachada:      { textDecorationLine: 'line-through', color: '#aaa' },
  eliminar:     { fontSize: 18, marginLeft: 8 },
  vacia:        { textAlign: 'center', color: '#aaa', marginTop: 40, fontSize: 15 },
});
