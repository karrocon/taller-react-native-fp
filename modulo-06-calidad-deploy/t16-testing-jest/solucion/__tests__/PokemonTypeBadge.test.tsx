/**
 * Test de componente: PokemonTypeBadge
 * (copiado de PokeApp/__tests__/PokemonTypeBadge.test.tsx)
 */
import { render, screen } from '@testing-library/react-native';
import PokemonTypeBadge from '../src/components/PokemonTypeBadge';
import { tipoColor } from '../src/constants/tipoColor';

describe('PokemonTypeBadge', () => {
  it('muestra el nombre del tipo', () => {
    render(<PokemonTypeBadge tipo="fuego" />);
    expect(screen.getByText('fuego')).toBeTruthy();
  });

  it('muestra un tipo diferente correctamente', () => {
    render(<PokemonTypeBadge tipo="agua" />);
    expect(screen.getByText('agua')).toBeTruthy();
  });

  it('aplica el color de fondo correcto del tipo', () => {
    const { getByText } = render(<PokemonTypeBadge tipo="planta" />);
    const label = getByText('planta');
    const badge = label.parent?.parent;
    expect(badge?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: tipoColor['planta'] }),
      ]),
    );
  });
});
