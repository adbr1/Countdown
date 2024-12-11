import React from 'react';
import { useBreathingAnimation } from '../hooks/useBreathingAnimation';
import { cn } from '../lib/utils';
import { TimeLeft } from '../lib/time';

type AnimatedBackgroundProps = {
  timeLeft: TimeLeft;
  children: React.ReactNode;
  isMonochrome?: boolean;
};

export function AnimatedBackground({ timeLeft, children, isMonochrome }: AnimatedBackgroundProps) {
  const { breathDuration, baseColor, intensity } = useBreathingAnimation({
    timeLeft,
    startColor: '#a8e6a3',  // Vert pastel
    endColor: '#ff4c4c',    // Rouge intense
    maxBreathDuration: 5,   // 5 secondes au début
    minBreathDuration: 0.5  // 0.5 secondes à la fin
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fond animé */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          backgroundColor: isMonochrome ? '#18181b' : baseColor,
        }}
      >
        {/* Effet de respiration */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-white/20 to-transparent",
            "transition-opacity duration-1000"
          )}
          style={{
            animation: `breathe ${breathDuration} ease-in-out infinite`,
          }}
        />

        {/* Vagues d'animation */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
              ${isMonochrome ? 'white' : baseColor} 0%, 
              transparent 60%
            )`,
            animation: `pulse ${breathDuration} ease-in-out infinite`,
          }}
        />
      </div>

      {/* Overlay pour assurer la lisibilité */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        style={{
          opacity: Math.min(0.4, intensity * 0.6)
        }}
      />

      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}