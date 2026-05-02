import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';
import type { Theme } from '../constants/theme';
import { loadJSON, saveJSON } from '../utils/storage';

const THEME_STORAGE_KEY = 'theme_mode';

// ─── Tipos ────────────────────────────────────────────────────────────────────
type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme:      Theme;
  mode:       ThemeMode;
  isDark:     boolean;
  setMode:    (mode: ThemeMode) => void;
  toggleMode: () => void;
};

// ─── Contexto ─────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
type Props = { children: React.ReactNode };

export function ThemeProvider({ children }: Props) {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('system');

  // Restore persisted mode on mount
  useEffect(() => {
    loadJSON<ThemeMode>(THEME_STORAGE_KEY).then(saved => {
      if (saved) setModeState(saved);
    });
  }, []);

  const isDark = useMemo(() => {
    if (mode === 'system') return systemScheme === 'dark';
    return mode === 'dark';
  }, [mode, systemScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    saveJSON(THEME_STORAGE_KEY, m);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : mode === 'light' ? 'dark' : isDark ? 'light' : 'dark');
  }, [mode, isDark, setMode]);

  const value = useMemo(
    () => ({ theme, mode, isDark, setMode, toggleMode }),
    [theme, mode, isDark, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}
