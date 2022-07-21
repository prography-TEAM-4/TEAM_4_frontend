import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Character from '../../components/character/character.component';
import PomodoroTimer from '../../components/pomodoro-timer/pomodoro-timer.component';
import MultiModeSelectModal from '../../components/multi-mode-select-modal/multi-mode-select-modal.component';
import SingleModeSelectModal from '../../components/single-mode-select-modal/single-mode-select-modal.component';
import ExplainModal from '../../components/explain-modal/explain-modal.component';

import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { selectNickname, selectCharacterImgCode } from '../../store/modules/main/main.select';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { mainAction } from '../../store/modules/main/main.slice';

import {
  Container,
  TimerContainer,
  CharacterContainer,
  ModeSelectButtonContainer,
  ModeSelectButton,
  ModeSelectButtonText,
  PomoGuideButtonContainer,
  PomoGuideButtonText,
} from './main.style';

export default function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nickName = useAppSelector(selectNickname);
  const characterImgCode = useAppSelector(selectCharacterImgCode);

  const handleSingleModalClick = () => {
    dispatch(modalAction.radioSingleModeSelectModal());
  };

  const handleExplainModalClick = () => {
    dispatch(modalAction.radioExplainModal());
  };

  const [characterMoving, setCharacterMoving] = useState(false);

  const getRandomCharacter = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/random`);
    return response.data;
  };

  const handleFriendClick = () => {
    navigate('/multi/createRoom');
  };

  useEffect(() => {
    const updateCharacter = async () => {
      const data = await getRandomCharacter();
      dispatch(mainAction.updateCharacter(data));
    };

    updateCharacter();

    const timer = setInterval(() => setCharacterMoving((v) => !v), 500);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <Container className="App">
      <TimerContainer>
        <PomodoroTimer />
      </TimerContainer>
      <CharacterContainer>
        <Character
          nickname={nickName}
          characterImgSrc={
            characterMoving
              ? `${process.env.REACT_APP_IMG_URL}/character/all/work/0${characterImgCode}_01.png`
              : `${process.env.REACT_APP_IMG_URL}/character/all/work/0${characterImgCode}_02.png`
          }
        />
      </CharacterContainer>
      <ModeSelectButtonContainer>
        <ModeSelectButton
          normalImg="/images/single_mode_button.png"
          hoverImg="/images/single_mode_button_hover.png"
          activeImg="/images/single_mode_button_active.png"
          onClick={handleSingleModalClick}
        >
          <ModeSelectButtonText>싱글모드</ModeSelectButtonText>
        </ModeSelectButton>
        <ModeSelectButton
          normalImg="/images/multi_mode_button.png"
          hoverImg="/images/multi_mode_button_hover.png"
          activeImg="/images/multi_mode_button_active.png"
          onClick={handleFriendClick}
        />
      </ModeSelectButtonContainer>
      <PomoGuideButtonContainer onClick={handleExplainModalClick} />
      <SingleModeSelectModal />
      <MultiModeSelectModal />
      <ExplainModal />
    </Container>
  );
}
