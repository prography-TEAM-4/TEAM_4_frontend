import styled from 'styled-components';

export const Container = styled.div<{ pomoState: string }>`
  height: 100vh;
  background-image: ${({ pomoState }) =>
    pomoState === 'break' || pomoState === 'long_break'
      ? `
      url(${process.env.REACT_APP_IMG_URL}/background/background_tree_night.png),
      url(${process.env.REACT_APP_IMG_URL}/background/background_land_night.png),
      url(${process.env.REACT_APP_IMG_URL}/background/background_sky_night.png)
    `
      : `
    url(${process.env.REACT_APP_IMG_URL}/background/background_tree_day.png),
    url(${process.env.REACT_APP_IMG_URL}/background/background_land_day.png),
    url(${process.env.REACT_APP_IMG_URL}/background/background_sky_day.png);
    `};

  background-size: cover, cover, cover;
  background-position: bottom, bottom, center;
  background-repeat: no-repeat, no-repeat, no-repeat;
`;

export const TimerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CharacterContainer = styled.div`
  position: absolute;
  top: 41%;
  left: calc(50% + 17vw);
`;

export const StateBarContainer = styled.div`
  position: absolute;
  top: calc(8%);
  left: 50%;
  transform: translate(-50%, 0);
`;

export const PomoCheckContainer = styled.div`
  width: 140px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export const PomoCheckImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const PomoCompleteButton = styled.div`
  background-image: url('/images/pomo_complete_button.png');
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
  width: 284px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'neodgm';
  font-size: 24px;
  cursor: pointer;

  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 0%);

  &:hover {
    color: #00378e;
  }

  &:active {
    background-image: url('images/pomo_complete_button_active.png');
  }
`;
