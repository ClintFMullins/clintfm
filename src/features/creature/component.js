import React from 'react';
import './styles.css';

const px = (num) => `${num}px`;
const pc = (num) => `${num}%`;

const SATURATION = 100;
const colorTemplate = (hue, brightness) => `hsl(${hue}, ${SATURATION}%, ${brightness}%)`;
const colorVeryLight = (hue) => colorTemplate(hue, 93);
const colorLight = (hue) => colorTemplate(hue, 80);
const colorDark = (hue) => colorTemplate(hue, 50);
const colorVeryDark = (hue) => colorTemplate(hue, 30);
const colorVeryVeryDark = (hue) => colorTemplate(hue, 10);

export function Creature(props) {
  const { body, mouth, eyes, misc } = props.creatureData;

  const adustedBodyWidth = props.size * (body.width / 100);
  const adustedBodyHeight = props.size * (body.height / 100);

  const bodyWrapperStyle = {
    width: props.size,
    height: props.size,
  }

  const bodyStyle = {
    width: px(adustedBodyWidth),
    height: px(adustedBodyHeight),
    borderRadius: body.radius,
    backgroundColor: colorLight(misc.hue),
    borderColor: colorDark(misc.hue),
    boxShadow: `3px 3px 5px ${colorVeryDark(misc.hue)}`,
  };

  const bothEyesStyles = {
    width: pc(eyes.sizeX),
    height: pc(eyes.sizeY),
    borderRadius: eyes.radius,
    backgroundColor: colorVeryLight(misc.hue),
    borderColor: colorVeryDark(misc.hue),
    boxShadow: `0px 0px 10px ${colorVeryDark(misc.hue)}`,
  }

  const eyeLeftStyle = {
    ...bothEyesStyles,
    top: pc(eyes.leftY),
    left: pc(eyes.leftX),
  };

  const eyeRightStyle = {
    ...bothEyesStyles,
    top: pc(eyes.rightY),
    left: pc(eyes.rightX),
  };

  const pupilStyle = {
    width: pc(eyes.pupilSizeX),
    height: pc(eyes.pupilSizeY),
    top: pc(eyes.pupilY),
    left: pc(eyes.pupilX),
    borderRadius: pc(eyes.pupilRadius),
    backgroundColor: colorVeryDark(misc.hue),
  }

  const mouthStyle = {
    width: pc(mouth.sizeX),
    height: pc(mouth.sizeY),
    top: pc(mouth.y),
    left: pc(mouth.x),
    borderColor: colorVeryDark(misc.hue),
    backgroundColor: colorVeryVeryDark(misc.hue),
    borderTopLeftRadius: pc(mouth.topLeftRadius),
    borderTopRightRadius: pc(mouth.topRightRadius),
    borderBottomLeftRadius: pc(mouth.bottomLeftRadius),
    borderBottomRightRadius: pc(mouth.bottomRightRadius),
    boxShadow: `0px 0px 5px ${colorVeryDark(misc.hue)}`,
  }

  return (
    <div className="creature-body-wrapper" style={bodyWrapperStyle}>
      <div className="creature-body" style={bodyStyle}>
        <div className="creature-eye-left" style={eyeLeftStyle}>
          <div className="creature-eye-pupil-wrapper">
            <div className="creature-eye-pupil" style={pupilStyle} />
          </div>
        </div>
        <div className="creature-eye-right" style={eyeRightStyle}>
          <div className="creature-eye-pupil-wrapper">
            <div className="creature-eye-pupil" style={pupilStyle} />
          </div>
        </div>
        <div className="creature-mouth" style={mouthStyle} />
      </div>
    </div>
  );
}