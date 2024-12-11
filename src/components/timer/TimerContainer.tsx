import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface TimerContainerProps {
  children: React.ReactNode;
  title?: string;
  progress: number;
  className?: string;
  showHours: boolean;
  showMinutes: boolean;
  isCurrentTime?: boolean;
}

export function TimerContainer({ 
  children, 
  title, 
  progress, 
  className,
  showHours,
  showMinutes,
  isCurrentTime = false
}: TimerContainerProps) {
  return (
    <div className={cn(
      "flex flex-col gap-2 group w-full mx-auto px-4",
      showHours ? "max-w-xl" : showMinutes ? "max-w-lg" : "max-w-md",
      className
    )}>
      {title && (
        <div className="text-xl md:text-2xl text-white/90 font-medium text-center mb-2">
          {title}
        </div>
      )}
      <motion.div
        layout
        className={cn(
          "relative bg-black/20 text-white rounded-3xl",
          "border border-white/10 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.3)]",
          "transition-all duration-300 hover:scale-105 hover:bg-black/30",
          "overflow-hidden"
        )}
      >
        {/* Progress bar (only for timers, not for clock) */}
        {!isCurrentTime && (
          <div 
            className="absolute bottom-0 left-0 h-1 bg-white/20 transition-all duration-300 group-hover:h-2"
            style={{ width: `${progress}%` }}
          />
        )}

        {/* Percentage on hover (only for timers, not for clock) */}
        {!isCurrentTime && (
          <div className="absolute top-4 right-4 text-sm md:text-base font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {progress}% restants
          </div>
        )}

        {/* Adaptive content */}
        <div className={cn(
          "transition-all duration-300",
          showHours 
            ? "p-4 sm:p-6 md:p-8" // Large padding for hours + minutes + seconds
            : showMinutes 
              ? "p-3 sm:p-5 md:p-7" // Medium padding for minutes + seconds
              : "p-2 sm:p-4 md:p-6" // Small padding for seconds only
        )}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}