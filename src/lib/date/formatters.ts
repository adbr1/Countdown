import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { utcToLocal } from './timezone';

/**
 * Formate une date en heure locale
 */
export function formatLocalTime(date: Date): string {
  const localDate = utcToLocal(date);
  return format(localDate, 'HH:mm', { locale: fr });
}

/**
 * Formate une plage horaire
 */
export function formatTimeRange(start: Date, end: Date): string {
  return `${formatLocalTime(start)}-${formatLocalTime(end)}`;
}