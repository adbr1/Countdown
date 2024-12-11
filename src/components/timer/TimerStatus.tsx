import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimerStatusProps {
  isFinished: boolean;
  message: string | null;
  className?: string;
}

export function TimerStatus({ isFinished, message, className }: TimerStatusProps) {
  if (!isFinished || !message) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={cn(
        "text-4xl sm:text-6xl md:text-7xl lg:text-8xl",
        "font-bold text-white text-center",
        className
      )}
    >
      {message}
    </motion.div>
  );
}