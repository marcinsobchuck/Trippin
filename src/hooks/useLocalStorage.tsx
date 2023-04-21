import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [initialValue, key, storedValue]);

  return [storedValue, setStoredValue];
}
