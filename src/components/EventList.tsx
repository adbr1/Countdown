import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { filterTodayEvents } from '../lib/event-utils';
import type { Event } from '../lib/event-utils';

interface EventListProps {
  events: Event[];
  className?: string;
}

export function EventList({ events, className }: EventListProps) {
  const todayEvents = filterTodayEvents(events);

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-20 right-4 w-96 max-h-[calc(100vh-6rem)]",
        "bg-black/30 backdrop-blur-md rounded-xl border border-white/10",
        "overflow-hidden shadow-xl",
        className
      )}
    >
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-white/60" />
        <h3 className="text-lg font-medium text-white">Événements du jour</h3>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-10rem)] p-4">
        {todayEvents.length === 0 ? (
          <div className="text-white/60 text-center py-4">
            Aucun événement prévu aujourd'hui
          </div>
        ) : (
          <div className="space-y-3">
            {todayEvents.map((event, index) => (
              <div 
                key={index}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="font-medium text-white mb-2">{event.summary}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{format(event.start, 'HH:mm', { locale: fr })}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}