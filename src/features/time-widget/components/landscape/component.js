import React from 'react';
import { SkySphere } from '../sky-sphere/component';
import { Stars } from '../stars/component';
import './styles.css';

export function Landscape(props) {
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
    width,
    height,
    isRound,
  } = props;

  const widthSize = `${width}px`;
  const heightSize = `${height}px`;
  const borderSize = Math.max(1, Math.min(3, heightSize / 50));

  const wrapperStyle = {
    width: widthSize,
    height: heightSize,
    border: `solid black ${borderSize}px`,
    borderRadius: isRound ? '100%' : '0',
  }

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
        <Stars width={width} height={height} />
      </div>
      <SkySphere
        hour={hour}
        percentX={skySpherePercentX}
        percentY={skySpherePercentY}
        isDay={isDay}
        size={height / 6}
        width={width}
        height={height}
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