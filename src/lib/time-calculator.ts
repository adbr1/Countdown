import { TimeLeft } from '../types/time';
import { parseTimeToDate } from './time-parser';

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
export function calculateRemainingTime(targetTime: string, createdAt: number): TimeLeft {
  const now = new Date();
  const target = parseTimeToDate(targetTime);
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