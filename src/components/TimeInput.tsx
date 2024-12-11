import React from 'react';
import { Clock } from 'lucide-react';
import { Label } from './ui/label';
import { cn } from '../lib/utils';

type TimeInputProps = {
  targetTime: string;
  onTimeChange: (time: string) => void;
  className?: string;
};

export function TimeInput({ targetTime, onTimeChange, className }: TimeInputProps) {
  return (
    <div className={cn(
      "flex flex-col gap-2 bg-black/20 backdrop-blur-lg p-6 rounded-xl",
      "border border-white/10 transition-all duration-300 hover:bg-black/30",
      className
    )}>
      <Label htmlFor="time-input" className="text-white/80 text-sm">
        Choisissez l'heure cible
      </Label>
      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-md">
        <Clock className="text-white/60 h-5 w-5" />
        <input
          id="time-input"
          type="time"
          value={targetTime}
          onChange={(e) => onTimeChange(e.target.value)}
          className={cn(
            "bg-transparent text-white border-0 text-lg",
            "focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md px-2 py-1",
            "appearance-none hover:bg-white/5 transition-colors"
          )}
        />
      </div>
    </div>
  );
}