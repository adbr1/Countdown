import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Event } from '../types/event';
import { parseICalEvents } from '../lib/ical-parser';

export function useCalendar() {
  const [events, setEvents] = useLocalStorage<Event[]>('calendar-events', [], {
    serialize: useCallback((events: Event[]) => {
      try {
        return JSON.stringify(events.map(event => ({
          ...event,
          start: event.start.toISOString(),
          end: event.end.toISOString()
        })));
      } catch (error) {
        console.error('Failed to serialize events:', error);
        return JSON.stringify([]);
      }
    }, []),
    
    deserialize: useCallback((str: string) => {
      try {
        const parsed = JSON.parse(str);
        return parsed.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
      } catch (error) {
        console.error('Failed to deserialize events:', error);
        return [];
      }
    }, [])
  });

  const [showEvents, setShowEvents] = useState(false);
  const [showICalDialog, setShowICalDialog] = useState(false);

  const handleImportEvents = useCallback(async (calendarUrl: string) => {
    try {
      const response = await fetch(calendarUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch calendar: ${response.statusText}`);
      }
      
      const icalData = await response.text();
      const newEvents = parseICalEvents(icalData);
      
      if (newEvents.length === 0) {
        console.warn('No events found in calendar');
      }
      
      setEvents(newEvents);
      setShowEvents(true);
      setShowICalDialog(false);
    } catch (error) {
      console.error('Failed to import calendar:', error);
      throw error;
    }
  }, [setEvents]);

  const handleCalendarToggle = useCallback(() => {
    setShowEvents(prev => !prev);
  }, []);

  return {
    events,
    showEvents,
    showICalDialog,
    hasEvents: events.length > 0,
    handleImportEvents,
    handleCalendarToggle,
    setShowICalDialog,
    setShowEvents
  };
}