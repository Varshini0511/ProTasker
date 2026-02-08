import { useState, useEffect } from 'react';

// A generic hook that works for ANY data type <T>
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Initialize
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 2. Save on change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  // 3. Return the same API as useState: [data, setter]
  return [value, setValue] as const;
}