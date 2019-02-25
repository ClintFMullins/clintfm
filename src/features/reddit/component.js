import React, { useState, useEffect } from 'react';
import { Header, HEADER_HEIGHT } from './components/header/component';
import { PostContent } from './components/post-content/component';
import { PostComments } from './components/post-comments/component';
import styled from 'styled-components';
import { useSubredditData } from './utils/reddit-fetch';
import { useDirectionKeys } from '../../utils/keypress';
import { getUrlParam } from '../../utils/url';
import './styles.css';
import { withRouter } from 'react-router-dom';

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

function RedditInner(props) {
  const subreddit = getUrlParam('r', props.location.search) || DEFAULT_SUBREDDIT;
  const [postIndex, setPostIndex] = useState(0);

  useEffect(() => {
    setPostIndex(0);
  }, [subreddit]);

  const subredditData = useSubredditData({
    subreddit,
  });

  function handleLeft() {
    setPostIndex((prevPostIndex) => prevPostIndex - 1);
  }

  function handleRight() {
    setPostIndex((prevPostIndex) => prevPostIndex + 1);
  }

  useDirectionKeys({ handleLeft, handleRight });

  const post = subredditData ? subredditData.data.children[postIndex] : null;
  const currentSubreddit = post && post.data && post.data.subreddit;

  return (
    <PageWrapper>
      <Header subreddit={subreddit} currentSubreddit={currentSubreddit} />
      <PageLayout>
        <PostContent post={post} />
        <PostComments post={post} subreddit={subreddit}/>
      </PageLayout>
    </PageWrapper>
  )
}

export const Reddit = withRouter(RedditInner)