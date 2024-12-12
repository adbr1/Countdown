/**
 * Convertit une date UTC en date locale (Fuseau horaire Paris)
 */
export function utcToLocal(date: Date): Date {
  // Conversion avec le fuseau horaire Europe/Paris
  const offset = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })).getTime() - date.getTime();
  return new Date(date.getTime() + offset);
}

/**
 * Convertit une date locale (Fuseau horaire Paris) en date UTC
 */
export function localToUtc(date: Date): Date {
  // Conversion inverse
  const offset = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Paris' })).getTime() - date.getTime();
  return new Date(date.getTime() - offset);
}

/**
 * Crée une date locale à partir de composants de date
 */
export function createLocalDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
): Date {
  // Création de la date en UTC
  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));
  // Conversion en heure locale (Fuseau horaire Paris)
  return utcToLocal(utcDate);
}
