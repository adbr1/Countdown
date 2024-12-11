import React from 'react';
import { DynamicTimeDisplay } from './timer/DynamicTimeDisplay';
import { TimerContainer } from './timer/TimerContainer';
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
  showHours: boolean;
  showMinutes: boolean;
  progress: number;
  isCurrentTime?: boolean;
};

export function DigitalClock({ 
  hours, 
  minutes, 
  seconds, 
  title, 
  className,
  showHours,
  showMinutes,
  progress,
  isCurrentTime = false
}: DigitalClockProps) {
  return (
    <TimerContainer 
      title={title}
      progress={progress}
      className={className}
      showHours={showHours}
      showMinutes={showMinutes}
      isCurrentTime={isCurrentTime}
    >
      <DynamicTimeDisplay
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        showHours={showHours}
        showMinutes={showMinutes}
      />
    </TimerContainer>
  );
}