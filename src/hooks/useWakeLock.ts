import { useState, useEffect } from 'react';

export function useWakeLock() {
  const [isWakeLockEnabled, setIsWakeLockEnabled] = useState(false);

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      try {
        // Seulement demander le wakeLock si la page est visible
        if (document.visibilityState === 'visible') {
          wakeLock = await navigator.wakeLock.request('screen');
          setIsWakeLockEnabled(true);
        }
      } catch (err) {
        console.warn('Wake Lock non disponible:', err);
        setIsWakeLockEnabled(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    // Initialisation
    requestWakeLock();
    
    // Gestionnaires d'événements
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) {
        wakeLock.release().catch(console.warn);
      }
    };
  }, []);

  return isWakeLockEnabled;
}