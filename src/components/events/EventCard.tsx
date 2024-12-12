import { cn } from '../../lib/utils';
import type { Event } from '../../lib/event-utils';
import { EventTime } from './EventTime';
import { EventLocation } from './EventLocation';
import { isEventInProgress, isEventPast, isEventUpcoming } from '../../lib/event-utils';

interface EventCardProps {
  event: Event;
  onEventClick?: (event: Event) => void;
}

export function EventCard({ event, onEventClick }: EventCardProps) {
  const isInProgress = isEventInProgress(event);
  const isPast = isEventPast(event);
  const isUpcoming = isEventUpcoming(event);

  return (
    <div
      onClick={() => onEventClick?.(event)}
      className={cn(
        "rounded-lg p-4 transition-colors relative overflow-hidden",
        "cursor-pointer transform transition-transform duration-200",
        "hover:scale-[1.02]",
        isInProgress && "bg-white/20 hover:bg-white/25",
        isPast && "bg-white/5 hover:bg-white/10 opacity-60",
        isUpcoming && "bg-white/10 hover:bg-white/15"
      )}
    >
      {/* Indicateur de statut */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1",
        isInProgress && "bg-green-400",
        isPast && "bg-gray-400",
        isUpcoming && "bg-blue-400"
      )} />

      <div className="pl-3">
        <div className="font-medium text-white mb-2 line-clamp-2">
          {event.summary}
          {isInProgress && (
            <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
              En cours
            </span>
          )}
        </div>
        <div className="space-y-1">
          <EventTime start={event.start} end={event.end} />
          {event.location && <EventLocation location={event.location} />}
        </div>
      </div>
    </div>
  );
}