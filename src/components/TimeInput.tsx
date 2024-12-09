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
      "flex flex-col gap-3 bg-black/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl w-full",
      "border border-white/10 transition-all duration-300",
      "hover:bg-black/50 hover:border-white/20",
      "sm:flex-row sm:items-center sm:gap-6",
      className
    )}>
      <div className="flex items-center gap-3 text-white/80">
        <Clock className="h-4 sm:h-5 w-4 sm:w-5" />
        <Label htmlFor="time-input" className="text-xs sm:text-sm font-medium">
          Heure cible
        </Label>
      </div>
      
      <input
        id="time-input"
        type="time"
        value={targetTime}
        onChange={(e) => onTimeChange(e.target.value)}
        className={cn(
          "flex-1 bg-black/20 text-white border-0 text-base sm:text-lg w-full",
          "focus:outline-none focus:ring-2 focus:ring-white/20 rounded-xl px-3 py-2 sm:px-4",
          "appearance-none hover:bg-black/30 transition-colors"
        )}
      />
    </div>
  );
}