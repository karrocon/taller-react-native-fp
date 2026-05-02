// Copia directa de PokeApp/src/types/pokemon.ts

export type TipoPokemon =
  | 'normal' | 'fuego' | 'agua' | 'planta' | 'eléctrico'
  | 'hielo' | 'lucha' | 'veneno' | 'tierra' | 'volador'
  | 'psíquico' | 'bicho' | 'roca' | 'fantasma' | 'dragón'
  | 'siniestro' | 'acero' | 'hada';

export type PokemonStats = {
  hp:              number;
  ataque:          number;
  defensa:         number;
  ataqueEspecial:  number;
  defensaEspecial: number;
  velocidad:       number;
};

export type Pokemon = {
  id:          number;
  nombre:      string;
  peso:        number;
  altura:      number;
  tipos:       TipoPokemon[];
  indice:      number;
  thumbnail:   string;
  imagen:      string;
  stats:       PokemonStats;
  descripcion?: string;
  frontImage:  string;
  backImage:   string;
};
