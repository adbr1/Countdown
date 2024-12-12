import { startOfDay, endOfDay, isWithinInterval, compareAsc } from 'date-fns';
import { utcToLocal } from './date/timezone';

export interface Event {
  summary: string;
  start: Date;
  end: Date;
  location?: string;
}

export function filterTodayEvents(events: Event[]): Event[] {
  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);

  return events
    .filter(event => {
      // Convertit les dates en heure locale pour la comparaison
      const eventStart = utcToLocal(new Date(event.start));
      const eventEnd = utcToLocal(new Date(event.end));
      
      // Vérifie si l'événement chevauche la journée en cours
      return isWithinInterval(eventStart, { start, end }) ||
             isWithinInterval(eventEnd, { start, end }) ||
             (eventStart <= start && eventEnd >= end);
    })
    .sort((a, b) => compareAsc(
      utcToLocal(new Date(a.start)),
      utcToLocal(new Date(b.start))
    ));
}

export function getEventDuration(event: Event): number {
  const start = utcToLocal(new Date(event.start));
  const end = utcToLocal(new Date(event.end));
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // durée en minutes
}

export function isEventInProgress(event: Event): boolean {
  const now = new Date();
  const start = utcToLocal(new Date(event.start));
  const end = utcToLocal(new Date(event.end));
  return now >= start && now <= end;
}

export function isEventUpcoming(event: Event): boolean {
  const now = new Date();
  const start = utcToLocal(new Date(event.start));
  return start > now;
}

export function isEventPast(event: Event): boolean {
  const now = new Date();
  const end = utcToLocal(new Date(event.end));
  return end < now;
}