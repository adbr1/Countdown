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
 * Calcule le temps restant pour un timer
 */
export function calculateTimeLeft(targetTime: string, createdAt: number): TimeLeft {
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

/**
 * Calcule le pourcentage de progression
 */
export function calculateProgress(timeLeft: TimeLeft): number {
  if (timeLeft.targetTotalSeconds === 0) return 0;
  return Math.round((timeLeft.totalSeconds / timeLeft.targetTotalSeconds) * 100);
}

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
  totalSeconds: number;
  targetTotalSeconds: number;
}