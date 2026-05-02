/**
 * Plantilla para test de componente con @testing-library/react-native
 *
 * TODO 1: Importa el componente que quieres testear
 * TODO 2: Escribe al menos 3 it() con describe():
 *         - Que renderiza sin errores
 *         - Que muestra el texto correcto dadas las props
 *         - Que el color/estilo correcto se aplica
 * TODO 3: Usa `render`, `screen.getByText`, `fireEvent` según corresponda
 * TODO 4: Para estilos: `label.parent?.props.style` para verificar backgroundColor
 */
import { render, screen, fireEvent } from '@testing-library/react-native';

// TODO: import MyComponent from '../src/components/MyComponent';

describe('MyComponent', () => {
  it('renderiza sin errores', () => {
    // TODO: render(<MyComponent prop="valor" />);
    // expect(screen.getByText('...')).toBeTruthy();
    expect(true).toBe(true); // placeholder
  });

  it('muestra el texto correcto', () => {
    // TODO
  });

  it('aplica el estilo correcto', () => {
    // TODO: verifica backgroundColor u otras props de estilo
  });
});
