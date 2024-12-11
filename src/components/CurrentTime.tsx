import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function CurrentTime() {
  const { time, date } = useCurrentTime();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md rounded-xl p-3 border border-white/10 text-white"
    >
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-white/60" />
        <div className="text-center">
          <div className="text-lg font-medium">{time}</div>
          <div className="text-sm text-white/60 capitalize">{date}</div>
        </div>
      </div>
    </motion.div>
  );
}