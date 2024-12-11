import { TimeLeft } from '../../types/time';

export function formatTime(hours: number, minutes: number, seconds: number): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function parseTime(timeString: string): TimeLeft {
  const [hours = 0, minutes = 0, seconds = 0] = timeString.split(':').map(Number);
  return {
    hours,
    minutes,
    seconds,
    isFinished: false,
    totalSeconds: hours * 3600 + minutes * 60 + seconds,
    targetTotalSeconds: hours * 3600 + minutes * 60 + seconds
  };
}