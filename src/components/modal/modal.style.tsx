import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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

export const ModalContent = styled.div<{ width: number; backgroundColor: string }>`
  width: ${({ width }) => `${width}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 20px;
  position: relative;
`;

export const ModalHeader = styled.div`
  margin-top: 68px;
`;

export const ModalFooter = styled.div`
  padding: 0 32px;
`;

export const ModalTitle = styled.div<{ titleColor: string }>`
  text-align: center;
  font-size: 36px;
  font-family: 'neodgm';
  color: ${({ titleColor }) => titleColor};
`;

export const ModalBody = styled.div`
  // padding: 10px;
`;

export const CloseButton = styled.div`
  background-image: url('/images/close.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 48px;
  height: 48px;
  display: inline-block;
  position: absolute;
  right: 25px;
  top: 25px;
  cursor: pointer;

  &:hover {
    background-image: url('/images/close_hover.png');
  }
`;
