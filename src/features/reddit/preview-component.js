import React from 'react';
import styled, { keyframes } from 'styled-components';

const eyeballMoving = keyframes`
  0% {
    transform: translateX(0%);
  }
  25% {
    transform: translateX(-15%);
  }
  75% {
    transform: translateX(15%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const Wrapper = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EyeOut = styled.div`
  width: 30%;
  height: 30%;
  background: blue;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 500ms linear;
  animation: ${eyeballMoving} 5s ease infinite;

  &:hover {
    animation: none;
  }
`;

const EyeIn = styled.div`
  width: 50%;
  height: 50%;
  background: black;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 800ms transform ease-in-out;
  transform: scale(1);

  &:hover {
    transform: scale(1.5);
  }
`;

export function PreviewReddit() {
  return (
    <Wrapper>
      <EyeOut><EyeIn/></EyeOut>
    </Wrapper>
  )
}