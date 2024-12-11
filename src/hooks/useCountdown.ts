import { useState, useEffect } from 'react';
import { calculateTimeLeft, TimeLeft } from '../lib/time';

export function useCountdown(targetTime: string, createdAt: number): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => 
    calculateTimeLeft(targetTime, createdAt)
  );

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(targetTime, createdAt));
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [targetTime, createdAt]);

  return timeLeft;
}