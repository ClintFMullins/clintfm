import React from 'react';
import { convertPreviewUrl } from '../../utils/url-conversions';

export function EmbeddedContent({ url }) {
  return (
    <iframe
      src={convertPreviewUrl(url)}
      title="content"
      width="100%"
      height="100%"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}