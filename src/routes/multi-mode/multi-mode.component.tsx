import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { selectNickname, selectCharacterImgCode } from '../../store/modules/main/main.select';
import {
  Container,
  TimerContainer,
  ButtonContainer,
  LinkContainer,
  GuidanceText,
  CopyMsgContainer,
  StateBarContainer,
  ChracterPosition,
} from './multi-mode.style';
import PomodoroTimer from '../../components/pomodoro-timer/pomodoro-timer.component';
import Button from '../../components/button/button.component';
import MultiLink from '../../components/multi-link/multi-link.component';
import ToastHook from '../../hooks/toast.hook';
import CopyMsg from '../../components/copy-message/copy-message.component';
import Chat from '../../components/chat/chat.component';
import { timerAction } from '../../store/modules/timer/timer.slice';
import { mainAction } from '../../store/modules/main/main.slice';
import StateBar from '../../components/state-bar/state-bar.component';
import Character from '../../components/character/character.component';

export default function MultiMode(): JSX.Element {
  const dispatch = useAppDispatch();
  const { roomIdParam } = useParams();

  const socketClient = useRef<Socket>();
  const nickName = useAppSelector(selectNickname);
  const imgCodeAll = useAppSelector(selectCharacterImgCode);
  const [connect, setConnect] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>('');
  const [members, setMembers] = useState([{ Nick: '테스팅', all: 3 }]);
  console.log(connect);
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

  const createRoom = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/mode/friends`).then((res) => {
      setRoomId(res.data);
      // eslint-disable-next-line no-restricted-globals
      window.location.href = `${window.location.origin}/multi/${res.data}`;
    });
  }, [setRoomId]);

  const connectSocket = useCallback(async () => {
    socketClient.current = io(`${process.env.REACT_APP_API_URL}/${roomIdParam}`);
    socketClient.current.on('connect', () => {
      setConnect(true);
      // alert(socketClient.current?.connected);
    });
    socketClient.current.on('error', (value) => {
      alert(value);
    });
    await socketClient.current?.emit('init', { Nick: nickName, all: imgCodeAll });
  }, [imgCodeAll, nickName, roomIdParam]);
  useEffect(() => {
    getNickname();
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
      // setTimeout(() => {
      //   if (socketClient.current?.disconnected) {
      //     console.log(socketClient.current?.disconnect);
      //     // alert('full room');
      //   }
      // }, 100);
    }
  }, [connectSocket, nickName, roomIdParam]);

  const startButtonHandler = () => {
    dispatch(timerAction.startMultiTimer());
  };

  const [toastState, setToastState] = useState<boolean>(false);
  ToastHook(toastState, setToastState);

  return (
    <Container>
      {nickName === '' && <div>hello</div>}
      {!connect && <Outlet />}
      <TimerContainer>
        <PomodoroTimer />
      </TimerContainer>
      {members.map((item, index) => {
        return (
          <ChracterPosition key={item.Nick} positionNum={index + 1}>
            <Character
              nickname={item.Nick}
              characterImgSrc={`${process.env.REACT_APP_IMG_URL}/character/all/work/0${item.all}_01.png`}
            />
          </ChracterPosition>
        );
      })}
      <ButtonContainer>
        <Button onClick={startButtonHandler}>시작하기</Button>
      </ButtonContainer>

      <GuidanceText>링크를 보내 친구들과 함꼐하자!</GuidanceText>
      <LinkContainer>
        <MultiLink setToastState={setToastState}>{`${window.location.origin}/multi/${roomId}`}</MultiLink>
      </LinkContainer>
      <Chat />
      {toastState && (
        <CopyMsgContainer>
          <CopyMsg />
        </CopyMsgContainer>
      )}

      {/* 이건 상태바 */}
      <StateBarContainer>
        <StateBar>집중하는 중...</StateBar>
      </StateBarContainer>
    </Container>
  );
}
