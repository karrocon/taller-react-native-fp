import React, { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Versión simplificada de usePokemonsContext.tsx de PokeApp ──────────────────
// Demuestra: createContext + Provider + custom hook de acceso

const CACHE_KEY = 'pokemons_cache_simple';

type Pokemon = {
  id:        number;
  nombre:    string;
  thumbnail: string;
};

type ContextValue = {
  pokemons:          Pokemon[];
  isLoading:         boolean;
  loadingPercentage: number;
  isError:           boolean;
};

// ── 1. Crear el Contexto ───────────────────────────────────────────────────────
const PokemonsContext = createContext<ContextValue | null>(null);

// ── 2. Provider ────────────────────────────────────────────────────────────────
export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons]                     = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading]                   = useState(true);
  const [loadingPercentage, setLoadingPercentage]   = useState(0);
  const [isError, setIsError]                       = useState(false);
  const fetchedRef = useRef(false); // evita doble fetch en StrictMode

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    async function load() {
      try {
        // Cache rápido
        const raw = await AsyncStorage.getItem(CACHE_KEY);
        if (raw) {
          setPokemons(JSON.parse(raw));
          setLoadingPercentage(100);
          setIsLoading(false);
          return;
        }

        // Fetch paginado
        const PAGE = 50;
        let offset  = 0;
        let hasNext = true;
        const all: Pokemon[] = [];

        while (hasNext) {
          const res  = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE}&offset=${offset}`);
          const data = await res.json();

          const details = await Promise.all(
            data.results.map(async (p: { url: string }) => {
              const dr = await fetch(p.url);
              return dr.json();
            })
          );

          const page: Pokemon[] = details.map((d: any) => ({
            id:        d.id,
            nombre:    d.name,
            thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
          }));

          all.push(...page);
          setPokemons([...all]);
          setLoadingPercentage(((offset + page.length) / data.count) * 100);
          hasNext = data.next !== null;
          offset += PAGE;
        }

        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(all));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return (
    <PokemonsContext.Provider value={{ pokemons, isLoading, loadingPercentage, isError }}>
      {children}
    </PokemonsContext.Provider>
  );
}

// ── 3. Hook de acceso ──────────────────────────────────────────────────────────
export function usePokemonsContext(): ContextValue {
  const ctx = useContext(PokemonsContext);
  if (!ctx) throw new Error('usePokemonsContext debe usarse dentro de <PokemonProvider>');
  return ctx;
}
