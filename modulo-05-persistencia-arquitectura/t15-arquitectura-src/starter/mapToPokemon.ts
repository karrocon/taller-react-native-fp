// TODO 1: Define el tipo TipoPokemon como unión de strings en español
//         'normal' | 'fuego' | 'agua' | ...
// TODO 2: Define el tipo PokemonStats con: hp, ataque, defensa, ataqueEspecial, defensaEspecial, velocidad
// TODO 3: Define el tipo Pokemon con todos sus campos: id, nombre, peso, altura, tipos, thumbnail, imagen, stats, descripcion?
// TODO 4: Implementa mapToPokemon(response, species) que construya un Pokemon
//         a partir de la respuesta de PokéAPI
// TODO 5: Implementa mapToPokemons(responses[], species[]) que llame a mapToPokemon en cada par

// Tipo de respuesta simplificada de PokéAPI (solo los campos que usamos)
type PokemonApiResponse = {
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

type SpeciesApiResponse = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
};

// TODO: define TipoPokemon
export type TipoPokemon = string; // reemplaza con la unión correcta

// TODO: define PokemonStats
export type PokemonStats = {
  hp: number;
  // TODO: añade el resto
};

// TODO: define Pokemon
export type Pokemon = {
  id: number;
  nombre: string;
  // TODO: añade el resto
};

// TODO: implementa mapToPokemon
export function mapToPokemon(response: PokemonApiResponse, species: SpeciesApiResponse): Pokemon {
  throw new Error('TODO: implementar mapToPokemon');
}

// TODO: implementa mapToPokemons
export function mapToPokemons(responses: PokemonApiResponse[], speciesArr: SpeciesApiResponse[]): Pokemon[] {
  throw new Error('TODO: implementar mapToPokemons');
}
