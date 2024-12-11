import React from 'react';
import { motion } from 'framer-motion';
import { TimeUnit } from './TimeUnit';
import { cn } from '../../lib/utils';

interface DynamicTimeDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  showHours: boolean;
  showMinutes: boolean;
  className?: string;
}

export function DynamicTimeDisplay({ 
  hours, 
  minutes, 
  seconds,
  showHours,
  showMinutes,
  className 
}: DynamicTimeDisplayProps) {
  return (
    <motion.div
      layout
      className={cn(
        "flex items-center justify-center",
        className
      )}
    >
      <TimeUnit
        value={hours}
        label="heures"
        show={showHours}
        showHours={showHours}
        showMinutes={showMinutes}
      />
      <TimeUnit
        value={minutes}
        label="minutes"
        show={showMinutes}
        showHours={showHours}
        showMinutes={showMinutes}
      />
      <TimeUnit
        value={seconds}
        label="secondes"
        show={true}
        isLast={true}
        showHours={showHours}
        showMinutes={showMinutes}
      />
    </motion.div>
  );
}