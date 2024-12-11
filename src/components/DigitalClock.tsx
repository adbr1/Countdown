import React from 'react';
import { cn } from '../lib/utils';

type DigitalClockProps = {
  hours: number;
  minutes: number;
  seconds: number;
  title?: string;
  className?: string;
  timeLeft: {
    totalSeconds: number;
    targetTotalSeconds: number;
  };
};

export function DigitalClock({ 
  hours, 
  minutes, 
  seconds, 
  title, 
  className,
  timeLeft
}: DigitalClockProps) {
  // Calcul du pourcentage basé sur le temps total initial
  const percentage = Math.round((timeLeft.totalSeconds / timeLeft.targetTotalSeconds) * 100);

  return (
    <div className={cn(
      "flex flex-col gap-4 group",
      className
    )}>
      {title && (
        <div className="text-xl text-white/90 font-medium text-center mb-2">
          {title}
        </div>
      )}
      <div className={cn(
        "relative font-mono text-6xl sm:text-8xl md:text-9xl bg-black/20 text-white p-8 sm:p-12 rounded-3xl",
        "border border-white/10 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 hover:scale-105 hover:bg-black/30",
        "overflow-hidden"
      )}>
        {/* Barre de progression */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-white/20 transition-all duration-300 group-hover:h-2"
          style={{ width: `${percentage}%` }}
        />

        {/* Pourcentage au survol */}
        <div className="absolute top-4 right-4 text-base font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {percentage}% restants
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <TimeUnit value={hours} label="heures" showPulse={false} />
          <Separator showPulse={false} />
          <TimeUnit value={minutes} label="minutes" showPulse={false} />
          <Separator showPulse={false} />
          <TimeUnit value={seconds} label="secondes" showPulse={false} />
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label, showPulse = true }: { value: number; label: string; showPulse?: boolean }) {
  return (
    <div className="flex flex-col items-center relative group">
      <span className="tabular-nums font-bold tracking-tighter relative">
        {value.toString().padStart(2, '0')}
        {showPulse && (
          <span className="absolute inset-0 animate-pulse opacity-50 blur-sm" 
                aria-hidden="true">
            {value.toString().padStart(2, '0')}
          </span>
        )}
      </span>
      <span className="text-xs sm:text-base mt-2 sm:mt-4 text-white/60 font-light tracking-wider">
        {label}
      </span>
    </div>
  );
}

function Separator({ showPulse = true }: { showPulse?: boolean }) {
  return (
    <div className={cn(
      "text-4xl sm:text-7xl md:text-8xl self-start mt-2 text-white/40",
      showPulse && "animate-pulse"
    )}>:</div>
  );
}