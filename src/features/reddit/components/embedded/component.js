import React from 'react';
import { convertPreviewUrl } from '../../utils/url-conversions';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  background: ghostwhite;
  width: 100%;
  flex-grow: 1;
`;

export function EmbeddedContent({ url }) {
  const parsedUrl = convertPreviewUrl(url);

  if (!parsedUrl) {
    return null;
  }

  return (
    <ContentWrapper>
      <iframe
        sandbox
        src={parsedUrl}
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