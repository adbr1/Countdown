import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitalClock } from './DigitalClock';
import { Timer } from '../types/timer';
import { cn } from '../lib/utils';
import { useTimerDisplay } from '../hooks/useTimerDisplay';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const finishedVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface TimerDisplayProps {
  timer: Timer | null;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
    totalSeconds: number;
    targetTotalSeconds: number;
  };
  onPrevTimer: () => void;
  onNextTimer: () => void;
  hasMultipleTimers: boolean;
  currentIndex: number;
  totalTimers: number;
  onSelectTimer?: (index: number) => void;
}

export function TimerDisplay({ 
  timer, 
  timeLeft, 
  onPrevTimer, 
  onNextTimer, 
  hasMultipleTimers,
  currentIndex,
  totalTimers,
  onSelectTimer
}: TimerDisplayProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const timerDisplay = timer ? useTimerDisplay(timer, timeLeft) : null;

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      onNextTimer();
    } else {
      onPrevTimer();
    }
    setPage([page + newDirection, newDirection]);
  };

  const handleDotClick = (index: number) => {
    if (onSelectTimer) {
      onSelectTimer(index);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px]">
          <AnimatePresence initial={false} custom={direction}>
            {!timer ? (
              <motion.div
                key="empty-state"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex justify-center items-center px-4"
              >
                <div className="text-white/60 text-lg sm:text-xl text-center">
                  Aucun compteur sélectionné
                </div>
              </motion.div>
            ) : timerDisplay?.status.isFinished ? (
              <motion.div
                key="finished"
                variants={finishedVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex justify-center items-center px-4"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white">
                    {timerDisplay.status.message}
                  </div>
                  <div className="mt-4 text-base sm:text-lg md:text-xl text-white/60">
                    {timer.name}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={timer.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag={hasMultipleTimers ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 flex justify-center items-center"
              >
                <DigitalClock
                  hours={timeLeft.hours}
                  minutes={timeLeft.minutes}
                  seconds={timeLeft.seconds}
                  title={timer.name}
                  timeLeft={{
                    totalSeconds: timeLeft.totalSeconds,
                    targetTotalSeconds: timeLeft.targetTotalSeconds
                  }}
                  showHours={timerDisplay.displayHours}
                  showMinutes={timerDisplay.displayMinutes}
                  progress={timerDisplay.progress}
                  isCurrentTime={timerDisplay.isCurrentTime}
                  className="transform-gpu"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timer dots navigation */}
        {hasMultipleTimers && (
          <div className="flex gap-2 mt-4 sm:mt-6 md:mt-8">
            {Array.from({ length: totalTimers }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 cursor-pointer",
                  index === currentIndex 
                    ? "bg-white/90 scale-125" 
                    : "bg-white/30 hover:bg-white/50"
                )}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: index === currentIndex ? 1.25 : 1 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}