import { useRef, useEffect } from 'react';

import { PomodoroTimerTypes } from '../store/modules/timer/timer.type';

interface UseTimerIntervalCallback {
  (): boolean;
}

export const getPomoLimitCount = (type: PomodoroTimerTypes) =>
  ({
    [PomodoroTimerTypes.long_pomo]: 3000,
    [PomodoroTimerTypes.short_pomo]: 5,
    [PomodoroTimerTypes.long_break]: 600,
    [PomodoroTimerTypes.short_break]: 15,
  }[type]);

export default function useTimerInterval(callback: UseTimerIntervalCallback, type: PomodoroTimerTypes) {
  const savedCallback = useRef<UseTimerIntervalCallback>(() => false);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setInterval(() => {
      const finish = savedCallback.current();
      if (finish) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [type]);
}
