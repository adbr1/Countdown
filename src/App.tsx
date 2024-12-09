import React, { useState } from 'react';
import { DigitalClock } from './components/DigitalClock';
import { TimeInput } from './components/TimeInput';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ThemeToggle } from './components/ThemeToggle';
import { useCountdown } from './hooks/useCountdown';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from './components/ui/toast';
import { Theme } from '@radix-ui/themes';
import { ColorMode } from './lib/types';
import '@radix-ui/themes/styles.css';

function App() {
  const [targetTime, setTargetTime] = useState('12:00');
  const [colorMode, setColorMode] = useState<ColorMode>('rainbow');
  const timeLeft = useCountdown(targetTime);
  const [showToast, setShowToast] = useState(false);

  const handleTimeChange = (newTime: string) => {
    setTargetTime(newTime);
    setShowToast(true);
  };

  return (
    <Theme appearance="dark" accentColor="blue" grayColor="slate">
      <ToastProvider>
        <AnimatedBackground timeLeft={timeLeft} colorMode={colorMode}>
          <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
            {/* Top controls */}
            <div className="absolute top-4 w-full max-w-sm sm:max-w-md mx-auto px-2 sm:px-4 flex flex-col gap-3 sm:gap-4">
              <ThemeToggle 
                colorMode={colorMode} 
                onChange={setColorMode}
              />
              <TimeInput 
                targetTime={targetTime} 
                onTimeChange={handleTimeChange}
              />
            </div>

            {/* Clock */}
            <DigitalClock 
              hours={timeLeft.hours}
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds}
              className="transform-gpu mt-32 sm:mt-24"
            />
          </div>

          <Toast 
            open={showToast} 
            onOpenChange={setShowToast}
            className="bg-black/40 border-white/10 text-white backdrop-blur-lg"
          >
            <ToastTitle className="text-sm sm:text-base text-white">
              Heure mise à jour
            </ToastTitle>
            <ToastDescription className="text-xs sm:text-sm text-white/80">
              Le compte à rebours a été réglé sur {targetTime}
            </ToastDescription>
          </Toast>
          <ToastViewport className="p-2 sm:p-4" />
        </AnimatedBackground>
      </ToastProvider>
    </Theme>
  );
}

export default App;