import { useMemo } from 'react';

interface TimeUnitSize {
  fontSize: string;
  separatorSize: string;
  containerPadding: string;
}

export function useTimeUnitSize(isLast: boolean, showHours: boolean, showMinutes: boolean): TimeUnitSize {
  return useMemo(() => {
    // Si c'est les secondes (isLast) et qu'il n'y a ni heures ni minutes
    const isSecondsOnly = isLast && !showHours && !showMinutes;

    return {
      fontSize: isSecondsOnly
        ? "text-7xl sm:text-8xl md:text-9xl" // Taille réduite pour les secondes seules
        : "text-6xl sm:text-7xl md:text-8xl",
      separatorSize: "text-4xl sm:text-5xl md:text-6xl",
      containerPadding: isSecondsOnly
        ? "p-6 sm:p-8" // Padding réduit quand il n'y a que les secondes
        : "p-8 sm:p-12"
    };
  }, [isLast, showHours, showMinutes]);
}