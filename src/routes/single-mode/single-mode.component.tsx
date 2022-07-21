import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { selectNickname, selectCharacterImgCode } from '../../store/modules/main/main.select';
import {
  selectPomodoroTimerType,
  selectTimerCycle,
  selectTimerFinish,
  selectTimerMode,
} from '../../store/modules/timer/timer.select';
import useRandomCharacter from '../../hooks/useRandomCharacter';

import PomodoroTimer from '../../components/pomodoro-timer/pomodoro-timer.component';
import Character from '../../components/character/character.component';
import StateBar from '../../components/state-bar/state-bar.component';
import CheckPomoCycle from '../../components/pomo-counting/pomo-counting.component';
import ResultModal from '../../components/result-modal/result.component';
import {
  Container,
  StateBarContainer,
  CharacterContainer,
  TimerContainer,
  PomoCompleteButton,
} from './single-mode.style';

export default function SingleMode(): JSX.Element {
  const dispatch = useAppDispatch();
  useRandomCharacter();

  const nickName = useAppSelector(selectNickname);
  const imgCodeAll = useAppSelector(selectCharacterImgCode);
  const pomoTimerType = useAppSelector(selectPomodoroTimerType);
  const pomoCycle = useAppSelector(selectTimerCycle);
  const isFinished = useAppSelector(selectTimerFinish);
  const timerMode = useAppSelector(selectTimerMode);

  const [characterMoving, setCharacterMoving] = useState(false);

  const handleResultModal = () => {
    dispatch(modalAction.radioResultModal());
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
      // dispatch(timerAction.startSingleTimer(PomodoroTimerTypes.short_pomo));
    })();
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, [dispatch]);

  useEffect(() => {
    const characterMovingTimer = setInterval(() => setCharacterMoving((v) => !v), 500);

    return () => clearInterval(characterMovingTimer);
  }, []);

  useEffect(() => {
    if (pomoCycle === 4 && isFinished === true) {
      dispatch(modalAction.radioResultModal());
    }
  }, [pomoCycle, isFinished, dispatch]);

  const stateMessage = () => {
    if (timerMode === 'single') {
      if (pomoTimerType === 'break') return '5분 휴식합니다.';
      if (pomoTimerType === 'long_break') return '10분 휴식합니다.';
      if (isFinished && pomoCycle === 4) return '뽀모 성공 :)';
    }
    return '집중하는 중...';
  };

  const characterState = () => {
    if (pomoTimerType === 'break' || pomoTimerType === 'long_break') {
      if (characterMoving) return `${process.env.REACT_APP_IMG_URL}/character/all/rest/0${imgCodeAll}_01.png`;
      return `${process.env.REACT_APP_IMG_URL}/character/all/rest/0${imgCodeAll}_02.png`;
    }

    if (characterMoving) return `${process.env.REACT_APP_IMG_URL}/character/all/work/0${imgCodeAll}_01.png`;
    return `${process.env.REACT_APP_IMG_URL}/character/all/work/0${imgCodeAll}_02.png`;
  };

  return (
    <Container pomoState={pomoTimerType}>
      <div>
        <TimerContainer>
          <PomodoroTimer />
          <CheckPomoCycle />
        </TimerContainer>
        <CharacterContainer>
          <Character nickname={nickName} characterImgSrc={characterState()} />
        </CharacterContainer>
      </div>

      {pomoCycle === 4 && isFinished === true && (
        <PomoCompleteButton onClick={handleResultModal}>뽀모 완성!</PomoCompleteButton>
      )}

      <StateBarContainer>
        <StateBar>{stateMessage()}</StateBar>
      </StateBarContainer>

      <ResultModal characterImage={`${process.env.REACT_APP_IMG_URL}/character/all/work/0${imgCodeAll}_01.png`} />
    </Container>
  );
}
