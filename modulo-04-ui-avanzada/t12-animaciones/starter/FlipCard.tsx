import { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

// TODO 1: Crea un useRef<Animated.Value> iniciado en 0 (0 = frente, 180 = dorso)
// TODO 2: Implementa handleFlip: cambia el valor entre 0 y 180 con Animated.timing
//         { duration: 300, useNativeDriver: true }
// TODO 3: Crea frontInterpolate y backInterpolate con flipAnim.interpolate
//         inputRange [0, 180], outputRange ['0deg','180deg'] y ['180deg','360deg']
// TODO 4: Aplica backfaceVisibility: 'hidden' en los Animated.View
// TODO 5: Posiciona la cara trasera con position:'absolute', top:0, left:0

export default function FlipCard() {
  // TODO: const flipAnim = useRef(new Animated.Value(0)).current;

  const handleFlip = () => {
    // TODO: anima el giro
  };

  return (
    <TouchableWithoutFeedback onPress={handleFlip}>
      <View style={styles.container}>
        {/* TODO: Animated.View para la cara frontal */}
        <View style={styles.card}>
          <Text style={styles.label}>Frente</Text>
        </View>

        {/* TODO: Animated.View para la cara trasera (position absolute) */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { width: 200, height: 280 },
  card: {
    width: 200,
    height: 280,
    borderRadius: 16,
    backgroundColor: '#EF5350',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 22, fontWeight: '700', color: '#fff' },
});
