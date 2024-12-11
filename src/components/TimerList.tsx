import React from 'react';
import { Timer } from '../types/timer';
import { Clock, Trash2 } from 'lucide-react';

interface TimerListProps {
  timers: Timer[];
  activeTimerId: string | null;
  onSelect: (timer: Timer) => void;
  onDelete: (id: string) => void;
}

export function TimerList({ timers, activeTimerId, onSelect, onDelete }: TimerListProps) {
  if (timers.length === 0) {
    return (
      <div className="text-white/60 text-center p-4">
        Aucun compteur créé
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {timers.map((timer) => (
        <div
          key={timer.id}
          className={`
            flex items-center justify-between p-3 rounded-lg
            transition-all duration-200 cursor-pointer
            ${activeTimerId === timer.id 
              ? 'bg-white/20 shadow-lg' 
              : 'bg-black/20 hover:bg-white/10'}
          `}
          onClick={() => onSelect(timer)}
        >
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-white/60" />
            <div>
              <div className="text-white font-medium">{timer.name}</div>
              <div className="text-sm text-white/60">{timer.targetTime}</div>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(timer.id);
            }}
            className="p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white/60" />
          </button>
        </div>
      ))}
    </div>
  );
}