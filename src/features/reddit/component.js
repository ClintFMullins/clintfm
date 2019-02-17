import React, { useState } from 'react';
import { Header, HEADER_HEIGHT } from './components/header/component';
import { PostContent } from './components/post-content/component';
import { PostComments } from './components/post-comments/component';
import styled from 'styled-components';
import { useSubredditData } from './utils/reddit-fetch';
import { useDirectionKeys } from '../../utils/keypress';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const PageLayout = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - ${HEADER_HEIGHT}px);
`;

export function Reddit() {
  const subredditData = useSubredditData({
    subreddit: 'reactjs',
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
      <Header />
      <PageLayout>
        <PostContent post={post} />
        <PostComments post={post} />
      </PageLayout>
    </PageWrapper>
  )
}