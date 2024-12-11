import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useCountdown } from './useCountdown';
import { useCurrentTimeAsTimer } from './useCurrentTimeAsTimer';
import { Timer } from '../types/timer';

export function useTimerState() {
  const [timers, setTimers] = useLocalStorage<Timer[]>('timers', []);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const currentTimeTimer = useCurrentTimeAsTimer();

  // Combine les compteurs personnalisés avec l'heure actuelle
  const allTimers = useMemo(() => {
    return [currentTimeTimer, ...timers];
  }, [currentTimeTimer, timers]);

  const activeTimer = allTimers.find(t => t.id === activeTimerId) || allTimers[0];
  const timeLeft = useCountdown(activeTimer);
  
  const currentIndex = allTimers.findIndex(t => t.id === activeTimer.id);

  const handleCreateTimer = (newTimer: Omit<Timer, 'id' | 'createdAt'>) => {
    const timer: Timer = {
      ...newTimer,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    setTimers([...timers, timer]);
    setActiveTimerId(timer.id);
  };

  const handleEditTimer = (updatedTimer: Timer) => {
    if (updatedTimer.id === 'current-time') return;
    setTimers(timers.map(t => t.id === updatedTimer.id ? updatedTimer : t));
  };

  const handleDeleteTimer = (id: string) => {
    if (id === 'current-time') return;
    setTimers(timers.filter(t => t.id !== id));
    if (activeTimerId === id) {
      setActiveTimerId(allTimers[0].id);
    }
  };

  const nextTimer = () => {
    if (allTimers.length <= 1) return;
    const nextIndex = (currentIndex + 1) % allTimers.length;
    setActiveTimerId(allTimers[nextIndex].id);
  };

  const previousTimer = () => {
    if (allTimers.length <= 1) return;
    const previousIndex = (currentIndex - 1 + allTimers.length) % allTimers.length;
    setActiveTimerId(allTimers[previousIndex].id);
  };

  const selectTimerByIndex = (index: number) => {
    if (index >= 0 && index < allTimers.length) {
      setActiveTimerId(allTimers[index].id);
    }
  };

  return {
    timers: allTimers,
    activeTimer,
    timeLeft,
    handleCreateTimer,
    handleEditTimer,
    handleDeleteTimer,
    setActiveTimerId,
    nextTimer,
    previousTimer,
    currentIndex,
    selectTimerByIndex
  };
}