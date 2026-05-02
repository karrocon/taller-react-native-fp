// Copia directa de PokeApp/src/utils/mapToPokemon.ts
import type { Pokemon, TipoPokemon, PokemonStats } from './types/pokemon';

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
    version: { name: string };
  }[];
};

export function mapToPokemons(
  pokemonResponses: PokemonApiResponse[],
  pokemonSpeciesResponses: SpeciesApiResponse[],
): Pokemon[] {
  return pokemonResponses.map((r, i) => mapToPokemon(r, pokemonSpeciesResponses[i]));
}

export function mapToPokemon(
  r: PokemonApiResponse,
  species: SpeciesApiResponse,
): Pokemon {
  return {
    id:          r.id,
    nombre:      r.name,
    peso:        r.weight,
    altura:      r.height,
    tipos:       r.types.map(mapToTipo),
    indice:      r.order,
    thumbnail:   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${r.id}.png`,
    imagen:      `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/imagesHQ/${String(r.id).padStart(4, '0')}.png`,
    stats:       mapToStats(r.stats),
    descripcion: mapToDescripcion(species),
    frontImage:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${r.id}.png`,
    backImage:   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${r.id}.png`,
  };
}

function mapToDescripcion(species: SpeciesApiResponse): string | undefined {
  const entry =
    species.flavor_text_entries.find((e) => e.language.name === 'es') ??
    species.flavor_text_entries.find((e) => e.language.name === 'en');
  return entry?.flavor_text.replace(/[\n\f\u000c]+/g, ' ').trim();
}

function mapToTipo(t: { type: { name: string } }): TipoPokemon {
  const map: Record<string, TipoPokemon> = {
    normal:   'normal',   fighting: 'lucha',    flying:   'volador',
    poison:   'veneno',   ground:   'tierra',   rock:     'roca',
    bug:      'bicho',    ghost:    'fantasma',  steel:    'acero',
    fire:     'fuego',    water:    'agua',      grass:    'planta',
    electric: 'eléctrico',psychic:  'psíquico', ice:      'hielo',
    dragon:   'dragón',   dark:     'siniestro', fairy:   'hada',
  };
  const tipo = map[t.type.name];
  if (!tipo) throw new Error(`Tipo desconocido: ${t.type.name}`);
  return tipo;
}

function mapToStats(stats: { base_stat: number; stat: { name: string } }[]): PokemonStats {
  const s: PokemonStats = { hp: 0, ataque: 0, defensa: 0, ataqueEspecial: 0, defensaEspecial: 0, velocidad: 0 };
  stats.forEach(({ base_stat, stat }) => {
    switch (stat.name) {
      case 'hp':              s.hp              = base_stat; break;
      case 'attack':          s.ataque          = base_stat; break;
      case 'defense':         s.defensa         = base_stat; break;
      case 'special-attack':  s.ataqueEspecial  = base_stat; break;
      case 'special-defense': s.defensaEspecial = base_stat; break;
      case 'speed':           s.velocidad       = base_stat; break;
    }
  });
  return s;
}
