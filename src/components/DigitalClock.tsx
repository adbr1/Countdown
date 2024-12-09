import React from 'react';
import { cn } from '../lib/utils';

type DigitalClockProps = {
  hours: number;
  minutes: number;
  seconds: number;
  className?: string;
};

export function DigitalClock({ hours, minutes, seconds, className }: DigitalClockProps) {
  return (
    <div className={cn(
      "font-mono text-6xl sm:text-8xl md:text-9xl bg-black/20 text-white",
      "p-6 sm:p-8 md:p-12 rounded-3xl select-none",
      "border border-white/10 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.3)]",
      "transition-all duration-300 hover:scale-105",
      className
    )}>
      <div className="flex items-center gap-3 sm:gap-6">
        <TimeUnit value={hours} label="heures" />
        <Separator />
        <TimeUnit value={minutes} label="minutes" />
        <Separator />
        <TimeUnit value={seconds} label="secondes" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center relative group">
      <span className="tabular-nums font-bold tracking-tighter relative">
        {value.toString().padStart(2, '0')}
        <span className="absolute inset-0 animate-pulse opacity-50 blur-sm" 
              aria-hidden="true">
          {value.toString().padStart(2, '0')}
        </span>
      </span>
      <span className="text-xs sm:text-sm mt-2 sm:mt-4 text-white/60 font-light tracking-wider">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-4xl sm:text-7xl md:text-8xl self-start mt-1 sm:mt-2 text-white/40 animate-pulse">:</div>
  );
}