import React from 'react';
import { renderInterval } from '../../utils/render-interval';
import { getDayNightDetails, getChangingDayNightDetails } from '../../utils/time';
import { SkySphere } from './components/sky-sphere/component';
import { Stars } from './components/stars/component';
import './styles.css';

const TIME_UPDATE_INTERVAL_MS = 20 * 1000;

export function TimeWidget(props) {
  const pixelSize = `${props.size}px`;

  const borderSize = Math.max(1, Math.min(3, props.size / 50));

  const wrapperStyle = {
    width: pixelSize,
    height: pixelSize,
    border: `solid black ${borderSize}px`,
  }

  const {
    hour,
    skySpherePercentX,
    skySpherePercentY,
    isDay,
    nightPercent,
    nightPeakPercent,
    morningPercent,
    morningPeakPercent,
    noonPercent,
    noonPeakPercent,
    eveningPercent,
    eveningPeakPercent,
  } = renderInterval(TIME_UPDATE_INTERVAL_MS, getDayNightDetails);

  // const {
  //   hour,
  //   skySpherePercentX,
  //   skySpherePercentY,
  //   isDay,
  //   nightPercent,
  //   nightPeakPercent,
  //   morningPercent,
  //   morningPeakPercent,
  //   noonPercent,
  //   noonPeakPercent,
  //   eveningPercent,
  //   eveningPeakPercent,
  // } = getChangingDayNightDetails();

  return (
    <div className="time-widget-wrapper" style={wrapperStyle}>
      <div className="sky">
        <div className="light-filter time-sky-night" style={{ opacity: nightPercent }} />
        <div className="light-filter time-sky-night-peak" style={{ opacity: nightPeakPercent }} />
        <div className="light-filter time-sky-morning" style={{ opacity: morningPercent }} />
        <div className="light-filter time-sky-morning-peak" style={{ opacity: morningPeakPercent }} />
        <div className="light-filter time-sky-noon" style={{ opacity: noonPercent }} />
        <div className="light-filter time-sky-noon-peak" style={{ opacity: noonPeakPercent }} />
        <div className="light-filter time-sky-evening" style={{ opacity: eveningPercent }} />
        <div className="light-filter time-sky-evening-peak" style={{ opacity: eveningPeakPercent }} />
      </div>
      <div style={{ opacity: (nightPercent + nightPeakPercent) }}>
        <Stars size={props.size} />
      </div>
      <SkySphere
        hour={hour}
        percentX={skySpherePercentX}
        percentY={skySpherePercentY}
        isDay={isDay}
        size={props.size / 6}
        sunshine={isDay}
      />
      <div className="time-land-wrapper">
        <div className="land light-filter time-land-night" style={{ opacity: nightPercent }} />
        <div className="land light-filter time-land-night-peak" style={{ opacity: nightPeakPercent }} />
        <div className="land light-filter time-land-morning" style={{ opacity: morningPercent }} />
        <div className="land light-filter time-land-morning-peak" style={{ opacity: morningPeakPercent }} />
        <div className="land light-filter time-land-noon" style={{ opacity: noonPercent }} />
        <div className="land light-filter time-land-noon-peak" style={{ opacity: noonPeakPercent }} />
        <div className="land light-filter time-land-evening" style={{ opacity: eveningPercent }} />
        <div className="land light-filter time-land-evening-peak" style={{ opacity: eveningPeakPercent }} />
      </div>
    </div>
  )
}