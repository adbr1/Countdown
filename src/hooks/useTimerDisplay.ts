import { useMemo } from 'react';
import { Timer } from '../types/timer';
import { TimeLeft } from '../lib/time';
import { isCurrentTimeTimer, calculateTimerProgress, getTimerStatus } from '../lib/timer-utils';

export function useTimerDisplay(timer: Timer, timeLeft: TimeLeft) {
  return useMemo(() => {
    const isCurrentTime = isCurrentTimeTimer(timer);
    const progress = calculateTimerProgress(timeLeft, isCurrentTime);
    const status = getTimerStatus(timeLeft, isCurrentTime);

    return {
      isCurrentTime,
      progress,
      status,
      displayHours: timeLeft.hours > 0,
      displayMinutes: timeLeft.minutes > 0 || timeLeft.hours > 0
    };
  }, [timer, timeLeft]);
}