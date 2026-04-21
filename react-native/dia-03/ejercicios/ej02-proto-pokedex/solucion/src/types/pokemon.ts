export type PokemonData = {
  id: string;
  nombre: string;
  tipo: string;
  sprite: string;
};

export const POKEMON_DATA: PokemonData[] = [
  { id: '1',   nombre: 'Bulbasaur',  tipo: 'Planta',  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: '4',   nombre: 'Charmander', tipo: 'Fuego',   sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: '7',   nombre: 'Squirtle',   tipo: 'Agua',    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { id: '25',  nombre: 'Pikachu',    tipo: 'Electro', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { id: '133', nombre: 'Eevee',      tipo: 'Normal',  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
];
