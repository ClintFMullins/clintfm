import React from 'react';
import './preview-styles.css';

export function PreviewSequence() {
  return (
    <div className="preview-sequence-wrapper">
      {Array.from(new Array(5)).map((_, outerIndex) => {
        return <div className="preview-sequence" key={outerIndex}>
          {Array.from(new Array(5)).map((_, innerIndex) => {
            return <div className="preview-sequence-square" key={innerIndex}/>
          })}
        </div>
      })}
    </div>
  );
}