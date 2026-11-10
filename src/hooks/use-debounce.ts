'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para debouncing de valores com delay configurável (padrão: 350ms).
 * Evita disparos contínuos de filtros, ordenações ou buscas pesadas a cada tecla.
 * Cumpre a Regra 04 dos Padrões Globais de Performance.
 */
export function useDebounce<T>(value: T, delay = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

