import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitalClock } from './DigitalClock';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { Timer } from '../types/timer';
import { cn } from '../lib/utils';

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
}

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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function TimerDisplay({ 
  timer, 
  timeLeft, 
  onPrevTimer, 
  onNextTimer, 
  hasMultipleTimers,
  currentIndex,
  totalTimers
}: TimerDisplayProps) {
  const currentTime = useCurrentTime();
  const [[page, direction], setPage] = React.useState([0, 0]);

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      onNextTimer();
    } else {
      onPrevTimer();
    }
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-full h-[300px]">
          <AnimatePresence initial={false} custom={direction}>
            {!timer ? (
              <motion.div
                key="current-time"
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
                className="absolute inset-0 flex justify-center"
              >
                <DigitalClock
                  hours={parseInt(currentTime.time.split(':')[0])}
                  minutes={parseInt(currentTime.time.split(':')[1])}
                  seconds={parseInt(currentTime.time.split(':')[2])}
                  title="Heure actuelle"
                  timeLeft={{ totalSeconds: 0, targetTotalSeconds: 1 }}
                  className="transform-gpu"
                />
              </motion.div>
            ) : timeLeft.isFinished ? (
              <motion.div
                key="finished"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-4xl sm:text-6xl font-bold text-white mb-4"
                  >
                    Temps écoulé !
                  </motion.div>
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
                className="absolute inset-0 flex justify-center"
              >
                <DigitalClock
                  hours={timeLeft.hours}
                  minutes={timeLeft.minutes}
                  seconds={timeLeft.seconds}
                  title={timer.name}
                  timeLeft={timeLeft}
                  className="transform-gpu"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {hasMultipleTimers && (
          <div className="flex gap-2 mt-16">
            {Array.from({ length: totalTimers }).map((_, index) => (
              <motion.div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-white/90 scale-125" 
                    : "bg-white/30 hover:bg-white/50"
                )}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: index === currentIndex ? 1.25 : 1 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}