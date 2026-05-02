import { useEffect, useState } from 'react';

// TODO 1: Define el tipo Pokemon: { id: number; nombre: string; thumbnail: string }
// TODO 2: Define los 3 estados: pokemons[], isLoading, isError
// TODO 3: Dentro de useEffect, llama a la PokéAPI con fetch:
//         GET https://pokeapi.co/api/v2/pokemon?limit=20
// TODO 4: Actualiza los estados según el resultado
// TODO 5: Añade manejo de errores (bloque catch)
// TODO 6: Asegúrate de manejar el caso loading=false al terminar (finally o en catch)
// BONUS: Añade una dependencia al useEffect para recargar al cambiar `page`

type Pokemon = {
  id: number;
  nombre: string;
  thumbnail: string;
};

type UseResult = {
  pokemons: Pokemon[];
  isLoading: boolean;
  isError: boolean;
};

export default function usePokemonsSimple(): UseResult {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // TODO: fetch aquí
  }, []);

  return { pokemons, isLoading, isError };
}
