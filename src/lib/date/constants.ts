/**
 * Constantes pour la gestion des fuseaux horaires
 */

// Décalage horaire fixe pour la France (UTC+2)
export const TIMEZONE_OFFSET = 2; // heures

// Millisecondes par unité de temps
export const TIME_IN_MS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000
} as const;