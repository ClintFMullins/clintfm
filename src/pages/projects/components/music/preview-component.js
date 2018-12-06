import React from 'react';
import './preview-styles.css';

export function PreviewSequence() {
  return (
    <div className="preview-sequence-wrapper">
      {Array.from(new Array(5)).map(() => {
        return <div className="preview-sequence">
          {Array.from(new Array(5)).map(() => {
            return <div className="preview-sequence-square" />
          })}
        </div>
      })}
    </div>
  );
}