import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, type Theme } from './theme';

// ── Tipos ──────────────────────────────────────────────────────────────────────
type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme:      Theme;
  mode:       ThemeMode;
  isDark:     boolean;
  setMode:    (mode: ThemeMode) => void;
  toggleMode: () => void;
};

// ── Contexto ───────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  const isDark = useMemo(() => {
    if (mode === 'system') return systemScheme === 'dark';
    return mode === 'dark';
  }, [mode, systemScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const setMode = useCallback((m: ThemeMode) => setModeState(m), []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : mode === 'light' ? 'dark' : isDark ? 'light' : 'dark');
  }, [mode, isDark, setMode]);

  const value = useMemo(
    () => ({ theme, mode, isDark, setMode, toggleMode }),
    [theme, mode, isDark, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ── Hook ───────────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  return ctx;
}
