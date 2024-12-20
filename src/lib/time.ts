/**
 * Convertit une chaîne d'heure au format "HH:mm" en Date
 */
export function parseTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/**
 * Calcule la durée totale en secondes entre deux timestamps
 */
export function calculateDuration(startTime: number, endTime: number): number {
  return Math.floor((endTime - startTime) / 1000);
}

/**
 * Calcule le temps pour l'horloge actuelle
 */
export function calculateCurrentTime(): TimeLeft {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    isFinished: false,
    totalSeconds: 24 * 3600, // Jour complet en secondes
    targetTotalSeconds: 24 * 3600
  };
}

/**
 * Calcule le temps restant pour un timer
 */
export function calculateTimeLeft(targetTime: string, createdAt: number, isCurrentTime = false): TimeLeft {
  if (isCurrentTime) {
    return calculateCurrentTime();
  }

  const now = new Date();
  const target = parseTime(targetTime);
  const creation = new Date(createdAt);
  
  // Durée totale initiale en secondes
  const targetTotalSeconds = calculateDuration(creation.getTime(), target.getTime());
  
  // Si le temps est dépassé
  if (target.getTime() < now.getTime()) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isFinished: true,
      totalSeconds: 0,
      targetTotalSeconds
    };
  }

  // Calcul du temps restant
  const totalSeconds = calculateDuration(now.getTime(), target.getTime());
  
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isFinished: false,
    totalSeconds,
    targetTotalSeconds
  };
}

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
  totalSeconds: number;
  targetTotalSeconds: number;
}