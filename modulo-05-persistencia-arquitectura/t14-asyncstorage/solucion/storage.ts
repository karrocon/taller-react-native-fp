import AsyncStorage from '@react-native-async-storage/async-storage';

// Copia directa de PokeApp/src/utils/storage.ts + funciones adicionales

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function removeKey(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clearAll(): Promise<void> {
  await AsyncStorage.clear();
}

export async function getAllKeys(): Promise<string[]> {
  const keys = await AsyncStorage.getAllKeys();
  return [...keys];
}
