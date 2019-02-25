import React from 'react';
import { getParsedContent } from '../../utils/url-conversions';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  background: ghostwhite;
  width: 100%;
  flex-grow: 1;
`;

export function EmbeddedContent({ url }) {
  const parsedContent = getParsedContent(url);

  if (!parsedContent) {
    return null;
  }

  return (
    <ContentWrapper>
      {parsedContent}
    </ContentWrapper>
  )
}