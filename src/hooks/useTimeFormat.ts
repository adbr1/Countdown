import { useMemo } from 'react';

interface TimeFormat {
  showHours: boolean;
  showMinutes: boolean;
}

export function useTimeFormat(hours: number, minutes: number): TimeFormat {
  return useMemo(() => ({
    showHours: hours > 0,
    showMinutes: minutes > 0 || hours > 0
  }), [hours, minutes]);
}