import { createStorageError } from './errors';

export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function getStorageQuota(): { used: number; max: number } | null {
  if (navigator.storage && navigator.storage.estimate) {
    return navigator.storage.estimate()
      .then(estimate => ({
        used: estimate.usage || 0,
        max: estimate.quota || 0
      }))
      .catch(() => null);
  }
  return null;
}

export async function safelyWriteToStorage(key: string, value: string): Promise<void> {
  try {
    // Vérifier l'espace disponible
    const quota = await getStorageQuota();
    if (quota && (quota.used + value.length > quota.max)) {
      throw createStorageError(
        'Storage quota exceeded',
        'WRITE'
      );
    }

    localStorage.setItem(key, value);
  } catch (error) {
    if (error instanceof Error) {
      throw createStorageError(
        'Failed to write to localStorage',
        'WRITE',
        error
      );
    }
    throw error;
  }
}

export function safelyReadFromStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    if (error instanceof Error) {
      throw createStorageError(
        'Failed to read from localStorage',
        'READ',
        error
      );
    }
    throw error;
  }
}