import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type PokemonCardProps = {
  nombre: string;
  thumbnail: string;
  tipo: string;
  onPress?: () => void;
};

const TIPO_COLOR: Record<string, string> = {
  fuego: '#FF6B35',
  agua: '#4FC3F7',
  planta: '#66BB6A',
  eléctrico: '#FFCA28',
  hielo: '#80DEEA',
  lucha: '#EF5350',
  veneno: '#AB47BC',
  tierra: '#BCAAA4',
  volador: '#90CAF9',
  psíquico: '#F48FB1',
  bicho: '#D4E157',
  roca: '#8D6E63',
  fantasma: '#7E57C2',
  dragón: '#5C6BC0',
  siniestro: '#546E7A',
  acero: '#B0BEC5',
  hada: '#F8BBD9',
  normal: '#BDBDBD',
};

export default function PokemonCard({ nombre, thumbnail, tipo, onPress }: PokemonCardProps) {
  const badgeColor = TIPO_COLOR[tipo] ?? '#BDBDBD';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <Text style={styles.nombre}>{nombre}</Text>
      <View style={[styles.tipoBadge, { backgroundColor: badgeColor }]}>
        <Text style={styles.tipoText}>{tipo}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'capitalize',
    color: '#212121',
  },
  tipoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tipoText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
