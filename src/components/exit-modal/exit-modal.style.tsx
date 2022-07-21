import styled, { css } from 'styled-components';

export const ExitModalContainer = styled.div`
  width: 310px;
  height: 167px;
  border: 3px solid #000;
  border-radius: 20px;
  background-color: #fbffd1;
  padding: 24px 20px;
  box-sizing: border-box;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  z-index: 5;

  &.show {
    opacity: 1;
    pointer-events: visible;
  }
`;

export const MainTitle = styled.div`
  font-size: 24px;
  font-family: 'neodgm';
  margin-bottom: 10px;
`;

export const SubTitle = styled.div`
  color: #838383;
  font-size: 13px;
  font-family: 'IBMPlexMono';
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.div<{ normalImg: string; activeImg: string; buttonType?: string }>`
  background-image: url(${({ normalImg }) => normalImg});
  background-repeat: no-repeat;
  background-size: cover;
  width: 124px;
  height: 48px;
  font-family: 'neodgm';
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;

  ${({ buttonType }) =>
    buttonType &&
    css`
      color: #757575;
    `}

  &:hover {
    color: #000;
  }

  &:active {
    color: #000;
    background-image: url(${({ activeImg }) => activeImg});
  }
`;
