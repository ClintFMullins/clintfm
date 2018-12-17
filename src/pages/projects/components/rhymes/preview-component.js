import React from 'react';
import { RhymesPreview, RhymeLine } from './preview-styles';
import { useRenderInterval } from '../../../../utils/render-interval';

let numberOfLines = 3;
function getNumberOfLines() {
  numberOfLines++;

  if (numberOfLines > 15) {
    numberOfLines = 3;
  }

  return numberOfLines;
}

export function PreviewRhymes() {
  const numberOfLines = useRenderInterval(1000, getNumberOfLines)

  return (
    <RhymesPreview>
      {Array.from(new Array(numberOfLines)).map((_, index) => (
        <RhymeLine key={index} />
      ))}
    </RhymesPreview>
  );
}