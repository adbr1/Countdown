import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useCountdown } from './useCountdown';
import { Timer } from '../types/timer';

export function useTimerState() {
  const [timers, setTimers] = useLocalStorage<Timer[]>('timers', []);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);

  const activeTimer = timers.find(t => t.id === activeTimerId) || timers[0];
  const timeLeft = useCountdown(
    activeTimer?.targetTime || '12:00',
    activeTimer?.createdAt || Date.now()
  );
  const currentIndex = activeTimer ? timers.findIndex(t => t.id === activeTimer.id) : -1;

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
    setTimers(timers.map(t => t.id === updatedTimer.id ? updatedTimer : t));
  };

  const handleDeleteTimer = (id: string) => {
    setTimers(timers.filter(t => t.id !== id));
    if (activeTimerId === id) {
      setActiveTimerId(timers[0]?.id || null);
    }
  };

  const nextTimer = () => {
    if (timers.length <= 1) return;
    const nextIndex = (currentIndex + 1) % timers.length;
    setActiveTimerId(timers[nextIndex].id);
  };

  const previousTimer = () => {
    if (timers.length <= 1) return;
    const previousIndex = (currentIndex - 1 + timers.length) % timers.length;
    setActiveTimerId(timers[previousIndex].id);
  };

  return {
    timers,
    activeTimer,
    timeLeft,
    handleCreateTimer,
    handleEditTimer,
    handleDeleteTimer,
    setActiveTimerId,
    nextTimer,
    previousTimer,
    currentIndex
  };
}