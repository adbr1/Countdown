import { StorageError } from './types';

export function createStorageError(
  message: string,
  type: StorageError['type'],
  originalError?: unknown
): StorageError {
  const error = new Error(message) as StorageError;
  error.type = type;
  error.originalError = originalError;
  return error;
}