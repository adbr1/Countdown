import React, { useState } from 'react';
import { Calendar, Menu, Palette, Plus, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useFullscreen } from '../hooks/useFullscreen';

interface TimerControlsProps {
  isMonochrome: boolean;
  onToggleMonochrome: () => void;
  onOpenTimerList: () => void;
  onCreateTimer: () => void;
  onToggleCalendar: () => void;
  onOpenICalDialog: () => void;
  showEvents: boolean;
  hasEvents: boolean;
  className?: string;
}

export function TimerControls({
  isMonochrome,
  onToggleMonochrome,
  onOpenTimerList,
  onCreateTimer,
  onToggleCalendar,
  onOpenICalDialog,
  showEvents,
  hasEvents,
  className
}: TimerControlsProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const handleCalendarClick = () => {
    if (hasEvents) {
      onToggleCalendar();
    } else {
      onOpenICalDialog();
    }
  };

  return (
    <div className={cn(
      "fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 z-20",
      "bg-black/30 backdrop-blur-md rounded-full p-1 sm:p-2 shadow-lg",
      "border border-white/10 scale-90 sm:scale-100",
      className
    )}>
      <button
        onClick={onOpenTimerList}
        className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
        title="Liste des compteurs"
      >
        <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
      </button>

      <div className="w-px h-4 sm:h-6 bg-white/10" />

      <button
        onClick={onToggleMonochrome}
        className={cn(
          "p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors",
          isMonochrome && "bg-white/10"
        )}
        title={isMonochrome ? "Mode couleur" : "Mode monochrome"}
      >
        <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
      </button>

      <div className="w-px h-4 sm:h-6 bg-white/10" />

      <button
        onClick={toggleFullscreen}
        className={cn(
          "p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors",
          isFullscreen && "bg-white/10"
        )}
        title={isFullscreen ? "Quitter le plein écran" : "Mode plein écran"}
      >
        {isFullscreen ? (
          <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
        ) : (
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
        )}
      </button>

      <div className="w-px h-4 sm:h-6 bg-white/10" />

      <button
        onClick={handleCalendarClick}
        className={cn(
          "p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors",
          (showEvents && hasEvents) && "bg-white/10"
        )}
        title={hasEvents ? "Afficher/Masquer le calendrier" : "Importer un calendrier"}
      >
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
      </button>

      <div className="w-px h-4 sm:h-6 bg-white/10" />

      <button
        onClick={onCreateTimer}
        className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
        title="Nouveau compteur"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
      </button>
    </div>
  );
}