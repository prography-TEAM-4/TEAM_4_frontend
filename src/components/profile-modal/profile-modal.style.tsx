import styled from 'styled-components';

export const ProfileModalContainer = styled.div`
  padding: 0 32px;
`;

export const ProfileModalTitle = styled.div`
  margin-top: 68px;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  font-family: 'neodgm';
  color: #025a00;
`;

export const ProfileModalBgImg = styled.div`
  background-image: url(${process.env.REACT_APP_IMG_URL}/background/background_pop.png);
  background-size: cover;
  width: 372px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
  border: 2px solid #000;
`;

export const ProfileModalCharacterImg = styled.img`
  width: 150px;
  height: 150px;
  -webkit-user-drag: none;
`;

export const ProfileModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding: 1em 0;
`;

export const ProfileModalNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #aeacac;
`;

export const ProfileModalName = styled.div`
  font-size: 1.5em;
  width: 100%;
  font-family: 'IBMPlexMono';
  font-weight: 400;
  text-align: center;
`;

export const ProfileModalNameInput = styled.input`
  width: 70%;
  border: none;
  padding: 7px 10px;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  font-size: 22px;
`;

export const ProfileModalNameEdit = styled.img<{ isLoggedIn: boolean }>`
  -webkit-user-drag: none;
  width: 40px;
  height: 40px;

  cursor: ${({ isLoggedIn }) => (isLoggedIn ? 'pointer' : 'not-allowed')};
`;

export const ProfileModalLogInMessage = styled.div`
  font-size: 0.75em;
  color: #696969;
  font-family: 'IBMPlexMono';
`;

export const FooterContainer = styled.div`
  margin: 20px 0 40px 0;
`;

export const ProfileModalEmail = styled.div`
  font-family: 'IBMPlexMono';
  color: #696969;
  margin: 20px 0 40px 0;
  text-align: center;
`;

export const SocialLoginMenuContainer = styled.div`
  margin: 20px 0 40px 0;
`;

export const LogoutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 40px;
`;

export const LogoutButton = styled.div`
  background-image: url('/images/logout_button.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 260px;
  height: 48px;
  cursor: pointer;

  &:hover {
    background-image: url('/images/logout_hover_button.png');
  }

  &:active {
    background-image: url('/images/logout_active_button.png');
  }
`;
