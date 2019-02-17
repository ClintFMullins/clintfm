import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  background: lightgrey;
  flex-basis: 50%;
`;

export function PostContent({ post }) {
  if (!post) {
    return (
      <ContentWrapper>
        LOADING
      </ContentWrapper>
    )
  }
  
  const { title } = post.data;

  return (
    <ContentWrapper>
      {title}
    </ContentWrapper>
  )
}