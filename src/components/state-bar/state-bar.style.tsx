import styled from 'styled-components';

export const StateBarContainer = styled.div<{ pomoState: string }>`
  background-image: ${({ pomoState }) =>
    pomoState.includes('break') ? `url(/images/alert_night.png);` : `url(/images/alert.png);`};
  background-repeat: no-repeat;
  background-size: cover;
  width: 474px;
  height: 120px;
`;

export const Text = styled.div`
  font-size: 22px;
  font-family: 'neodgm';
  color: #70ff64;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
`;
