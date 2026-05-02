import { GetPokemonResponse } from "../types/pokeApi/getPokemonResponse";
import { GetPokemonSpeciesResponse } from "../types/pokeApi/getPokemonSpeciesResponse";
import { Pokemon, PokemonStats, TipoPokemon } from "../types/pokemon";

export function mapToPokemons(pokemonResponses: GetPokemonResponse[], pokemonSpeciesResponses: GetPokemonSpeciesResponse[]): Pokemon[] {
    return pokemonResponses.map((pokemonResponse, index) => mapToPokemon(pokemonResponse, pokemonSpeciesResponses[index]));
}

export function mapToPokemon(pokemonResponse: GetPokemonResponse, pokemonSpeciesResponse: GetPokemonSpeciesResponse): Pokemon {
    return {
        id: pokemonResponse.id,
        nombre: pokemonResponse.name,
        peso: pokemonResponse.weight,
        altura: pokemonResponse.height,
        tipos: pokemonResponse.types.map(mapToTipoPokemon),
        indice: pokemonResponse.order,
        thumbnail: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails/${String(pokemonResponse.id).padStart(4, '0')}.png`,
        imagen: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/imagesHQ/${String(pokemonResponse.id).padStart(4, '0')}.png`,
        stats: mapToPokemonStats(pokemonResponse.stats),
        descripcion: mapToDescripcionPokemon(pokemonSpeciesResponse),
        frontImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonResponse.id}.png`,
        backImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonResponse.id}.png`,
    };
}

function mapToDescripcionPokemon(pokemonSpeciesResponse: GetPokemonSpeciesResponse): string | undefined {
    const pick =
        pokemonSpeciesResponse.flavor_text_entries.find((e) => e.language.name === 'es') ??
        pokemonSpeciesResponse.flavor_text_entries.find((e) => e.language.name === 'en');
    return pick?.flavor_text.replace(/[\n\f\u000c]+/g, ' ').trim();
}

function mapToTipoPokemon(tipoPokemonResponse: GetPokemonResponse['types'][0]): TipoPokemon {
    switch (tipoPokemonResponse.type.name) {
        case 'normal':
            return 'normal';
        case 'fighting':
            return 'lucha';
        case 'flying':
            return 'volador';
        case 'poison':
            return 'veneno';
        case 'ground':
            return 'tierra';
        case 'rock':
            return 'roca';
        case 'bug':
            return 'bicho';
        case 'ghost':
            return 'fantasma';
        case 'steel':
            return 'acero';
        case 'fire':
            return 'fuego';
        case 'water':
            return 'agua';
        case 'grass':
            return 'planta';
        case 'electric':
            return 'eléctrico';
        case 'psychic':
            return 'psíquico';
        case 'ice':
            return 'hielo';
        case 'dragon':
            return 'dragón';
        case 'dark':
            return 'siniestro';
        case 'fairy':
            return 'hada';
        default:
            throw new Error(`Tipo de pokemon desconocido: ${tipoPokemonResponse.type.name}`);
    }
}

function mapToPokemonStats(stats: GetPokemonResponse['stats']): PokemonStats {
    const pokemonStats: PokemonStats = {
        hp: 0,
        ataque: 0,
        defensa: 0,
        ataqueEspecial: 0,
        defensaEspecial: 0,
        velocidad: 0,
    };

    stats.forEach((stat) => {
        switch (stat.stat.name) {
            case 'hp':
                pokemonStats.hp = stat.base_stat;
                break;
            case 'attack':
                pokemonStats.ataque = stat.base_stat;
                break;
            case 'defense':
                pokemonStats.defensa = stat.base_stat;
                break;
            case 'special-attack':
                pokemonStats.ataqueEspecial = stat.base_stat;
                break;
            case 'special-defense':
                pokemonStats.defensaEspecial = stat.base_stat;
                break;
            case 'speed':
                pokemonStats.velocidad = stat.base_stat;
                break;
            default:
                throw new Error(`Stat de pokemon desconocido: ${stat.stat.name}`);
        }
    });

    return pokemonStats;
}