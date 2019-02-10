import React, { useState } from 'react';
import { RhymesPreview, RhymeLine } from './preview-styles';
import { useInterval } from '../../../../utils/render-interval';

function getNumberOfLines(numberOfLines) {
  numberOfLines++;

  if (numberOfLines > 18) {
    numberOfLines = 3;
  }

  return numberOfLines;
}

export function PreviewRhymes() {
  const [numberOfLines, setNumberOfLines] = useState(3);

  useInterval(() => {
    setNumberOfLines(getNumberOfLines(numberOfLines));
  }, 500);

  return (
    <RhymesPreview>
      {Array.from(new Array(numberOfLines)).map((_, index) => (
        <RhymeLine key={index} />
      ))}
    </RhymesPreview>
  );
}