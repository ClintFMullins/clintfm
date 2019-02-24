import React from 'react';
import styled from 'styled-components';
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
  color: ${FOREGROUND}
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

export function PostContent({ post }) {
  if (!post) {
    return (
      <ContentWrapper>
        LOADING
      </ContentWrapper>
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