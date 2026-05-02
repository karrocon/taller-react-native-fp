/**
 * useBattleAudio
 *
 * Manages all audio for the battle screen:
 * - Battle BGM: streamed from PokéAPI cries (Mewtwo #150, looped)
 *   This is distinct from the menu BGM that uses the local WAV.
 * - Pokémon cries: played on attack (uses the attacker's own cry)
 */
import { useEffect, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import { useSoundSettings } from './useSoundSettings';
import type { Pokemon } from '../types/pokemon';

// Battle theme: local WAV (same asset as menu BGM — reliable, good quality)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const BATTLE_BGM_SOURCE = require('../../assets/battle-music.wav');

function cryUrl(pokemonId: number) {
    return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonId}.ogg`;
}

type UseBattleAudioOptions = {
    attacker: Pokemon | null;
};

export function useBattleAudio({ attacker }: UseBattleAudioOptions) {
    const { bgVolume, fxVolume, stopMenuBGM, startMenuBGM } = useSoundSettings();
    const bgmRef = useRef<Audio.Sound | null>(null);
    const cryRef = useRef<Audio.Sound | null>(null);

    // Pause menu BGM; start battle BGM; restore on unmount
    useEffect(() => {
        stopMenuBGM();

        let mounted = true;
        (async () => {
            try {
                await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
                const { sound } = await Audio.Sound.createAsync(
                    BATTLE_BGM_SOURCE,
                    { isLooping: true, volume: bgVolume, shouldPlay: true },
                );
                if (mounted) bgmRef.current = sound;
            } catch { /* device may not support audio */ }
        })();

        return () => {
            mounted = false;
            bgmRef.current?.unloadAsync();
            bgmRef.current = null;
            startMenuBGM();
        };
    // Only run on mount / unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep BGM volume in sync with settings slider
    useEffect(() => {
        bgmRef.current?.setVolumeAsync(bgVolume);
    }, [bgVolume]);

    const stopBgm = useCallback(async () => {
        await bgmRef.current?.stopAsync();
    }, []);

    const playCry = useCallback(async (): Promise<void> => {
        if (!attacker) return;
        try {
            await cryRef.current?.unloadAsync();
            const { sound } = await Audio.Sound.createAsync(
                { uri: cryUrl(attacker.id) },
                { shouldPlay: true, volume: fxVolume },
            );
            cryRef.current = sound;
            return new Promise(resolve => {
                sound.setOnPlaybackStatusUpdate(status => {
                    if (status.isLoaded && status.didJustFinish) {
                        sound.unloadAsync();
                        resolve();
                    }
                });
            });
        } catch { /* ignore network errors */ }
    }, [attacker, fxVolume]);

    return { stopBgm, playCry };
}
