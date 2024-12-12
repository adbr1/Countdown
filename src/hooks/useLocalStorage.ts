import { useState, useEffect, useCallback } from 'react';
import { StorageOptions } from '../lib/storage/types';
import { isStorageAvailable, safelyWriteToStorage, safelyReadFromStorage } from '../lib/storage/utils';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
) {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = options;

  // Vérifier si le localStorage est disponible
  const storageAvailable = isStorageAvailable();

  // Initialisation avec gestion d'erreur
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!storageAvailable) {
      console.warn('localStorage is not available, falling back to memory storage');
      return initialValue;
    }

    try {
      const item = safelyReadFromStorage(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.error('Failed to initialize from localStorage:', error);
      return initialValue;
    }
  });

  // Fonction de mise à jour avec gestion d'erreur
  const setValue = useCallback(async (value: T | ((val: T) => T)) => {
    try {
      // Permettre une fonction de mise à jour
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (storageAvailable) {
        const serialized = serialize(valueToStore);
        await safelyWriteToStorage(key, serialized);
      }
    } catch (error) {
      console.error('Failed to update localStorage:', error);
      // Continuer avec la valeur en mémoire même si le stockage échoue
    }
  }, [key, serialize, storageAvailable, storedValue]);

  // Synchroniser avec le localStorage
  useEffect(() => {
    if (!storageAvailable) return;

    try {
      const serialized = serialize(storedValue);
      safelyWriteToStorage(key, serialized);
    } catch (error) {
      console.error('Failed to sync with localStorage:', error);
    }
  }, [key, storedValue, serialize, storageAvailable]);

  return [storedValue, setValue] as const;
}