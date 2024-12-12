import { MapPin } from 'lucide-react';

interface EventLocationProps {
  location: string;
}

export function EventLocation({ location }: EventLocationProps) {
  return (
    <div className="flex items-center gap-2 text-white/60 text-sm">
      <MapPin className="w-4 h-4 shrink-0" />
      <span className="line-clamp-1">{location}</span>
    </div>
  );
}