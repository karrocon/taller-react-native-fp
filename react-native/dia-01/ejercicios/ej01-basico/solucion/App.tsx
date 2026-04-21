import { Text, View } from 'react-native';

export default function App() {
  const nombre: string = 'Juan García';
  const edad: number   = 20;
  const ciudad: string = 'Madrid';
  const emoji: string  = '🎮';

  return (
    <View style={{ padding: 20 }}>
      <Text>Nombre: {nombre}</Text>
      <Text>Edad: {edad}</Text>
      <Text>Ciudad: {ciudad}</Text>
      <Text>Favorito: {emoji}</Text>
    </View>
  );
}
