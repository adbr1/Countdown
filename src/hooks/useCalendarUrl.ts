import { useLocalStorage } from './useLocalStorage';

export function useCalendarUrl() {
  const [calendarUrl, setCalendarUrl] = useLocalStorage<string>('calendar-url', '');

  return {
    calendarUrl,
    setCalendarUrl
  };
}