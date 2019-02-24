import React from 'react';
import styled from 'styled-components';
import { DARKEST, FOREGROUND_LIGHT } from '../../utils/color-themes';

export const HEADER_HEIGHT = 30;

const HeaderWrapper = styled.div`
  background: ${DARKEST};
  height: ${HEADER_HEIGHT}px;
  width: 100%;
  border-bottom: ${FOREGROUND_LIGHT} 2px solid;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  color: lightgrey;
`;

export function Header({ subreddit }) {
  return (
    <HeaderWrapper>
      reddit - {subreddit}
    </HeaderWrapper>
  )
}