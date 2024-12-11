import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimeUnitProps {
  value: number;
  label: string;
  show: boolean;
  isLast?: boolean;
  showHours: boolean;
  showMinutes: boolean;
}

export function TimeUnit({ 
  value, 
  label, 
  show, 
  isLast = false,
  showHours,
  showMinutes
}: TimeUnitProps) {
  const isSecondsOnly = isLast && !showHours && !showMinutes;
  const digits = value.toString().padStart(2, '0');

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center"
        >
          <div className="flex flex-col items-center">
            <div className={cn(
              "flex justify-center tabular-nums font-bold tracking-tighter transition-all duration-300",
              isSecondsOnly ? "text-7xl sm:text-8xl md:text-9xl" : "text-6xl sm:text-7xl md:text-8xl",
              "min-w-[1.1em]" // Garantit une largeur minimale pour les chiffres
            )}>
              {digits.split('').map((digit, index) => (
                <span 
                  key={index}
                  className="inline-block w-[0.55em]" // Largeur fixe pour chaque chiffre
                >
                  {digit}
                </span>
              ))}
            </div>
            <span className={cn(
              "text-white/60 font-light tracking-wider transition-all duration-300",
              isSecondsOnly ? "text-sm sm:text-base" : "text-xs sm:text-sm"
            )}>
              {label}
            </span>
          </div>
          {!isLast && (
            <span className={cn(
              "mx-2 sm:mx-4 text-white/40 self-start transition-all duration-300",
              isSecondsOnly ? "text-5xl sm:text-6xl md:text-7xl mt-4" : "text-4xl sm:text-5xl md:text-6xl mt-4"
            )}>
              :
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}