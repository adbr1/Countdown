import React, { useState } from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { TimerControls } from './TimerControls';
import { TimerListDialog } from './TimerListDialog';
import { CreateTimerDialog } from './CreateTimerDialog';
import { EditTimerDialog } from './EditTimerDialog';
import { TimerDisplay } from './TimerDisplay';
import { Toast, ToastTitle, ToastDescription, ToastViewport } from './ui/toast';
import { InstallPWA } from './InstallPWA';
import { Container } from './layout/Container';
import { EventList } from './events/EventList';
import { ICalImportDialog } from './ICalImportDialog';
import { useTimerState } from '../hooks/useTimerState';
import { useCalendar } from '../hooks/useCalendar';
import { Timer } from '../types/timer';
import { useNotifications } from '../hooks/useNotifications';
import { cn } from '../lib/utils';
import { Event } from '../types/event';
import { createTimerFromEvent } from '../lib/event-to-timer';
import '../styles/animations.css';

const defaultTimeLeft = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  isFinished: false,
  totalSeconds: 0,
  targetTotalSeconds: 0
};

export function TimerApp() {
  const {
    timers,
    activeTimer,
    timeLeft,
    handleCreateTimer,
    handleEditTimer,
    handleDeleteTimer,
    setActiveTimerId,
    nextTimer,
    previousTimer,
    currentIndex,
    selectTimerByIndex
  } = useTimerState();

  const {
    events,
    showEvents,
    showICalDialog,
    hasEvents,
    handleImportEvents,
    handleCalendarToggle,
    setShowICalDialog
  } = useCalendar();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTimerList, setShowTimerList] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [timerToEdit, setTimerToEdit] = useState<Timer | null>(null);

  const { requestNotificationPermission } = useNotifications();

  const handleEventClick = (event: Event) => {
    const newTimer = createTimerFromEvent(event);
    handleCreateTimer(newTimer);
    setShowToast(true);
  };

  return (
    <AnimatedBackground 
      timeLeft={activeTimer ? timeLeft : defaultTimeLeft} 
      isMonochrome={isMonochrome}
    >
      <Container>
        <TimerControls
          isMonochrome={isMonochrome}
          onToggleMonochrome={() => setIsMonochrome(!isMonochrome)}
          onOpenTimerList={() => setShowTimerList(true)}
          onCreateTimer={() => setShowCreateDialog(true)}
          onToggleCalendar={handleCalendarToggle}
          onOpenICalDialog={() => setShowICalDialog(true)}
          showEvents={showEvents}
          hasEvents={hasEvents}
        />

        <div className={cn(
          "min-h-screen flex items-center justify-center p-4",
          showEvents && events.length > 0 ? "pr-[420px]" : ""
        )}>
          <TimerDisplay
            timer={activeTimer}
            timeLeft={timeLeft}
            onPrevTimer={previousTimer}
            onNextTimer={nextTimer}
            hasMultipleTimers={timers.length > 1}
            currentIndex={currentIndex}
            totalTimers={timers.length}
            onSelectTimer={selectTimerByIndex}
          />
        </div>

        {showEvents && events.length > 0 && (
          <EventList 
            events={events}
            onEventClick={handleEventClick}
            className="animate-slide-in-from-right"
          />
        )}

        {/* Dialogs */}
        {showCreateDialog && (
          <CreateTimerDialog
            onClose={() => setShowCreateDialog(false)}
            onCreate={handleCreateTimer}
          />
        )}

        {showTimerList && (
          <TimerListDialog
            timers={timers}
            activeTimerId={activeTimer?.id}
            onSelect={(timer) => {
              setActiveTimerId(timer.id);
              setShowTimerList(false);
            }}
            onEdit={(timer) => {
              setTimerToEdit(timer);
              setShowTimerList(false);
            }}
            onDelete={handleDeleteTimer}
            onClose={() => setShowTimerList(false)}
          />
        )}

        {timerToEdit && (
          <EditTimerDialog
            timer={timerToEdit}
            onClose={() => setTimerToEdit(null)}
            onSave={(updatedTimer) => {
              handleEditTimer(updatedTimer);
              setTimerToEdit(null);
            }}
          />
        )}

        {showICalDialog && (
          <ICalImportDialog
            onClose={() => setShowICalDialog(false)}
            onImport={handleImportEvents}
          />
        )}
        
        <InstallPWA />
        
        <Toast 
          open={showToast} 
          onOpenChange={setShowToast}
          className="bg-black/40 border-white/10 text-white animate-slide-up"
        >
          <ToastTitle className="text-white">
            Nouveau compteur créé
          </ToastTitle>
          <ToastDescription className="text-white/80">
            Le compteur a été créé à partir de l'événement sélectionné
          </ToastDescription>
        </Toast>
        <ToastViewport />
      </Container>
    </AnimatedBackground>
  );
}