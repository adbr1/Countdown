import React from 'react';
import { Timer } from '../types/timer';
import { Clock, Pencil, Trash2, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface TimerListDialogProps {
  timers: Timer[];
  activeTimerId: string | null;
  onSelect: (timer: Timer) => void;
  onEdit: (timer: Timer) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function TimerListDialog({
  timers,
  activeTimerId,
  onSelect,
  onEdit,
  onDelete,
  onClose
}: TimerListDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50">
      <div className="bg-slate-900/90 backdrop-blur-lg rounded-2xl w-full max-w-md mt-16 border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Mes compteurs
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {timers.length === 0 ? (
            <div className="text-white/60 text-center py-8">
              Aucun compteur créé
            </div>
          ) : (
            <div className="space-y-2">
              {timers.map((timer) => (
                <div
                  key={timer.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl",
                    "transition-all duration-200 cursor-pointer",
                    "hover:bg-white/5",
                    activeTimerId === timer.id ? "bg-white/10 shadow-lg" : "bg-black/20"
                  )}
                  onClick={() => {
                    onSelect(timer);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{timer.name}</div>
                      <div className="text-sm text-white/60">{timer.targetTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(timer);
                      }}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-white/60" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(timer.id);
                      }}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}