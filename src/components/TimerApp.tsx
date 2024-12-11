import React, { useState, useEffect } from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { TimerControls } from './TimerControls';
import { TimerListDialog } from './TimerListDialog';
import { CreateTimerDialog } from './CreateTimerDialog';
import { EditTimerDialog } from './EditTimerDialog';
import { TimerDisplay } from './TimerDisplay';
import { Toast, ToastTitle, ToastDescription, ToastViewport } from './ui/toast';
import { useTimerState } from '../hooks/useTimerState';
import { Timer } from '../types/timer';

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
    currentIndex
  } = useTimerState();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTimerList, setShowTimerList] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [timerToEdit, setTimerToEdit] = useState<Timer | null>(null);

  useEffect(() => {
    if (timeLeft.isFinished && activeTimer) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Minuteur terminé !', {
          body: `Le minuteur "${activeTimer.name}" est terminé`,
          icon: '/icon.svg'
        });
      }
      setShowToast(true);
    }
  }, [timeLeft.isFinished, activeTimer]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <AnimatedBackground 
      timeLeft={activeTimer ? timeLeft : { hours: 0, minutes: 0, seconds: 0, isFinished: false, totalSeconds: 0 }} 
      isMonochrome={isMonochrome}
    >
      <TimerControls
        isMonochrome={isMonochrome}
        onToggleMonochrome={() => setIsMonochrome(!isMonochrome)}
        onOpenTimerList={() => setShowTimerList(true)}
        onCreateTimer={() => setShowCreateDialog(true)}
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <TimerDisplay
          timer={activeTimer}
          timeLeft={timeLeft}
          onPrevTimer={previousTimer}
          onNextTimer={nextTimer}
          hasMultipleTimers={timers.length > 1}
          currentIndex={currentIndex}
          totalTimers={timers.length}
        />
      </div>

      {showTimerList && (
        <TimerListDialog
          timers={timers}
          activeTimerId={activeTimer?.id || null}
          onSelect={(timer) => {
            setActiveTimerId(timer.id);
            setShowTimerList(false);
          }}
          onEdit={setTimerToEdit}
          onDelete={handleDeleteTimer}
          onClose={() => setShowTimerList(false)}
        />
      )}

      {showCreateDialog && (
        <CreateTimerDialog
          onClose={() => setShowCreateDialog(false)}
          onCreate={(timer) => {
            handleCreateTimer(timer);
            setShowToast(true);
          }}
        />
      )}

      {timerToEdit && (
        <EditTimerDialog
          timer={timerToEdit}
          onClose={() => setTimerToEdit(null)}
          onSave={(timer) => {
            handleEditTimer(timer);
            setShowToast(true);
          }}
        />
      )}

      <Toast 
        open={showToast} 
        onOpenChange={setShowToast}
        className="bg-black/40 border-white/10 text-white"
      >
        <ToastTitle className="text-white">
          {timeLeft.isFinished ? 'Minuteur terminé !' : 'Compteur mis à jour'}
        </ToastTitle>
        <ToastDescription className="text-white/80">
          {timeLeft.isFinished
            ? `Le minuteur "${activeTimer?.name}" est terminé`
            : 'Le compteur a été mis à jour avec succès'}
        </ToastDescription>
      </Toast>
      <ToastViewport />
    </AnimatedBackground>
  );
}