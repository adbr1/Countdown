import { Clock } from 'lucide-react';
import { isSameDay, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getEventDuration } from '../../lib/event-utils';
import { formatTimeRange, formatDuration } from '../../lib/utils/format';

interface EventTimeProps {
  start: Date;
  end: Date;
}

export function EventTime({ start, end }: EventTimeProps) {
  const duration = getEventDuration({ start, end } as any);
  
  return (
    <div className="flex items-center gap-2 text-white/60 text-sm">
      <Clock className="w-4 h-4 shrink-0" />
      <div className="flex flex-col">
        <span>{formatTimeRange(start, end)}</span>
        <span className="text-xs text-white/40">
          {formatDuration(duration)}
          {!isSameDay(start, end) && (
            <span className="ml-1">
              (jusqu'au {format(end, 'dd/MM', { locale: fr })})
            </span>
          )}
        </span>
      </div>
    </div>
  );
}