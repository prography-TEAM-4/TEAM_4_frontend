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

export const LogoContainer = styled.div`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  width: 30vw;
`;

export const LogoImg = styled.img`
  -webkit-user-drag: none;
  width: 100%;
`;

export const TimerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ModeSelectButtonContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: 13%;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const ModeSelectButtonText = styled.span`
  font-family: 'neodgm';
  font-size: 24px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-38%, -50%);

  &.friend {
    transform: translate(-30%, -50%);
  }
`;

export const ModeSelectButton = styled.div<{ normalImg: string; hoverImg: string; activeImg: string }>`
  background-image: url(${({ normalImg }) => normalImg});
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
  width: 284px;
  height: 80px;
  margin: 0 23px;
  padding: 0;
  position: relative;
  cursor: pointer;

  &:hover {
    background-image: url(${({ hoverImg }) => hoverImg});
    ${ModeSelectButtonText} {
      display: none;
    }
  }

  &:active {
    background-image: url(${({ activeImg }) => activeImg});
    ${ModeSelectButtonText} {
      display: none;
    }
  }
`;

export const CharacterContainer = styled.div`
  position: absolute;
  top: 41%;
  left: calc(50% + 17vw);
`;

export const PomoGuideButtonText = styled.span`
  font-family: 'IBMPlexMono';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-54%, -55%);
`;

export const PomoGuideButtonContainer = styled.div`
  background-image: url('/images/pomoguide_button.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 180px;
  height: 42px;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  cursor: pointer;

  &:hover {
    background-image: url('/images/pomoguide_button_hover.png');
    ${PomoGuideButtonText} {
      display: none;
    }
  }

  &:active {
    background-image: url('/images/pomoguide_button_active.png');
    ${PomoGuideButtonText} {
      display: none;
    }
  }
`;
