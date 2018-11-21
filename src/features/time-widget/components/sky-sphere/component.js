import React from 'react';
import { useWindowSize } from '../../../../utils/dom';
import './styles.css';

export function SkySphere(props) {
  const size = props.isDay ? props.size : props.size / 2;

  const translateX = ((props.percentX / 100) * props.width) - (size / 2);
  const translateY = ((props.percentY / 100) * props.height) - (size / 2);

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    transform: `translateX(${translateX}px) translateY(-${translateY}px)`,
    backgroundColor: props.isDay ? 'yellow' : 'white',
  }

  return (
    <div className="sky-sphere-center">
      <div className={`sky-sphere ${props.sunshine ? 'sky-sphere-hue' : ''}`} style={style} />
    </div>
  );
}