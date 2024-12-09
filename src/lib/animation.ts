import { ColorMode, TimeLeft } from './types';

export function calculateGlowProperties(timeLeft: TimeLeft, colorMode: ColorMode) {
  const totalSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const maxSeconds = 24 * 3600;
  const progress = Math.max(0, Math.min(1, 1 - (totalSeconds / maxSeconds)));

  // Pulse speed increases exponentially as we get closer to the target time
  const basePulseSpeed = 3;
  const minPulseSpeed = 0.5;
  const pulseSpeed = Math.max(
    minPulseSpeed,
    basePulseSpeed - (Math.pow(progress, 2) * (basePulseSpeed - minPulseSpeed))
  );

  let glowColor: string;
  
  if (colorMode === 'monochrome') {
    const lightness = 95 - (progress * 10);
    glowColor = `hsl(0, 0%, ${lightness}%)`;
  } else {
    // Rainbow mode with pastel colors
    const hue = (360 + (progress * 260)) % 360; // Full spectrum rotation
    const saturation = 70 - progress * 20;
    const lightness = 85;
    glowColor = `hsl(${hue}deg, ${saturation}%, ${lightness}%)`;
  }

  // Subtle opacity that increases slightly towards the end
  const baseOpacity = 0.15;
  const maxOpacity = 0.3;
  const glowOpacity = baseOpacity + (progress * (maxOpacity - baseOpacity));

  return {
    pulseSpeed: `${pulseSpeed}s`,
    glowColor,
    glowOpacity,
    intensity: progress,
  };
}