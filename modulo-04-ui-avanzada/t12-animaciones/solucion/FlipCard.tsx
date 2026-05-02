import { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View, Text, Image, StyleSheet } from 'react-native';

// Basado en DetallePokemon.tsx de PokeApp — versión autocontenida

type Props = {
  nombre?:     string;
  frontImage?: string;
  backImage?:  string;
};

export default function FlipCard({
  nombre     = 'pikachu',
  frontImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  backImage  = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
}: Props) {
  const flipAnim     = useRef(new Animated.Value(0)).current;
  const isFlippedRef = useRef(false);

  const frontInterpolate = flipAnim.interpolate({
    inputRange:  [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange:  [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const handleFlip = () => {
    flipAnim.stopAnimation();
    isFlippedRef.current = !isFlippedRef.current;
    Animated.timing(flipAnim, {
      toValue:         isFlippedRef.current ? 180 : 0,
      duration:        220,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={handleFlip}>
      <View style={styles.container}>
        {/* Cara frontal */}
        <Animated.View
          style={[
            styles.card, styles.cardFront,
            { transform: [{ rotateY: frontInterpolate }] },
          ]}
        >
          <Image source={{ uri: frontImage }} style={styles.image} />
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.hint}>toca para girar →</Text>
        </Animated.View>

        {/* Cara trasera */}
        <Animated.View
          style={[
            styles.card, styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] },
          ]}
        >
          <Image source={{ uri: backImage }} style={styles.image} />
          <Text style={styles.nombre}>{nombre} (dorso)</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { width: 220, height: 300, alignSelf: 'center' },
  card: {
    width: 220,
    height: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardFront: { backgroundColor: '#FFF8E1' },
  cardBack:  { backgroundColor: '#E3F2FD', position: 'absolute', top: 0, left: 0 },
  image:  { width: 160, height: 160 },
  nombre: { fontSize: 18, fontWeight: '700', textTransform: 'capitalize', color: '#212121' },
  hint:   { fontSize: 12, color: '#9E9E9E' },
});
