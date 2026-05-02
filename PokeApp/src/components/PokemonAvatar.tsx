import { Image, View } from "react-native";
import { Pokemon } from "../types/pokemon";

export type PokemonAvatarProps = {
    pokemon: Pokemon;
    facing: 'front' | 'back';
    width?: number;
    height?: number;
    showShadow?: boolean;
}

export default function PokemonAvatar({ pokemon, facing, width = 150, height = 150, showShadow = false }: PokemonAvatarProps) {
    const frontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
    const backImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.id}.gif`;
    return (
        <View style={{ width, height, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Image
                source={{ uri: facing === 'front' ? frontImage : backImage }}
                style={{ width, height, position: 'absolute', top: 0, left: 0 }}
                resizeMode="contain"
            />
            {showShadow && (
                <View style={{
                    width: width * 0.5,
                    height: height * 0.25,
                    borderRadius: 999,
                    backgroundColor: 'rgba(0,0,0,0.28)',
                    marginBottom: -(height * 0.08),
                    marginRight: -(width * 0.03),
                    opacity: 0.5,
                }} />
            )}
        </View>
    );
}