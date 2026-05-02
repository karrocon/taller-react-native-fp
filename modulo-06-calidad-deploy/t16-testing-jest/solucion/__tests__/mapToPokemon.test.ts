/**
 * Test de utilidad pura: mapToPokemon
 * (copiado de PokeApp/__tests__/mapToPokemon.test.ts)
 */
import { mapToPokemon } from '../src/utils/mapToPokemon';
import type { GetPokemonResponse } from '../src/types/pokeApi/getPokemonResponse';
import type { GetPokemonSpeciesResponse } from '../src/types/pokeApi/getPokemonSpeciesResponse';

const mockPokemonResponse: GetPokemonResponse = {
  id: 6, name: 'charizard', order: 7, weight: 905, height: 17,
  sprites: {
    front_shiny: '', back_shiny: '', front_default: '', back_default: '',
    other: { 'official-artwork': { front_default: '' }, home: { front_default: '', back_default: '' } },
  },
  types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
  stats: [
    { base_stat: 78,  stat: { name: 'hp' } },
    { base_stat: 84,  stat: { name: 'attack' } },
    { base_stat: 78,  stat: { name: 'defense' } },
    { base_stat: 109, stat: { name: 'special-attack' } },
    { base_stat: 85,  stat: { name: 'special-defense' } },
    { base_stat: 100, stat: { name: 'speed' } },
  ],
  cries: { latest: '', legacy: '' },
  species: { name: 'charizard', url: '' },
};

const mockSpeciesResponse: GetPokemonSpeciesResponse = {
  flavor_text_entries: [{
    flavor_text: 'Spits fire that\nis hot enough\nto melt boulders.',
    language: { name: 'en', url: '' },
    version:  { name: 'red', url: '' },
  }],
};

describe('mapToPokemon', () => {
  it('mapea id y nombre', () => {
    const p = mapToPokemon(mockPokemonResponse, mockSpeciesResponse);
    expect(p.id).toBe(6);
    expect(p.nombre).toBe('charizard');
  });

  it('mapea los tipos al español', () => {
    const p = mapToPokemon(mockPokemonResponse, mockSpeciesResponse);
    expect(p.tipos).toContain('fuego');
    expect(p.tipos).toContain('volador');
  });

  it('mapea stats.hp correctamente', () => {
    const p = mapToPokemon(mockPokemonResponse, mockSpeciesResponse);
    expect(p.stats.hp).toBe(78);
    expect(p.stats.velocidad).toBe(100);
  });

  it('normaliza la descripcion (elimina saltos de linea)', () => {
    const p = mapToPokemon(mockPokemonResponse, mockSpeciesResponse);
    expect(p.descripcion).not.toContain('\n');
    expect(p.descripcion).toBe('Spits fire that is hot enough to melt boulders.');
  });
});
