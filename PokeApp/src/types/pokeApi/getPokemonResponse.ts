export type GetPokemonResponse = {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
            name: 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy';
        };
    }[];
    order: number;
    sprites: {
        front_shiny: string;
        back_shiny: string;
        front_default: string;
        back_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
            home: {
                front_default: string;
                back_default: string;
            };
        };
    };
    stats: {
        base_stat: number;
        stat: {
            name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
        };
    }[];
    cries: {
        latest: string;
        legacy: string;
    };
    species: {
        name: string;
        url: string;
    };
}