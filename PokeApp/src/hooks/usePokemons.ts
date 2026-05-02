import { useEffect, useState } from "react";
import { mapToPokemons } from "../utils/mapToPokemon";
import { Pokemon } from "../types/pokemon";
import { GetPokemonsResponse } from "../types/pokeApi/getPokemonsResponse";
import { GetPokemonResponse } from "../types/pokeApi/getPokemonResponse";
import { GetPokemonSpeciesResponse } from "../types/pokeApi/getPokemonSpeciesResponse";

export type UsePokemonsProps = {
    page: number;
    pageSize: number;
    fetchAllPages: boolean;
}

export const DEFAULT_USE_POKEMONS_PROPS: UsePokemonsProps = {
    page: 1,
    pageSize: 50,
    fetchAllPages: true
}

export type UsePokemonResult = {
    pokemons: Pokemon[];
    isLoading: boolean;
    loadingPercentage: number;
    isError: boolean;
    error?: string;
}

export default function usePokemons({ page, pageSize, fetchAllPages }: UsePokemonsProps = DEFAULT_USE_POKEMONS_PROPS): UsePokemonResult {
    const limit = pageSize;
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    
    const fetchPokemonPage = async (limit: number, offset: number) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data: GetPokemonsResponse = await response.json();

        const enrichedData = await Promise.all(
            data.results.map(async (pokemon) => {
                const detailsResponse = await fetch(pokemon.url);
                const detailsData: GetPokemonResponse = await detailsResponse.json();
                
                const speciesResponse = await fetch(detailsData.species.url);
                const speciesData: GetPokemonSpeciesResponse = await speciesResponse.json();
                
                return { details: detailsData, species: speciesData };
            })
        );

        const details = enrichedData.map((item) => item.details);
        const species = enrichedData.map((item) => item.species);
        
        return { pokemons: mapToPokemons(details, species), hasNextPage: data.next !== null, total: data.count };
    }

    const fetchPokemons = async () => {
        try {
            let hasNextPage = true;
            let offset = (page - 1) * pageSize;

            if (fetchAllPages) {
                while (hasNextPage) {
                    const {pokemons: pokemonsInPage, hasNextPage: updatedHasNextPage, total} = await fetchPokemonPage(limit, offset);
                    setPokemons((prev) => [...prev, ...pokemonsInPage]);
                    setLoadingPercentage(((offset + pokemons.length + pokemonsInPage.length) / total) * 100);
                    hasNextPage = updatedHasNextPage;
                    offset += pageSize;
                }
            } else {
                const { pokemons: pokemonsInPage } = await fetchPokemonPage(limit, offset);
                setPokemons(pokemonsInPage);
                setLoadingPercentage(100);
            }

            setIsError(false);
            setError(undefined);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setError(JSON.stringify(error));
            setIsLoading(false);
            setLoadingPercentage(0);
            throw new Error(`Error fetching pokemons: ${error}`);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setLoadingPercentage(0);
        fetchPokemons();
    }, [page, pageSize]);

    return {
        pokemons,
        isLoading,
        loadingPercentage,
        isError,
        error
    };
}