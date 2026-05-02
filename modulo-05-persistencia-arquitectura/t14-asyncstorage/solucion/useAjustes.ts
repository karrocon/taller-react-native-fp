// Hook de ejemplo: persistencia de ajustes con AsyncStorage
// (Fragmento de useSoundSettings.tsx + useTheme.tsx de PokeApp)
import { useState, useEffect, useCallback } from 'react';
import { loadJSON, saveJSON } from './storage';

const SETTINGS_KEY = 'user_settings';

type Settings = {
  volumenMusica: number;
  volumenFx:     number;
  modoOscuro:    boolean;
};

const DEFAULT_SETTINGS: Settings = {
  volumenMusica: 0.7,
  volumenFx:     0.8,
  modoOscuro:    false,
};

export function useAjustes() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // Carga al montar
  useEffect(() => {
    loadJSON<Settings>(SETTINGS_KEY).then((saved) => {
      if (saved) setSettings(saved);
    });
  }, []);

  // Persiste cualquier cambio
  const update = useCallback((partial: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveJSON(SETTINGS_KEY, next);
      return next;
    });
  }, []);

  return { settings, update };
}
