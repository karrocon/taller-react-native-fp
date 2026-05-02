import React, { createContext, useContext, useState, type ReactNode } from 'react';

// TODO 1: Define el tipo ThemeMode = 'light' | 'dark'
// TODO 2: Define el tipo Theme con colores básicos:
//         { background: string; text: string; primary: string; card: string }
// TODO 3: Define los objetos lightTheme y darkTheme
// TODO 4: Crea ThemeContext con createContext
// TODO 5: Implementa ThemeProvider: contiene el estado del modo y calcula el tema activo
// TODO 6: Implementa el hook useTheme que lanza error si se usa fuera del Provider

type ThemeMode = 'light' | 'dark';

// TODO: define Theme
// TODO: define lightTheme y darkTheme

type ThemeContextValue = {
  mode:   ThemeMode;
  toggle: () => void;
  // TODO: añade `theme: Theme` e `isDark: boolean`
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  // TODO: lanza error si ctx es null
  return ctx!;
}
