import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 10vw;
  display: flex;
  align-items: center;
  margin: 2vw 0 0 2vw;
`;

export const LogoImg = styled.img`
  width: 200px;
  height: 88px;
`;

export const NavBoxContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavBox = styled.div`
  padding: 10px 15px;
  cursor: pointer;
`;
