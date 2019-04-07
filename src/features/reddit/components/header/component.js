import React, { useState } from 'react';
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
  justify-content: space-between;
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

const NavButton = styled.button`
  display: inline-block;
  border: none;
  padding: 0 2rem;
  height: 30px;
  margin: 0;
  text-decoration: none;
  background: #132944;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  outline: 0;

  &:hover {
    background: #234775;
  }
`

const SubredditInput = styled.input`
  height: 30px;
  padding: 0 10px;
`;

export function Header({ subreddit, currentSubreddit, handlePrev, handleNext, addSubreddit, replaceSubreddit }) {
  const [addingSubreddit, setAddingSubreddit] = useState(false);
  const [subredditToAdd, setSubredditToAdd] = useState('');

  function onInputKeydown(event) {
    setSubredditToAdd(event.currentTarget.value);
  }

  return (
    <HeaderWrapper>
      <div>
        <RedditName>reddit</RedditName>&nbsp;&nbsp;|&nbsp;&nbsp;
        {subreddit.split('+').map((eachSub) => {
          const isCurrent = eachSub && currentSubreddit && eachSub.toLowerCase() === currentSubreddit.toLowerCase();

          return (
            <span key={eachSub}>
              <SubredditName isCurrent={isCurrent} to={`/play/reddit?r=${eachSub}`} onClick={() => replaceSubreddit(eachSub)}>
                {eachSub}
              </SubredditName>
              &nbsp;&nbsp;
            </span>
          );
        })}
        <NavButton onClick={() => setAddingSubreddit(true)}>+</NavButton>
        {addingSubreddit && 
          <>
            <SubredditInput onChange={onInputKeydown} value={subredditToAdd} placeholder="subreddit name"/>
            <NavButton
              onClick={() => {
                addSubreddit(subredditToAdd)
                setAddingSubreddit(false)
                setSubredditToAdd('');
              }}
            >
              add
            </NavButton>
            <NavButton onClick={() => setAddingSubreddit(false)}>cancel</NavButton>
          </>
        }
      </div>
      <div>
        <NavButton onClick={handlePrev}>← prev</NavButton>
        <NavButton onClick={handleNext}>next →</NavButton>
      </div>
    </HeaderWrapper>
  )
}