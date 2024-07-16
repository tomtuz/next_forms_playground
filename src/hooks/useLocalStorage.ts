import { useEffect, useState } from 'react';

// Dev mode setup:
// const { setValueForce } = useLocalStorage<Array<any>>(LS_FORM_DATA, [])
// setValueForce([])

// modular LocalStorage hook with type safety
export function useLocalStorage<T>(key: string, initialValue: T) {
  const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

  const getInitialValue = () => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getInitialValue);

  useEffect(() => {
    if (isBrowser) {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) as T : initialValue);
      } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
      }
    }
  }, [key, initialValue, isBrowser]);


  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const removeValue = () => {
    try {
      if (isBrowser) {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key “${key}”:`, error);
    }
  };

  const setValueForce = (value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`(LS_HOOK) Error setting localStorage key “${key}”:`, error);
    }
  };

  return { storedValue, setValue, removeValue, setValueForce }
}
