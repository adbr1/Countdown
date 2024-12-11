import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimerProgressProps {
  progress: number;
  className?: string;
}

export function TimerProgress({ progress, className }: TimerProgressProps) {
  return (
    <div className={cn(
      "absolute bottom-0 left-0 h-1 bg-white/10 w-full",
      "group-hover:h-2 transition-all duration-300",
      className
    )}>
      <motion.div
        className="h-full bg-white/20"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}