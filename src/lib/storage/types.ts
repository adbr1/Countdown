export interface StorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export interface StorageError extends Error {
  type: 'READ' | 'WRITE' | 'SERIALIZE' | 'DESERIALIZE';
  originalError?: unknown;
}