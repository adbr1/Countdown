import React, { useState } from 'react';
import { Timer } from '../types/timer';
import { Clock, X } from 'lucide-react';
import { Label } from './ui/label';

interface EditTimerDialogProps {
  timer: Timer;
  onClose: () => void;
  onSave: (timer: Timer) => void;
}

export function EditTimerDialog({ timer, onClose, onSave }: EditTimerDialogProps) {
  const [name, setName] = useState(timer.name);
  const [time, setTime] = useState(timer.targetTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...timer, name, targetTime: time });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Modifier le compteur
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white/80">
              Nom du compteur
            </Label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
              placeholder="Mon compteur"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="time" className="text-white/80">
              Heure cible
            </Label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full mt-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}