import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState<string>('');
  const [email,  setEmail]  = useState<string>('');
  const [error,  setError]  = useState<string>('');
  const [ok,     setOk]     = useState<boolean>(false);

  const registrar = (): void => {
    if (!nombre.trim() || !email.trim()) { setError('Rellena todos los campos.'); return; }
    if (!email.includes('@')) { setError('El email no parece válido.'); return; }
    setError('');
    setOk(true);
  };

  const resetForm = (): void => { setNombre(''); setEmail(''); setError(''); setOk(false); };

  if (ok) {
    return (
      <View style={styles.container}>
        <Text style={styles.bienvenida}>¡Bienvenido/a, {nombre}! 🎉</Text>
        <Text style={styles.subtext}>{email}</Text>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#9e9e9e', marginTop: 24 }]} onPress={resetForm}>
          <Text style={styles.btnTxt}>Nuevo registro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <TextInput style={styles.input} placeholder="Nombre completo" value={nombre}
        onChangeText={(t: string) => { setNombre(t); setError(''); }} autoCapitalize="words" />
      <TextInput style={styles.input} placeholder="tu@email.com" value={email}
        onChangeText={(t: string) => { setEmail(t); setError(''); }}
        keyboardType="email-address" autoCapitalize="none" />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.btn} onPress={registrar}>
        <Text style={styles.btnTxt}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  titulo:     { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input:      { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  error:      { color: '#f44336', marginBottom: 10, fontSize: 14 },
  btn:        { backgroundColor: '#1a73e8', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 4 },
  btnTxt:     { color: 'white', fontSize: 16, fontWeight: 'bold' },
  bienvenida: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#2e7d32' },
  subtext:    { fontSize: 15, color: '#888', textAlign: 'center', marginTop: 8 },
});
