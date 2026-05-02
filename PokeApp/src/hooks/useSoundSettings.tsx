import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { Audio } from 'expo-av';
import type { AVPlaybackSource } from 'expo-av';
import { loadJSON, saveJSON } from '../utils/storage';

const KEYS = {
    bgVolume: 'settings_bg_volume',
    fxVolume: 'settings_fx_volume',
} as const;

// Asset path is relative to this file (src/hooks/ → ../../assets/)
const MENU_BGM_SOURCE: AVPlaybackSource = require('../../assets/battle-music.wav');

// PokéAPI cries: short, iconic Pokémon sounds
const TAP_CRY_URL  = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg';  // Pikachu
const HUIR_CRY_URL = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/84.ogg';  // Doduo (runs away)

type SoundContextValue = {
    bgVolume: number;
    fxVolume: number;
    setBgVolume: (v: number) => void;
    setFxVolume: (v: number) => void;
    startMenuBGM: () => Promise<void>;
    stopMenuBGM:  () => Promise<void>;
    playTap:  () => void;
    playHuir: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
    const [bgVolume, setBgVolumeState] = useState(0.7);
    const [fxVolume, setFxVolumeState] = useState(1.0);

    // Refs mirror state so async callbacks always see current values
    const bgVolumeRef = useRef(0.7);
    const fxVolumeRef = useRef(1.0);
    const menuBgmRef  = useRef<Audio.Sound | null>(null);

    // Restore persisted values on mount
    useEffect(() => {
        loadJSON<number>(KEYS.bgVolume).then(v => {
            if (v != null) { setBgVolumeState(v); bgVolumeRef.current = v; }
        });
        loadJSON<number>(KEYS.fxVolume).then(v => {
            if (v != null) { setFxVolumeState(v); fxVolumeRef.current = v; }
        });
    }, []);

    const setBgVolume = useCallback((v: number) => {
        setBgVolumeState(v);
        bgVolumeRef.current = v;
        saveJSON(KEYS.bgVolume, v);
        // Update menu BGM volume live if it is playing
        menuBgmRef.current?.setVolumeAsync(v);
    }, []);

    const setFxVolume = useCallback((v: number) => {
        setFxVolumeState(v);
        fxVolumeRef.current = v;
        saveJSON(KEYS.fxVolume, v);
    }, []);

    // ── Menu BGM ─────────────────────────────────────────────────────────────
    const startMenuBGM = useCallback(async () => {
        if (menuBgmRef.current) return;          // already running
        try {
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
            const { sound } = await Audio.Sound.createAsync(MENU_BGM_SOURCE, {
                isLooping: true,
                volume: bgVolumeRef.current,
                shouldPlay: true,
            });
            menuBgmRef.current = sound;
        } catch { /* audio unavailable on this device */ }
    }, []);

    const stopMenuBGM = useCallback(async () => {
        const s = menuBgmRef.current;
        menuBgmRef.current = null;
        await s?.stopAsync();
        await s?.unloadAsync();
    }, []);

    // ── Fire-and-forget sound effects ─────────────────────────────────────────
    const playTap = useCallback(() => {
        Audio.Sound.createAsync(
            { uri: TAP_CRY_URL },
            { shouldPlay: true, volume: fxVolumeRef.current },
        ).then(({ sound }) => {
            sound.setOnPlaybackStatusUpdate(status => {
                if (status.isLoaded && status.didJustFinish) sound.unloadAsync();
            });
        }).catch(() => {/* silent fail */});
    }, []);

    const playHuir = useCallback(() => {
        Audio.Sound.createAsync(
            { uri: HUIR_CRY_URL },
            { shouldPlay: true, volume: fxVolumeRef.current },
        ).then(({ sound }) => {
            sound.setOnPlaybackStatusUpdate(status => {
                if (status.isLoaded && status.didJustFinish) sound.unloadAsync();
            });
        }).catch(() => {/* silent fail */});
    }, []);

    const value = useMemo(
        () => ({ bgVolume, fxVolume, setBgVolume, setFxVolume,
                 startMenuBGM, stopMenuBGM, playTap, playHuir }),
        [bgVolume, fxVolume, setBgVolume, setFxVolume,
         startMenuBGM, stopMenuBGM, playTap, playHuir],
    );

    return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSoundSettings(): SoundContextValue {
    const ctx = useContext(SoundContext);
    if (!ctx) throw new Error('useSoundSettings must be used inside <SoundProvider>');
    return ctx;
}
