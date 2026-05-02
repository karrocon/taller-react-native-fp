// Fragmento de fetching de PokéAPI — inspirado en usePokemons.ts y mapToPokemon.ts de PokeApp

type PokemonListResponse = {
  count: number;
  next:  string | null;
  results: { name: string; url: string }[];
};

type PokemonDetailsResponse = {
  id:     number;
  name:   string;
  order:  number;
  weight: number;
  height: number;
  types:  { type: { name: string } }[];
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string } };
  };
};

export type Pokemon = {
  id:        number;
  nombre:    string;
  thumbnail: string;
  imagen:    string;
  tipos:     string[];
};

// ── Single Pokémon ─────────────────────────────────────────────────────────────
export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} al obtener pokemon ${id}`);
  const data: PokemonDetailsResponse = await res.json();
  return mapToPokemon(data);
}

// ── Page of Pokémon ────────────────────────────────────────────────────────────
export async function fetchPokemons(limit = 20, offset = 0): Promise<Pokemon[]> {
  try {
    // 1. Get the list
    const listRes  = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!listRes.ok) throw new Error(`HTTP ${listRes.status}`);
    const list: PokemonListResponse = await listRes.json();

    // 2. Fetch details for each entry in parallel
    const details = await Promise.all(
      list.results.map(async (entry) => {
        const detailRes = await fetch(entry.url);
        if (!detailRes.ok) throw new Error(`HTTP ${detailRes.status} para ${entry.name}`);
        return detailRes.json() as Promise<PokemonDetailsResponse>;
      })
    );

    return details.map(mapToPokemon);
  } catch (error) {
    throw new Error(`Error al obtener pokémons: ${error}`);
  }
}

// ── Mapper ─────────────────────────────────────────────────────────────────────
function mapToPokemon(data: PokemonDetailsResponse): Pokemon {
  return {
    id:        data.id,
    nombre:    data.name,
    thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
    imagen:    data.sprites.other['official-artwork'].front_default,
    tipos:     data.types.map((t) => t.type.name),
  };
}
