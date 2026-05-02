// Módulo 3 – T08: Fetch y async/await
// TODO 1: Define el tipo Pokemon mínimo: { id, nombre, thumbnail }
// TODO 2: Implementa fetchPokemons(limit, offset) que llame a PokéAPI:
//         GET https://pokeapi.co/api/v2/pokemon?limit=X&offset=Y
// TODO 3: Para cada resultado, haz un fetch a su `url` para obtener los detalles
// TODO 4: Devuelve un array de Pokemon usando los datos de detalles
// TODO 5: Maneja errores con try/catch y lanza un Error descriptivo
// BONUS: Implementa fetchPokemon(id) para obtener un Pokémon por id

type Pokemon = {
  id: number;
  nombre: string;
  thumbnail: string;
};

// TODO: implementa esta función
export async function fetchPokemons(limit = 20, offset = 0): Promise<Pokemon[]> {
  // 1. fetch a la lista
  // 2. por cada resultado, fetch a la URL de detalle
  // 3. construye y devuelve el array
  throw new Error('TODO: implementar fetchPokemons');
}

// TODO (bonus): implementa esta función
export async function fetchPokemon(id: number): Promise<Pokemon> {
  throw new Error('TODO: implementar fetchPokemon');
}
