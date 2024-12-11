import { useEffect } from 'react';

export function useNotifications() {
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('Ce navigateur ne supporte pas les notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return {
    requestNotificationPermission
  };
}