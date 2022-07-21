import styled, { css } from 'styled-components';

export const NavigationContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
`;

export const LogoContainer = styled.div`
  height: 100%;
  width: 10vw;
  display: flex;
  align-items: center;
  margin: 1vw 0 0 2vw;
  position: relatvie;
`;

export const LogoImg = styled.img`
  width: 100%;
  -webkit-user-drag: none;
  cursor: pointer;
`;

export const NavBoxContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 10px 0 0;
`;

export const NavBox = styled.div`
  padding: 10px 15px;
`;

export const NavImg = styled.div<{ content: string }>`
  background-image: url('images/mypage.png');
  background-size: cover;
  width: 45px;
  height: 45px;
  cursor: pointer;

  &:hover {
    background-image: url('images/mypage_hover.png');
  }
  &:active {
    background-image: url('images/mypage_active.png');
  }

  ${({ content }) =>
    content === 'info' &&
    css`
      background-image: url('images/info.png');
      &:hover {
        background-image: url('images/info_hover.png');
      }
      &:active {
        background-image: url($'images/info_active.png');
      }
    `}
`;

export const GuideScreenContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  z-index: 5;

  &.show {
    opacity: 1;
    pointer-events: visible;
  }
`;

export const GuideScreen = styled.img`
  cursor: pointer;
  width: 92vw;
`;

export const ExitModalContainer = styled.div`
  position: absolute;
  top: 110px;
  left: 40px;
  z-index: 100;
`;
