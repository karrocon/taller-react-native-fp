import { View, Text, Image, StyleSheet } from 'react-native';

// TODO 1: Añade un título con <Text> que muestre el nombre de tu app (ej. "Mi Pokédex")
// TODO 2: Añade una <Image> con un sprite de un Pokémon
//         uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
// TODO 3: Aplica estilos con StyleSheet.create: container centrado, title grande, image 96x96

export default function App() {
  return (
    <View style={styles.container}>
      {/* TODO: tu contenido aquí */}
      <Text>¡Hola Expo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  // TODO: añade title, image
});
