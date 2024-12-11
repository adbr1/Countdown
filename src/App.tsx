import React from 'react';
import { Theme } from '@radix-ui/themes';
import { ToastProvider } from './components/ui/toast';
import { TimerApp } from './components/TimerApp';
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <Theme appearance="dark" accentColor="blue" grayColor="slate">
      <ToastProvider>
        <TimerApp />
      </ToastProvider>
    </Theme>
  );
}

export default App;