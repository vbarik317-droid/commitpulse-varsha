'use client';

import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): readonly [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);

      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      setStoredValue(value);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
