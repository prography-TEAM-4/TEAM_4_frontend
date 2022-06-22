import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-image: url(${process.env.REACT_APP_IMG_URL}/background/background_tree_day.png),
    url(${process.env.REACT_APP_IMG_URL}/background/background_land_day.png),
    url(${process.env.REACT_APP_IMG_URL}/background/background_sky_day.png);
  background-size: cover, cover, cover;
  background-position: bottom, bottom, center;
  background-repeat: no-repeat, no-repeat, no-repeat;
`;

export const TimerContainer = styled.div`
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const topPosition = (position: number) => {
  switch (position) {
    case 1:
      return '3%';
    case 2:
      return '3%';
    case 3:
      return '27%';
    case 4:
      return '27%';
    case 5:
      return '47%';
    case 6:
      return '47%';
    default:
      return '';
  }
};

const leftPosition = (position: number) => {
  switch (position) {
    case 1:
      return '25%';
    case 2:
      return '65%';
    case 3:
      return '15%';
    case 4:
      return '75%';
    case 5:
      return '25%';
    case 6:
      return '65%';
    default:
      return '';
  }
};

export const ChracterPosition = styled.div<{ positionNum: number }>`
  position: absolute;
  top: ${({ positionNum }) => topPosition(positionNum)};
  left: ${({ positionNum }) => leftPosition(positionNum)};
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 26%;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const GuidanceText = styled(ButtonContainer)`
  bottom: 20%;
`;

export const LinkContainer = styled(ButtonContainer)`
  bottom: 14%;
`;

export const CopyMsgContainer = styled(ButtonContainer)`
  bottom: 7%;
`;

export const StateBarContainer = styled(ButtonContainer)`
  bottom: 17%;
`;
