import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { convertPreviewUrl } from '../../utils/url-conversions';

const ContentWrapper = styled.div`
  background: lightgrey;
  flex-basis: 50%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
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
        {title}
        <br />
        <ReactMarkdown>
          {selftext}
        </ReactMarkdown>
      </div>
      <iframe
        src={convertPreviewUrl(url)}
        title="content"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ContentWrapper>
  )
}