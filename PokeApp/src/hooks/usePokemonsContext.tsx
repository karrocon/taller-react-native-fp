import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Pokemon } from '../types/pokemon';
import { saveJSON, loadJSON } from '../utils/storage';
import { mapToPokemons } from '../utils/mapToPokemon';
import type { GetPokemonsResponse } from '../types/pokeApi/getPokemonsResponse';
import type { GetPokemonResponse } from '../types/pokeApi/getPokemonResponse';
import type { GetPokemonSpeciesResponse } from '../types/pokeApi/getPokemonSpeciesResponse';

const CACHE_KEY = 'pokemons_cache';
const PAGE_SIZE = 50;

type PokemonsContextValue = {
    pokemons: Pokemon[];
    isLoading: boolean;
    loadingPercentage: number;
    isError: boolean;
    error?: string;
};

const PokemonsContext = createContext<PokemonsContextValue | null>(null);

export function PokemonProvider({ children }: { children: ReactNode }) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingPercentage, setLoadingPercentage] = useState(0);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    // Guard against running twice in React strict-mode / hot-reload
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        async function load() {
            try {
                // 1. Fast path: load from AsyncStorage cache
                const cached = await loadJSON<Pokemon[]>(CACHE_KEY);
                if (cached && cached.length > 0) {
                    setPokemons(cached);
                    setLoadingPercentage(100);
                    setIsLoading(false);
                    return;
                }

                // 2. Cache miss: fetch all pages from the API
                let hasNextPage = true;
                let offset = 0;
                const all: Pokemon[] = [];

                while (hasNextPage) {
                    const res = await fetch(
                        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
                    );
                    const data: GetPokemonsResponse = await res.json();

                    const enriched = await Promise.all(
                        data.results.map(async (p) => {
                            const dr = await fetch(p.url);
                            const details: GetPokemonResponse = await dr.json();
                            const sr = await fetch(details.species.url);
                            const species: GetPokemonSpeciesResponse = await sr.json();
                            return { details, species };
                        })
                    );

                    const page = mapToPokemons(
                        enriched.map((e) => e.details),
                        enriched.map((e) => e.species),
                    );
                    all.push(...page);
                    setPokemons([...all]);
                    setLoadingPercentage(((offset + page.length) / data.count) * 100);
                    hasNextPage = data.next !== null;
                    offset += PAGE_SIZE;
                }

                // 3. Persist to AsyncStorage for next launch
                await saveJSON(CACHE_KEY, all);
                setIsLoading(false);
            } catch (e) {
                setIsError(true);
                setError(JSON.stringify(e));
                setIsLoading(false);
            }
        }

        load();
    }, []);

    return (
        <PokemonsContext.Provider value={{ pokemons, isLoading, loadingPercentage, isError, error }}>
            {children}
        </PokemonsContext.Provider>
    );
}

export function usePokemonsContext(): PokemonsContextValue {
    const ctx = useContext(PokemonsContext);
    if (!ctx) throw new Error('usePokemonsContext must be used inside <PokemonProvider>');
    return ctx;
}
