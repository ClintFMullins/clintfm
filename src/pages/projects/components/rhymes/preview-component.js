import React from 'react';
import './preview-styles.css';
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
  const numberOfLines = useRenderInterval(3000, getNumberOfLines)

  return (
    <div className="rhymes-preview">
      {Array.from(new Array(numberOfLines)).map((_, index) => (
        <div key={index} className="rhyme-line" />
      ))}
    </div>
  );
}