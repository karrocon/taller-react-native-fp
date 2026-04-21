import { View, Text } from 'react-native';

export default function AjustesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1a73e8' }}>Ajustes</Text>
      <Text style={{ color: '#666', textAlign: 'center', paddingHorizontal: 30, marginTop: 8 }}>
        Aqui irian las preferencias de la app.
      </Text>
    </View>
  );
}
