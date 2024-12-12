import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatTimeRange(start: Date, end: Date): string {
  return `${format(start, 'HH:mm', { locale: fr })}-${format(end, 'HH:mm', { locale: fr })}`;
}

export function formatDuration(minutes: number): string {
  return minutes < 60 
    ? `${minutes} minutes`
    : `${Math.floor(minutes / 60)}h${minutes % 60 ? `${minutes % 60}min` : ''}`;
}