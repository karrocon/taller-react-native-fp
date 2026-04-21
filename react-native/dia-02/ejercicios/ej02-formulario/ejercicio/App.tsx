/**
 * EJERCICIO 2 — Formulario de registro
 * ──────────────────────────────────────
 * ENUNCIADO:
 *   Crea un formulario con dos campos: Nombre y Email.
 *   Al pulsar «Registrar»:
 *     - Si algún campo está vacío → muestra un mensaje de error en rojo
 *     - Si todo está bien          → muestra «¡Bienvenido/a, {nombre}!»
 *
 * TODO:
 *   1. Declara los 4 estados con sus tipos:
 *        const [nombre, setNombre] = useState<string>('')
 *        const [email,  setEmail]  = useState<string>('')
 *        const [error,  setError]  = useState<string>('')
 *        const [ok,     setOk]     = useState<boolean>(false)
 *   2. En registrar(): valida campos vacíos → setError(...)
 *   3. BONUS: valida que el email contenga '@'
 *   4. Si ok === true → muestra pantalla de bienvenida
 *
 * CONCEPTOS: TextInput, múltiples estados, renderizado condicional, trim()
 */

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  // TODO: declara los 4 estados
  // const [nombre, setNombre] = useState<string>('')
  // const [email,  setEmail]  = useState<string>('')
  // const [error,  setError]  = useState<string>('')
  // const [ok,     setOk]     = useState<boolean>(false)

  const registrar = (): void => {
    // TODO: validación de campos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>

      {/* TODO: TextInput para nombre */}
      {/* TODO: TextInput para email (keyboardType="email-address", autoCapitalize="none") */}

      {/* TODO: si hay error, muéstralo */}

      <TouchableOpacity style={styles.btn} onPress={registrar}>
        <Text style={styles.btnTxt}>Registrar</Text>
      </TouchableOpacity>

      {/* TODO: si ok === true → pantalla de bienvenida */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  titulo:    { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input:     { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  error:     { color: '#f44336', marginBottom: 10, fontSize: 14 },
  btn:       { backgroundColor: '#1a73e8', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 4 },
  btnTxt:    { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
