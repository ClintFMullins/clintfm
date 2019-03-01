import React from 'react';
import styled, {keyframes} from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { EmbeddedContent } from '../embedded/component';
import { BACKGROUND, FOREGROUND } from '../../utils/color-themes';

const ContentWrapper = styled.div`
  background: ${BACKGROUND};
  flex-basis: 60%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: ${FOREGROUND};
`;

const LoadingWrapper = styled.div`
  background: ${BACKGROUND};
  flex-basis: 60%;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const loadingAnimation = keyframes`
  0%{background-position:50% 0%}
  50%{background-position:51% 100%}
  100%{background-position:50% 0%}
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #ffffff00, #6e96d90f, #ffffff00);
  background-size: 600% 600%;
  animation: ${loadingAnimation} 2s ease infinite;
`;

export function PostContent({ post }) {
  if (!post) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    )
  }
  
  const { title, selftext, url } = post.data;

  return (
    <ContentWrapper>
      <div>
        <Title>{title}</Title>
        <br />
        <ReactMarkdown>
          {selftext}
        </ReactMarkdown>
      </div>
      <EmbeddedContent url={url} />
    </ContentWrapper>
  )
}