import React from 'react';
import { Moon, Palette } from 'lucide-react';
import { ColorMode } from '../lib/types';
import { cn } from '../lib/utils';

type ThemeToggleProps = {
  colorMode: ColorMode;
  onChange: (mode: ColorMode) => void;
  className?: string;
};

export function ThemeToggle({ colorMode, onChange, className }: ThemeToggleProps) {
  return (
    <div className={cn(
      "flex gap-1 sm:gap-2 bg-white/5 rounded-full p-1",
      "max-w-fit mx-auto",
      className
    )}>
      <button
        onClick={() => onChange('monochrome')}
        className={cn(
          "flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all",
          colorMode === 'monochrome' ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
        )}
      >
        <Moon size={16} />
        <span className="text-xs sm:text-sm">Mono</span>
      </button>
      <button
        onClick={() => onChange('rainbow')}
        className={cn(
          "flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all",
          colorMode === 'rainbow' ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
        )}
      >
        <Palette size={16} />
        <span className="text-xs sm:text-sm">Rainbow</span>
      </button>
    </div>
  );
}