import { useRef } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { Pokemon } from "../types/pokemon";
import PokemonCardFront from "./PokemonCardFront";
import PokemonCardBack from "./PokemonCardBack";

export type DetallePokemonProps = {
    pokemon: Pokemon;
};

export default function DetallePokemon({ pokemon }: DetallePokemonProps) {
    const flipAnim = useRef(new Animated.Value(0)).current;
    // Use a ref instead of state so toggling is instant with no re-render
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
        // Stop any in-progress animation so rapid taps are never blocked
        flipAnim.stopAnimation();
        isFlippedRef.current = !isFlippedRef.current;
        const toValue = isFlippedRef.current ? 180 : 0;
        Animated.timing(flipAnim, {
            toValue,
            duration: 220,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback onPress={handleFlip}>
            <Animated.View style={{ position: 'relative' }}>
                <Animated.View style={{ transform: [{ rotateY: frontInterpolate }], backfaceVisibility: 'hidden' }}>
                    <PokemonCardFront pokemon={pokemon} />
                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        transform: [{ rotateY: backInterpolate }],
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <PokemonCardBack pokemon={pokemon} />
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

