import React from 'react';
import './styles.css';

const MOON_SIZE_PX = 100;

export function Moon(props) {
  const style = {
    bottom: `${100 - props.translate}%`,
    width: `${MOON_SIZE_PX}px`,
    height: `${MOON_SIZE_PX}px`,
  }

  const wrapperStyle = {
    width: `${MOON_SIZE_PX}px`,
  }

  return (
    <div className="moon-wrapper-wrapper" style={wrapperStyle}>
      <div className="moon-wrapper">
        <div className="moon" style={style} />
      </div>
    </div>
  );
}
