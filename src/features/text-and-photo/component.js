import React from 'react';
import './styles.css';

export function TextAndPhoto(props) {
  return (
    <div className="text-and-photo-wrapper">
      <div className="text-and-photo">
        <div className="photo-wrapper"></div>
        <div className="text-wrapper">{props.children}</div>
      </div>
    </div>
  );
}