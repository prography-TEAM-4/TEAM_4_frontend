import styled from 'styled-components';

export const LinkContainer = styled.div`
  display: flex;
`;

export const LinkAddressContainer = styled.div`
  padding: 0 1.3em;
  height: 46px;
  background-color: #e8e8e8;
  border: 2px solid #000;
  box-sizing: border-box;
  margin: 1px 7px 0 0;
`;

export const LinkAddress = styled.span`
  font-size: 14px;
  line-height: 46px;
`;

export const CopyBtn = styled.button`
  width: 66px;
  height: 48px;
  background-color: #000;
  border: none;
  cursor: pointer;
  font-size: 20px;
  line-height: 26px;
  color: #fff;
  border-radius: 10px;
  padding: 0;
  font-family: 'neodgm';
`;
