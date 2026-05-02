import { useEffect, useState } from 'react';

// Versión simplificada de usePokemons.ts de PokeApp (sin paginación completa)
// Demuestra los 3 estados de un fetch: isLoading · data · isError

type Pokemon = {
  id:        number;
  nombre:    string;
  thumbnail: string;
};

type ListResponse = {
  count:   number;
  next:    string | null;
  results: { name: string; url: string }[];
};

type DetailResponse = {
  id:   number;
  name: string;
};

export type UsePokemonsResult = {
  pokemons:  Pokemon[];
  isLoading: boolean;
  isError:   boolean;
  error?:    string;
};

export default function usePokemonsSimple(limit = 20): UsePokemonsResult {
  const [pokemons, setPokemons]   = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError]     = useState(false);
  const [error, setError]         = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    async function fetchPokemons() {
      try {
        const res  = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const list: ListResponse = await res.json();

        const details = await Promise.all(
          list.results.map(async (entry) => {
            const dr = await fetch(entry.url);
            return dr.json() as Promise<DetailResponse>;
          })
        );

        setPokemons(
          details.map((d) => ({
            id:        d.id,
            nombre:    d.name,
            thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.id}.png`,
          }))
        );
      } catch (e) {
        setIsError(true);
        setError(String(e));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemons();
  }, [limit]);

  return { pokemons, isLoading, isError, error };
}
