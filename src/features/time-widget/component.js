import React from 'react';
import { renderInterval } from '../../utils/render-interval';
import { getDayNightDetails, getChangingDayNightDetails } from '../../utils/time';
import { SkySphere } from './components/sky-sphere/component';
import { Stars } from './components/stars/component';
import './styles.css';

const TIME_UPDATE_INTERVAL_MS = 1 * 1000;

export function TimeWidget(props) {
  const pixelSize = `${props.size}px`;

  const wrapperStyle = {
    width: pixelSize,
    height: pixelSize,
    border: 'solid black 2px',
  }

  // const {
  //   hour,
  //   skySpherePercentX,
  //   skySpherePercentY,
  //   isDay,
  //   nightPercent,
  //   morningPercent,
  //   noonPercent,
  //   eveningPercent,
  // } = renderInterval(TIME_UPDATE_INTERVAL_MS, getDayNightDetails);

  const {
    hour,
    skySpherePercentX,
    skySpherePercentY,
    isDay,
    nightPercent,
    morningPercent,
    noonPercent,
    eveningPercent,
  } = getChangingDayNightDetails();

  return (
    <div className="time-widget-wrapper" style={wrapperStyle}>
      <div className="sky">
        <div className="light-filter time-sky-night" style={{ opacity: nightPercent }} />
        <div className="light-filter time-sky-morning" style={{ opacity: morningPercent }} />
        <div className="light-filter time-sky-noon" style={{ opacity: noonPercent }} />
        <div className="light-filter time-sky-evening" style={{ opacity: eveningPercent }} />
      </div>
      <div style={{ opacity: nightPercent }}>
        <Stars size={props.size} />
      </div>
      <SkySphere
        hour={hour}
        percentX={skySpherePercentX}
        percentY={skySpherePercentY}
        isDay={isDay}
        size={props.size / (isDay ? 10 : 20)}
      />
      <div className="time-land-wrapper">
        <div className="light-filter time-land-night" style={{ opacity: nightPercent }} />
        <div className="light-filter time-land-morning" style={{ opacity: morningPercent }} />
        <div className="light-filter time-land-noon" style={{ opacity: noonPercent }} />
        <div className="light-filter time-land-evening" style={{ opacity: eveningPercent }} />
      </div>
    </div>
  )
}