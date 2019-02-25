import React from 'react';
import styled from 'styled-components';
import { DARKEST, FOREGROUND_LIGHT } from '../../utils/color-themes';
import { Link } from 'react-router-dom';

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

const SubredditName = styled(({ isCurrent, ...rest }) => <Link {...rest} />)`
  color: ${props => props.isCurrent ? 'lightgrey' : 'grey'};
  text-decoration: none;
`;

const RedditName = styled.span`
  color: #7c90a7;
`;

export function Header({ subreddit, currentSubreddit }) {
  return (
    <HeaderWrapper>
      <RedditName>reddit</RedditName>&nbsp;&nbsp;|&nbsp;&nbsp;
      {subreddit.split('+').map((eachSub) => {
        const isCurrent = eachSub && currentSubreddit && eachSub.toLowerCase() === currentSubreddit.toLowerCase();

        return (
          <span key={eachSub}>
            <SubredditName isCurrent={isCurrent} to={`/play/reddit?r=${eachSub}`}>
              {eachSub}
            </SubredditName>
            &nbsp;&nbsp;
          </span>
        );
      })}
    </HeaderWrapper>
  )
}