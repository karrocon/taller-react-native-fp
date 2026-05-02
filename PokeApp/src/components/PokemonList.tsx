import { FlatList, StyleSheet } from "react-native";
import PokemonListItem from "./PokemonListItem";
import { spacing } from "../constants/spacing";
import { Pokemon } from "../types/pokemon";

type Props = {
    data: Pokemon[];
    onSelect?: (pokemon: Pokemon) => void;
};

export default function PokemonList({ data, onSelect }: Props) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <PokemonListItem pokemon={item} onSelect={onSelect} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: spacing.sm,
    },
});
