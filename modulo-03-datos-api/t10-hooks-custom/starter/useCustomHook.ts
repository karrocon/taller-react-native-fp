import { useEffect, useState, useCallback } from 'react';

// ── T10: Hooks personalizados ──────────────────────────────────────────────────
// Plantilla genérica para extraer lógica en un hook reutilizable.
//
// TODO 1: Renombra este hook según su propósito (ej. useTimer, useCounter, useFetch…)
// TODO 2: Define qué estado interno necesita
// TODO 3: Implementa la lógica dentro del hook
// TODO 4: Devuelve solo los valores/funciones que el componente necesita
// TODO 5: Añade un useEffect para efectos secundarios (limpieza con return)
// TODO 6: Documenta las props con un tipo explícito

type UseCustomHookProps = {
  // TODO: define las props
};

type UseCustomHookResult = {
  // TODO: define el resultado
};

export default function useCustomHook(_props: UseCustomHookProps): UseCustomHookResult {
  // TODO: implementa el hook

  return {
    // TODO: devuelve los valores
  };
}
