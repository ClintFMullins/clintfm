import React from 'react';
import styled from 'styled-components';

export const HEADER_HEIGHT = 30;

const HeaderWrapper = styled.div`
  background: lightcoral;
  height: ${HEADER_HEIGHT}px;
  width: 100%;
`;

export function Header() {
  return (
    <HeaderWrapper />
  )
}