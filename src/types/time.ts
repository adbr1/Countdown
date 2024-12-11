export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
  totalSeconds: number;
  targetTotalSeconds: number;
}

export interface TimerDisplay {
  isCurrentTime: boolean;
  progress: number;
  status: {
    isFinished: boolean;
    message: string | null;
  };
  displayHours: boolean;
  displayMinutes: boolean;
}