import { useState, useEffect } from 'react';

type KeyProp = 'columns' | 'tasks';

export function useLocalStorageState<T>(key: KeyProp, initialState: T[] = []) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
