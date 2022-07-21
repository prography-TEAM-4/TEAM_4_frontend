import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { selectNickname, selectCharacterImgCode } from '../../store/modules/main/main.select';
import {
  TimerContainer,
  ButtonContainer,
  StartButton,
  LinkContainer,
  GuidanceText,
  CopyMsgContainer,
  ChracterPosition,
  StateBarContainer,
} from './multi-mode.style';
import PomodoroTimer from '../../components/pomodoro-timer/pomodoro-timer.component';
import MultiLink from '../../components/multi-link/multi-link.component';
import ToastHook from '../../hooks/toast.hook';
import CopyMsg from '../../components/copy-message/copy-message.component';
import Chat from '../../components/chat/chat.component';
import { mainAction } from '../../store/modules/main/main.slice';
import Character from '../../components/character/character.component';
import StateBar from '../../components/state-bar/state-bar.component';
import {
  selectPomodoroTimerType,
  selectTimerCycle,
  selectTimerFinish,
  selectTimerStart,
  selectTimerMode,
} from '../../store/modules/timer/timer.select';
import { Container, PomoCompleteButton } from '../single-mode/single-mode.style';
import { modalAction } from '../../store/modules/modal/modal.slice';
import ResultModal from '../../components/result-modal/result.component';
import CheckPomoCycle from '../../components/pomo-counting/pomo-counting.component';

export default function MultiMode(): JSX.Element {
  const dispatch = useAppDispatch();
  const { roomIdParam } = useParams();
  const [imageUrl, setImageUrl] = useState<string>('');
  const socketClient = useRef<Socket>();
  const finish = useAppSelector(selectTimerFinish);
  const nickName = useAppSelector(selectNickname);
  const imgCodeAll = useAppSelector(selectCharacterImgCode);
  const cycleCount = useAppSelector(selectTimerCycle);
  const timerMode = useAppSelector(selectTimerMode);
  const start = useAppSelector(selectTimerStart);
  const pomoCycle = useAppSelector(selectTimerCycle);
  const isFinished = useAppSelector(selectTimerFinish);
  const pomoTimerType = useAppSelector(selectPomodoroTimerType);
  const [characterMoving, setCharacterMoving] = useState<number>(1);
  const [connect, setConnect] = useState<boolean>(false);

  const [roomId, setRoomId] = useState<string>('');
  const [members, setMembers] = useState<any[]>([]);
  useEffect(() => {
    const characterMovingTimer = setInterval(() => setCharacterMoving((v) => 3 - v), 500);

    return () => clearInterval(characterMovingTimer);
  }, []);
  useEffect(() => {
    return () => {
      if (socketClient.current?.connected) {
        socketClient.current.disconnect();
      }
    };
  }, []);
  const getNickname = useCallback(async () => {
    if (nickName === '') {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/user/random`).then((res) => {
          dispatch(mainAction.updateCharacter(res.data));
        });
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('server error');
      }
    }
  }, [dispatch, nickName]);
  const handleResultModal = () => {
    dispatch(modalAction.radioResultModal());
  };
  const createRoom = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/mode/friends`).then((res) => {
      setRoomId(res.data);
      // eslint-disable-next-line no-restricted-globals
      // history.pushState({}, '', `${window.location.origin}/multi/${res.data}`);
      window.location.href = `${window.location.origin}/multi/${res.data}`;
    });
  }, [setRoomId]);

  const connectSocket = useCallback(async () => {
    socketClient.current = io(`${process.env.REACT_APP_API_URL}/${roomIdParam}`);
    socketClient.current.on('connect', () => {
      setConnect(true);
      // alert(socketClient.current?.connected);
    });
    socketClient.current.on('customError', (value) => {
      alert(value);
    });
    socketClient.current?.emit('init', { Nick: nickName, all: imgCodeAll });
    socketClient.current.on('init', (data) => {
      setMembers(data);
    });
    socketClient.current?.on('leave', (data) => {
      setMembers(data);
    });
  }, [imgCodeAll, nickName, roomIdParam]);
  useEffect(() => {
    if (nickName === '') getNickname();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create room,
  useEffect(() => {
    if (nickName === '') {
      return;
    }
    if (roomIdParam === 'createRoom') {
      createRoom();
    }
  }, [nickName, roomIdParam, createRoom]);

  useEffect(() => {
    if (nickName === '') {
      return;
    }
    if (roomIdParam && roomIdParam !== 'createRoom') {
      // socket connection
      connectSocket();
    }
  }, [connectSocket, nickName, roomIdParam]);

  const startButtonHandler = () => {
    socketClient.current?.emit('start');
  };

  useEffect(() => {
    if (!finish) {
      return;
    }
    const getImageUrl = async () => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/randomImage`, {
          userList: members.map((value) => value.all),
        })
        .then((res) => {
          setImageUrl(res.data.link);
          dispatch(modalAction.radioResultModal());
        });
    };
    getImageUrl();
  }, [finish, members, setImageUrl, dispatch]);

  const [toastState, setToastState] = useState<boolean>(false);
  ToastHook(toastState, setToastState);

  const stateMessage = () => {
    if (timerMode === 'multi') {
      if (pomoTimerType === 'break') return '5분 휴식시간! 이야기를 나눠보세요.';
      if (isFinished && pomoCycle === 4) return '모두 수고하셨습니다 :)';
    }
    if (!start && !isFinished) return '친구 기다리는 중...';
    return '집중하는 중...';
  };

  return (
    <Container pomoState={pomoTimerType}>
      {nickName === '' && <div>hello</div>}
      {!connect && <Outlet />}
      <TimerContainer>
        <PomodoroTimer client={socketClient.current} />
        <CheckPomoCycle />
      </TimerContainer>
      {members.map((item, index) => {
        return (
          <ChracterPosition key={item.Nick} positionNum={index + 1}>
            <Character
              nickname={item.Nick}
              characterImgSrc={`${process.env.REACT_APP_IMG_URL}/character/all/${
                pomoTimerType.includes('break') ? 'rest' : 'work'
              }/0${item.all}_0${characterMoving}.png`}
            />
          </ChracterPosition>
        );
      })}

      {!start && cycleCount === 1 && (
        <ButtonContainer>
          <StartButton onClick={startButtonHandler}>시작하기</StartButton>
        </ButtonContainer>
      )}

      {imageUrl !== '' && <PomoCompleteButton onClick={handleResultModal}>뽀모 완성!</PomoCompleteButton>}

      {!start && cycleCount === 1 && (
        <LinkContainer>
          <GuidanceText>링크를 보내 친구들과 함께하자!</GuidanceText>
          <MultiLink setToastState={setToastState}>{`${window.location.origin}/multi/${roomId}`}</MultiLink>
        </LinkContainer>
      )}

      {pomoTimerType.includes('break') && <Chat socketClient={socketClient.current as Socket} />}
      {toastState && (
        <CopyMsgContainer>
          <CopyMsg />
        </CopyMsgContainer>
      )}

      <StateBarContainer>
        <StateBar>{stateMessage()}</StateBar>
      </StateBarContainer>
      <ResultModal characterImage={imageUrl} />
    </Container>
  );
}
