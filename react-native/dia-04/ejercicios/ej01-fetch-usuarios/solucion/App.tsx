import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
  TouchableOpacity, StyleSheet, RefreshControl,
} from 'react-native';

// En un proyecto real → src/types/usuario.ts
type Usuario = {
  id: number;
  name: string;
  email: string;
  address: { city: string };
};

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const [datos,      setDatos]      = useState<Usuario[]>([]);
  const [cargando,   setCargando]   = useState<boolean>(true);
  const [error,      setError]      = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos(esRefresh: boolean = false): Promise<void> {
    try {
      if (esRefresh) setRefreshing(true);
      else setCargando(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const json: Usuario[] = await res.json();
      setDatos(json);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCargando(false);
      setRefreshing(false);
    }
  }

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.cargandoTxt}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTxt}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => cargarDatos()}>
          <Text style={styles.btnTxt}>🔄 Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👥 Usuarios ({datos.length})</Text>
      <FlatList
        data={datos}
        keyExtractor={(item: Usuario) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => cargarDatos(true)} />
        }
        renderItem={({ item }: { item: Usuario }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>{item.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nombre}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.ciudad}>📍 {item.address.city}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  centrado:    { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  titulo:      { fontSize: 22, fontWeight: 'bold', marginTop: 40, marginBottom: 12, color: '#1a73e8' },
  cargandoTxt: { color: '#666', fontSize: 15 },
  errorIcon:   { fontSize: 48 },
  errorTxt:    { color: '#c62828', fontSize: 16, textAlign: 'center', paddingHorizontal: 30 },
  btn:         { backgroundColor: '#1a73e8', padding: 12, borderRadius: 8, marginTop: 8 },
  btnTxt:      { color: 'white', fontSize: 16, fontWeight: '600' },
  card:        { flexDirection: 'row', backgroundColor: 'white', padding: 12, borderRadius: 10, alignItems: 'center', elevation: 1 },
  avatar:      { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1a73e8', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarTxt:   { color: 'white', fontWeight: 'bold', fontSize: 18 },
  nombre:      { fontWeight: '600', fontSize: 15, color: '#333' },
  email:       { color: '#888', fontSize: 13 },
  ciudad:      { color: '#888', fontSize: 12, marginTop: 2 },
});
