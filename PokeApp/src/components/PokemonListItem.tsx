import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pokemon } from "../types/pokemon";
import { tipoColor } from "../constants/tipoColor";
import { useNavigation } from "@react-navigation/native";
import { PokedexScreenProps } from "../types/navigation";
import { DETALLE } from "../constants/navigation";
import { useCallback } from "react";
import { PokemonTypeBadgeList } from "./PokemonTypeBadgeList";
import { useTheme } from "../hooks/useTheme";
import { makeStyles, shadows } from "../utils/styles";
import { spacing } from "../constants/spacing";

export type PokemonListItemProps = {
    pokemon: Pokemon;
    onSelect?: (pokemon: Pokemon) => void;
}

export default function PokemonListItem({ pokemon, onSelect }: PokemonListItemProps) {
    const { nombre, thumbnail, tipos, indice } = pokemon;
    const primaryColor = tipoColor[tipos[0]];
    const navigation = useNavigation<PokedexScreenProps['navigation']>();
    const navigateToDetails = useCallback(
        () => navigation.navigate(DETALLE, { pokemon }),
        [navigation, pokemon]);
    const handlePress = useCallback(
        () => onSelect ? onSelect(pokemon) : navigateToDetails(),
        [onSelect, pokemon, navigateToDetails]);
    const { theme } = useTheme();
    const s = makeStyles(theme);

    return (
        <TouchableOpacity style={s.listCard} onPress={handlePress} activeOpacity={0.8}>
            <View style={[styles.colorStripe, { backgroundColor: primaryColor }]} />
            <Image source={{ uri: thumbnail }} style={styles.image} />
            <View style={styles.info}>
                <Text style={s.listCardIndex}>#{String(indice).padStart(3, '0')}</Text>
                <Text style={s.listCardName}>{nombre}</Text>
                <PokemonTypeBadgeList tipos={tipos} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    colorStripe: {
        width: 6,
        alignSelf: 'stretch',
    },
    image: {
        width: 72,
        height: 72,
        margin: spacing.sm,
    },
    info: {
        flex: 1,
        paddingVertical: spacing.sm + 2,
        paddingRight: spacing.md,
    },
});
