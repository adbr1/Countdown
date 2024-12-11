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
import { useTimerState } from '../hooks/useTimerState';
import { Timer } from '../types/timer';
import { useNotifications } from '../hooks/useNotifications';
import '../styles/animations.css';

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

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTimerList, setShowTimerList] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMonochrome, setIsMonochrome] = useState(false);
  const [timerToEdit, setTimerToEdit] = useState<Timer | null>(null);

  const { requestNotificationPermission } = useNotifications();

  // Gestionnaire pour la création d'un nouveau timer
  const handleTimerCreate = (timer: Omit<Timer, 'id' | 'createdAt'>) => {
    handleCreateTimer(timer);
    setShowCreateDialog(false);
    setShowToast(true);
  };

  // Gestionnaire pour l'édition d'un timer
  const handleTimerEdit = (timer: Timer) => {
    handleEditTimer(timer);
    setTimerToEdit(null);
    setShowToast(true);
  };

  // Gestionnaire pour la suppression d'un timer
  const handleTimerDelete = (id: string) => {
    handleDeleteTimer(id);
    setShowToast(true);
  };

  const defaultTimeLeft = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
    totalSeconds: 0,
    targetTotalSeconds: 0
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
            onSelectTimer={selectTimerByIndex}
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
            onDelete={handleTimerDelete}
            onClose={() => setShowTimerList(false)}
          />
        )}

        {showCreateDialog && (
          <CreateTimerDialog
            onClose={() => setShowCreateDialog(false)}
            onCreate={handleTimerCreate}
          />
        )}

        {timerToEdit && (
          <EditTimerDialog
            timer={timerToEdit}
            onClose={() => setTimerToEdit(null)}
            onSave={handleTimerEdit}
          />
        )}

        <InstallPWA />
        
        <Toast 
          open={showToast} 
          onOpenChange={setShowToast}
          className="bg-black/40 border-white/10 text-white animate-slide-up"
        >
          <ToastTitle className="text-white">
            {timeLeft.isFinished ? 'Minuteur terminé !' : 'Compteur mis à jour'}
          </ToastTitle>
          <ToastDescription className="text-white/80">
            {timeLeft.isFinished && activeTimer
              ? `Le minuteur "${activeTimer.name}" est terminé`
              : 'Le compteur a été mis à jour avec succès'}
          </ToastDescription>
        </Toast>
        <ToastViewport />
      </Container>
    </AnimatedBackground>
  );
}