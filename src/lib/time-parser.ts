/**
 * Fonctions utilitaires pour parser et formater le temps
 */

/**
 * Parse une chaîne de temps au format HH:mm ou HH:mm:ss
 */
export function parseTimeString(timeString: string): { hours: number; minutes: number; seconds: number } {
  const parts = timeString.split(':');
  return {
    hours: parseInt(parts[0] || '0', 10),
    minutes: parseInt(parts[1] || '0', 10),
    seconds: parseInt(parts[2] || '0', 10)
  };
}

/**
 * Convertit une chaîne d'heure au format "HH:mm" en Date
 */
export function parseTimeToDate(timeString: string): Date {
  const { hours, minutes } = parseTimeString(timeString);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}