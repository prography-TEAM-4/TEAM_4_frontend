import styled from 'styled-components';

export const PomodoroTimerContainer = styled.div<{ pomoType: string }>`
  background-image:
  ${({ pomoType }) =>
    pomoType.includes('break')
      ? `url(${process.env.REACT_APP_IMG_URL}/timer/watch_night.png);`
      : `url(${process.env.REACT_APP_IMG_URL}/timer/watch_day.png);`}
  
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 29.5vw;
  height: 29.5vw;
  display: flex;
  justify-content: center;
  // align-items: center;
  position: relative;
`;

export const TimerTextContainer = styled.div`
  display: flex;
  position: absolute;
  top: 53%;
  transform: translate(0, -60%);
`;

export const TimerText = styled.div`
  color: #70ff64;
  font-size: 6.25vw;
  width: 3.8vw;
  text-align: center;
`;

export const TimerColon = styled(TimerText)`
  width: 30px;
`;
