import React from 'react';
import styled from 'styled-components';

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
`;

const EyeIn = styled.div`
  width: 50%;
  height: 50%;
  background: black;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 800ms transform linear;
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