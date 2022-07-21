import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { PomodoroTimerContainer, TimerText, TimerTextContainer, TimerColon } from './pomodoro-timer.style';

import useTimerInterval, { getPomoLimitCount } from '../../hooks/useTimerInterval.hook';
import {
  selectPomodoroTimerType,
  selectTimerStart,
  selectTimerCycle,
  selectTimerMode,
  selectTimerFinish,
} from '../../store/modules/timer/timer.select';
import { timerAction } from '../../store/modules/timer/timer.slice';
import { useAppSelector, useAppDispatch } from '../../hooks/index.hook';
import { PomodoroTimerTypes } from '../../store/modules/timer/timer.type';

const formatCount = (timerCount: number): number[] => [
  Math.floor(timerCount / 60 / 10),
  Math.floor(timerCount / 60) % 10,
  Math.floor((timerCount % 60) / 10),
  timerCount % 10,
];

const calNextPomoType = (currentPomoType: PomodoroTimerTypes) => {
  if (currentPomoType === PomodoroTimerTypes.short_pomo) {
    return PomodoroTimerTypes.short_break;
  }
  if (currentPomoType === PomodoroTimerTypes.short_break) {
    return PomodoroTimerTypes.short_pomo;
  }
  if (currentPomoType === PomodoroTimerTypes.long_pomo) {
    return PomodoroTimerTypes.long_break;
  }
  if (currentPomoType === PomodoroTimerTypes.long_break) {
    return PomodoroTimerTypes.long_pomo;
  }
  return PomodoroTimerTypes.short_pomo;
};
type Props = {
  client?: Socket;
};
export default function PomodoroTimer({ client }: Props) {
  const dispatch = useAppDispatch();
  const pomoType = useAppSelector(selectPomodoroTimerType);
  const pomoStart = useAppSelector(selectTimerStart);
  const pomoCycle = useAppSelector(selectTimerCycle);
  const finish = useAppSelector(selectTimerFinish);
  const pomoMode = useAppSelector(selectTimerMode);
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   return () => dispatch(timerAction.resetTimer() as any);
  // }, [dispatch]);

  const intervalCallback = () => {
    if (count === 0) {
      if (pomoCycle === 4) {
        if (pomoMode === 'multi') {
          client?.disconnect();
        }
        dispatch(timerAction.finishTimer());
      } else {
        const pomo = calNextPomoType(pomoType);
        let cycle: number = pomoCycle;
        if (pomoType === PomodoroTimerTypes.short_break || pomoType === PomodoroTimerTypes.long_break) {
          cycle += 1;
        }

        dispatch(
          timerAction.updateTimerTypes({
            pomo,
            cycle,
          })
        );
      }
      return true;
    }
    if (pomoStart && pomoMode === 'single') {
      setCount(count - 1);
    }
    return false;
  };

  useEffect(() => {
    setCount(getPomoLimitCount(pomoType));
  }, [pomoMode, pomoType]);

  useEffect(() => {
    client?.on('start', () => {
      dispatch(timerAction.startMultiTimer());
      client?.on('time', () => {
        if (!finish) {
          setCount((prev) => prev - 1);
        }
      });
    });
  }, [client, dispatch, finish, pomoStart]);
  useTimerInterval(intervalCallback, pomoType);

  const timerDigits: number[] = formatCount(count);

  return (
    <PomodoroTimerContainer pomoType={pomoType}>
      <TimerTextContainer>
        <TimerText>{timerDigits[0]}</TimerText>
        <TimerText>{timerDigits[1]}</TimerText>
        <TimerColon>:</TimerColon>
        <TimerText>{timerDigits[2]}</TimerText>
        <TimerText>{timerDigits[3]}</TimerText>
      </TimerTextContainer>
    </PomodoroTimerContainer>
  );
}
