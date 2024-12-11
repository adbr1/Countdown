import { Timer } from '../types/timer';
import { TimeLeft } from './time';

export function isCurrentTimeTimer(timer: Timer): boolean {
  return timer.id === 'current-time';
}

export function calculateTimerProgress(timeLeft: TimeLeft, isCurrentTime: boolean): number {
  if (isCurrentTime) return 100; // Current time is always "complete"
  return Math.round((timeLeft.totalSeconds / timeLeft.targetTotalSeconds) * 100);
}

export function getTimerStatus(timeLeft: TimeLeft, isCurrentTime: boolean): {
  isFinished: boolean;
  message: string | null;
} {
  if (isCurrentTime) {
    return {
      isFinished: false,
      message: null
    };
  }

  return {
    isFinished: timeLeft.isFinished,
    message: timeLeft.isFinished ? 'Temps écoulé !' : null
  };
}