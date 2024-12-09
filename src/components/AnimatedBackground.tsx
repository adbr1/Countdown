import React from 'react';
import { ColorMode, TimeLeft } from '../lib/types';
import { calculateGlowProperties } from '../lib/animation';

type AnimatedBackgroundProps = {
  timeLeft: TimeLeft;
  colorMode: ColorMode;
  children: React.ReactNode;
};

export function AnimatedBackground({ timeLeft, colorMode, children }: AnimatedBackgroundProps) {
  const { pulseSpeed, glowColor, glowOpacity } = calculateGlowProperties(timeLeft, colorMode);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Static background glow */}
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 100%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Pulsing overlay */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 100%)`,
          opacity: glowOpacity * 0.8,
          animation: `pulse ${pulseSpeed} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
        }}
      />

      {children}
    </div>
  );
}