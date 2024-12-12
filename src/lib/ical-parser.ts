import type { Event } from '../types/event';
import { createLocalDate } from './date/timezone';

/**
 * Parse une chaîne de date iCal
 */
function parseICalDate(dateStr: string): Date {
  const cleanDateStr = dateStr.replace(/[TZ]/g, '');
  
  if (cleanDateStr.length < 14) {
    throw new Error(`Format de date invalide: ${dateStr}`);
  }

  const year = parseInt(cleanDateStr.substr(0, 4));
  const month = parseInt(cleanDateStr.substr(4, 2)) - 1;
  const day = parseInt(cleanDateStr.substr(6, 2));
  const hour = parseInt(cleanDateStr.substr(8, 2));
  const minute = parseInt(cleanDateStr.substr(10, 2));
  const second = parseInt(cleanDateStr.substr(12, 2));

  return createLocalDate(year, month, day, hour, minute, second);
}

/**
 * Extrait la valeur de date d'une ligne iCal
 */
function extractDateValue(line: string): string {
  const valueMatch = line.match(/(?:;[^:]*)?:([^Z]*)/);
  return valueMatch ? valueMatch[1] : '';
}

/**
 * Parse les événements d'un fichier iCal
 */
export function parseICalEvents(icalData: string): Event[] {
  const events: Event[] = [];
  const lines = icalData.split('\n');
  
  let currentEvent: Partial<Event> = {};
  let inEvent = false;

  for (let line of lines) {
    line = line.trim();

    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      currentEvent = {};
    } else if (line === 'END:VEVENT') {
      if (currentEvent.summary && currentEvent.start && currentEvent.end) {
        events.push(currentEvent as Event);
      }
      inEvent = false;
    } else if (inEvent) {
      if (line.startsWith('SUMMARY:')) {
        currentEvent.summary = line.substring(8);
      } else if (line.startsWith('DTSTART')) {
        currentEvent.start = parseICalDate(extractDateValue(line));
      } else if (line.startsWith('DTEND')) {
        currentEvent.end = parseICalDate(extractDateValue(line));
      } else if (line.startsWith('LOCATION:')) {
        currentEvent.location = line.substring(9);
      }
    }
  }

  return events;
}