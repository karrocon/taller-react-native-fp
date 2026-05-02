import { View, Text, Image, StyleSheet } from 'react-native';

// TODO 1: Crea un componente PokemonCard que reciba estas props:
//   - nombre: string
//   - thumbnail: string (URL)
//   - tipo: string  (ej. "fuego")
// TODO 2: Muestra la imagen (thumbnail) con width=80, height=80
// TODO 3: Muestra el nombre en Text bold
// TODO 4: Muestra el tipo en un rectángulo coloreado (elige el color que quieras)
// TODO 5: Envuelve todo en un View con sombra (shadowColor, elevation)

type PokemonCardProps = {
  nombre: string;
  thumbnail: string;
  tipo: string;
};

export default function PokemonCard({ nombre, thumbnail, tipo }: PokemonCardProps) {
  return (
    <View style={styles.card}>
      {/* TODO: imagen */}
      {/* TODO: nombre */}
      {/* TODO: tipo badge */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    // TODO: añade sombra
  },
});
