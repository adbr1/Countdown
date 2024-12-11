import { useMemo } from 'react';
import { TimeLeft } from '../lib/time';
import { interpolateColor } from '../lib/color';

interface BreathingAnimationConfig {
  timeLeft: TimeLeft;
  startColor: string;
  endColor: string;
  maxBreathDuration: number;
  minBreathDuration: number;
}

export function useBreathingAnimation({
  timeLeft,
  startColor,
  endColor,
  maxBreathDuration,
  minBreathDuration
}: BreathingAnimationConfig) {
  return useMemo(() => {
    // Calcul de l'intensité (0 à 1) basé sur le temps écoulé
    const intensity = timeLeft.targetTotalSeconds === 0 ? 0 : 
      1 - (timeLeft.totalSeconds / timeLeft.targetTotalSeconds);

    // Calcul de la durée de respiration
    const breathDuration = Math.max(
      minBreathDuration,
      maxBreathDuration - (intensity * (maxBreathDuration - minBreathDuration))
    );

    // Interpolation de la couleur
    const baseColor = interpolateColor(startColor, endColor, intensity);

    return {
      breathDuration: `${breathDuration}s`,
      baseColor,
      intensity
    };
  }, [timeLeft, startColor, endColor, maxBreathDuration, minBreathDuration]);
}