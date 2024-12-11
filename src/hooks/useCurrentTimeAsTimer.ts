import { useMemo } from 'react';
import { useCurrentTime } from './useCurrentTime';
import { Timer } from '../types/timer';

export function useCurrentTimeAsTimer(): Timer {
  const { time } = useCurrentTime();
  
  return useMemo(() => ({
    id: 'current-time',
    name: 'Heure actuelle',
    targetTime: time,
    createdAt: Date.now()
  }), [time]);
}