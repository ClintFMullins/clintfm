import React from 'react';
import { generateFace } from './utils/face-generation';
import './styles.css';

const px = (num) => `${num}px`;
const pc = (num) => `${num}%`;

export function Face(props) {
  const bodyData = generateFace();

  const bodyWidth = props.size;

  const bodyStyle = {
    width: px(bodyWidth),
    height: px(props.size),
    position: 'relative',
  };

  const eyeLeftStyle = {
    width: pc(bodyData.eyes.sizeX),
    height: pc(bodyData.eyes.sizeY),
    position: 'absolute',
    top: pc(bodyData.eyes.leftY),
    left: pc(bodyData.eyes.leftX),
  };

  const eyeRightStyle = {
    width: pc(bodyData.eyes.sizeX),
    height: pc(bodyData.eyes.sizeY),
    position: 'absolute',
    top: pc(bodyData.eyes.rightY),
    left: pc(bodyData.eyes.rightX),
  };

  const mouthStyle = {
    width: pc(bodyData.mouth.sizeX),
    height: pc(bodyData.mouth.sizeY),
    position: 'absolute',
    top: pc(bodyData.mouth.y),
    left: pc(bodyData.mouth.x),
  }

  return (
    <div className="creature-body" style={bodyStyle}>
      <div className="creature-eye-left" style={eyeLeftStyle} />
      <div className="creature-eye-right" style={eyeRightStyle} />
      <div className="creature-mouth" style={mouthStyle} />
    </div>
  );
}