import React from 'react';
import { Calendar, X } from 'lucide-react';
import { Label } from './ui/label';
import { useCalendarUrl } from '../hooks/useCalendarUrl';

interface ICalImportDialogProps {
  onClose: () => void;
  onImport: (calendarUrl: string) => Promise<void>;
}

export function ICalImportDialog({ onClose, onImport }: ICalImportDialogProps) {
  const { calendarUrl, setCalendarUrl } = useCalendarUrl();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onImport(calendarUrl);
      onClose();
    } catch (err) {
      setError('Erreur lors de l\'importation du calendrier');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Importer un calendrier
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
            <Label htmlFor="ical-url" className="text-white/80">
              URL du calendrier iCal
            </Label>
            <input
              id="ical-url"
              type="url"
              value={calendarUrl}
              onChange={(e) => setCalendarUrl(e.target.value)}
              className="w-full mt-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white"
              placeholder="https://exemple.com/calendar.ics"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}
          
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
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Importation...' : 'Importer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}