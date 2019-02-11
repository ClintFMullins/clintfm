import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ChoiceContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  text-decoration: none;
  color: #626567;
  z-index: 9999999999999;
`

export const HomepageLink = styled(({ isLeft, ...rest }) => <Link {...rest} />)`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all linear 50ms;
  cursor: pointer;
  border-top: solid #B3B6B7 1px;
  border-bottom: solid #B3B6B7 1px;
  color: #7B7D7D;
  padding: 8px;
  text-decoration: none;
  color: #626567;

  ${props => (
    props.isLeft ? `
      background: #FDFEFE;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border-left: solid #B3B6B7 1px;
    ` :
    `
      background: #F7F9F9;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-right: solid #B3B6B7 1px;
    `
  )}

  :hover {
    transform: scale(1.1);
    border: rgb(255, 235, 119) solid 1px;
    border-radius: 3px;
    box-shadow: rgba(235, 213, 90, 0.2) 0px 0px 10px 1px;
  }
`;

export const Profile = styled.div`
  font-family: 'Pacifico', cursive;
  background-color: white;
  font-size: 21px;
  color:hsl(204, 2%, 29%);
`