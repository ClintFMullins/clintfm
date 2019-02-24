import React, { useState } from 'react';
import { Header, HEADER_HEIGHT } from './components/header/component';
import { PostContent } from './components/post-content/component';
import { PostComments } from './components/post-comments/component';
import styled from 'styled-components';
import { useSubredditData } from './utils/reddit-fetch';
import { useDirectionKeys } from '../../utils/keypress';
import { getUrlParam } from '../../utils/url';
import './styles.css';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const PageLayout = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - ${HEADER_HEIGHT}px);
`;

const DEFAULT_SUBREDDIT = 'videos';

export function Reddit() {
  const [subreddit] = useState(() => {
    return getUrlParam('r') || DEFAULT_SUBREDDIT;
  });

  const subredditData = useSubredditData({
    subreddit,
  });
  const [postIndex, setPostIndex] = useState(0);

  function handleLeft() {
    setPostIndex((prevPostIndex) => prevPostIndex - 1);
  }

  function handleRight() {
    setPostIndex((prevPostIndex) => prevPostIndex + 1);
  }

  useDirectionKeys({ handleLeft, handleRight });

  const post = subredditData ? subredditData.data.children[postIndex] : null;

  return (
    <PageWrapper>
      <Header subreddit={subreddit} />
      <PageLayout>
        <PostContent post={post} />
        <PostComments post={post} subreddit={subreddit}/>
      </PageLayout>
    </PageWrapper>
  )
}