import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { parseTimeString } from '../lib/time-parser';

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeString = format(currentTime, 'HH:mm:ss');
  const { hours, minutes, seconds } = parseTimeString(timeString);

  return {
    time: timeString,
    date: format(currentTime, 'EEEE d MMMM', { locale: fr }),
    hours,
    minutes,
    seconds
  };
}