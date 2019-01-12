import React from 'react';
import styled from 'styled-components';

const PromptBackground = styled.div`
  background: black;
  color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  width: 100%;
  height: 100%;
  font-size: 30px;
  border-radius: 100%;
`;

export function PreviewPrompt() {
  return (
    <PromptBackground>~/user $</PromptBackground>
  );
}