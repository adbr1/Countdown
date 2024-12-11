import { useEffect, useState } from 'react';

export function useWakeLock() {
  const [isWakeLockEnabled, setIsWakeLockEnabled] = useState(false);

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        setIsWakeLockEnabled(true);
      } catch (err) {
        console.error('Failed to request wake lock:', err);
        setIsWakeLockEnabled(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    requestWakeLock();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);

  return isWakeLockEnabled;
}