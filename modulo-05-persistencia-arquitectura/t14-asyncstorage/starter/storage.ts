import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO 1: Implementa saveJSON<T>(key: string, value: T): Promise<void>
//         usa AsyncStorage.setItem con JSON.stringify
// TODO 2: Implementa loadJSON<T>(key: string): Promise<T | null>
//         usa AsyncStorage.getItem + JSON.parse; devuelve null si no existe
// TODO 3: Implementa removeKey(key: string): Promise<void>
// TODO 4: Implementa clearAll(): Promise<void>
// TODO 5 (bonus): Añade una función getAllKeys(): Promise<string[]>

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  // TODO: implementar
  throw new Error('TODO: implementar saveJSON');
}

export async function loadJSON<T>(key: string): Promise<T | null> {
  // TODO: implementar
  throw new Error('TODO: implementar loadJSON');
}

export async function removeKey(key: string): Promise<void> {
  // TODO: implementar
  throw new Error('TODO: implementar removeKey');
}

export async function clearAll(): Promise<void> {
  // TODO: implementar
  throw new Error('TODO: implementar clearAll');
}
