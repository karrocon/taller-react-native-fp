/**
 * Test de hook: useBattleState
 *
 * Verifica la inicialización de HP desde stats y que
 * el ataque reduce el HP del enemigo.
 */
import { renderHook, act } from '@testing-library/react-native';
import { useBattleState } from '../src/hooks/useBattleState';
import type { Pokemon } from '../src/types/pokemon';

// Fixture mínimo — solo campos que useBattleState necesita
function makePokemon(id: number, hp: number): Pokemon {
    return {
        id,
        nombre: `pokemon-${id}`,
        peso: 100,
        altura: 10,
        tipos: ['normal'],
        indice: id,
        thumbnail: '',
        imagen: '',
        frontImage: '',
        backImage: '',
        stats: {
            hp,
            ataque: 50,
            defensa: 50,
            ataqueEspecial: 50,
            defensaEspecial: 50,
            velocidad: 50,
        },
    } as Pokemon;
}

const ENEMY_HP  = 200;
const PLAYER_HP = 180;

describe('useBattleState', () => {
    it('inicializa el HP desde stats.hp', () => {
        const { result } = renderHook(() =>
            useBattleState(
                [makePokemon(1, ENEMY_HP)],
                [makePokemon(2, PLAYER_HP)],
            ),
        );

        expect(result.current.topHP[0]?.current).toBe(ENEMY_HP);
        expect(result.current.topHP[0]?.max).toBe(ENEMY_HP);
        expect(result.current.bottomHP[0]?.current).toBe(PLAYER_HP);
    });

    it('el ataque reduce el HP del enemigo', async () => {
        const { result } = renderHook(() =>
            useBattleState(
                [makePokemon(1, ENEMY_HP)],
                [makePokemon(2, PLAYER_HP)],
            ),
        );

        // playCry stub: se resuelve inmediatamente
        const playCry = jest.fn().mockResolvedValue(undefined);

        await act(async () => {
            await result.current.attack(playCry);
        });

        expect(playCry).toHaveBeenCalledTimes(1);
        // HP del enemigo debe haber bajado (5-15% de 200 = 10-30 pts)
        expect(result.current.topHP[0]?.current).toBeLessThan(ENEMY_HP);
        expect(result.current.topHP[0]?.current).toBeGreaterThanOrEqual(0);
    });

    it('isOver es false al inicio', () => {
        const { result } = renderHook(() =>
            useBattleState(
                [makePokemon(1, ENEMY_HP)],
                [makePokemon(2, PLAYER_HP)],
            ),
        );

        expect(result.current.isOver).toBe(false);
    });
});
