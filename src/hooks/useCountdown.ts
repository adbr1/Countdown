import { useState, useEffect, useCallback } from 'react';
import { TimeLeft } from '../types/time';
import { Timer } from '../types/timer';
import { calculateCurrentTime, calculateRemainingTime } from '../lib/time-calculator';
import { isCurrentTimeTimer } from '../lib/timer-utils';

export function useCountdown(timer: Timer): TimeLeft {
  // Fonction de calcul extraite pour être réutilisable
  const calculateTime = useCallback(() => {
    return isCurrentTimeTimer(timer)
      ? calculateCurrentTime()
      : calculateRemainingTime(timer.targetTime, timer.createdAt);
  }, [timer]);

  // État initial calculé immédiatement
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTime());

  useEffect(() => {
    // Mise à jour immédiate lors du changement de timer
    setTimeLeft(calculateTime());

    const updateTimer = () => {
      setTimeLeft(calculateTime());
    };

    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timer, calculateTime]); // Dépendances mises à jour

  return timeLeft;
}