import { View, Text, Image, StyleSheet } from 'react-native';

// SplashScreen simplificada como referencia de View+Text+Image+StyleSheet
export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>Mi Pokédex</Text>
      <Text style={styles.subtitle}>Explora los 151 Pokémon originales</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5350',
    gap: 16,
  },
  image: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
});
