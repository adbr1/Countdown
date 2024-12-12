import { Event } from '../types/event';
import { Timer } from '../types/timer';
import { formatLocalTime } from './date/formatters';

export function createTimerFromEvent(event: Event): Timer {
  return {
    id: crypto.randomUUID(),
    name: event.summary,
    targetTime: formatLocalTime(event.end),
    createdAt: event.start.getTime()
  };
}