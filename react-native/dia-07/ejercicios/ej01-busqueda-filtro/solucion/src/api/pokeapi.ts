// src/api/pokeapi.ts
const BASE = 'https://pokeapi.co/api/v2';

export const getId     = (url: string): string => url.split('/').filter(Boolean).pop()!;
export const getSprite = (id: string | number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
export const cap       = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

import type { PokemonLista } from '../types/pokemon';

export async function fetchLista(limit: number = 151): Promise<PokemonLista[]> {
  const res  = await fetch(`${BASE}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data: { results: Array<{ name: string; url: string }> } = await res.json();
  return data.results.map(p => ({
    name: p.name,
    url:  p.url,
    id:   getId(p.url),
  }));
}

export const TIPO_COLOR: Record<string, string> = {
  fire:     '#F08030', water:    '#6890F0', grass:   '#78C850',
  electric: '#F8D030', ice:      '#98D8D8', fighting:'#C03028',
  poison:   '#A040A0', ground:   '#E0C068', flying:  '#A890F0',
  psychic:  '#F85888', bug:      '#A8B820', rock:    '#B8A038',
  ghost:    '#705898', dragon:   '#7038F8', dark:    '#705848',
  steel:    '#B8B8D0', fairy:    '#EE99AC', normal:  '#A8A878',
};
