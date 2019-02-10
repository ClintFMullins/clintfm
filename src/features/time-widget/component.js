import React, { useState } from 'react';
import { useInterval } from '../../utils/render-interval';
import { useChangingDayNightDetails, getDayNightDetails } from '../../utils/time';
import { Landscape } from './components/landscape/component';

const TIME_UPDATE_INTERVAL_MS = 20 * 1000;

export function TimeWidget(props) {
  const [userIsFocused, setUserIsFocused] = useState(true);
  const [dayNightDetails, setDayNightDetails] = useState(() => getDayNightDetails());
  const showCurrentTime = userIsFocused && !props.alwaysRun;
  const rotatingDetails = useChangingDayNightDetails(!showCurrentTime);

  useInterval(() => {
    setDayNightDetails(getDayNightDetails());
  }, showCurrentTime ? TIME_UPDATE_INTERVAL_MS : null);

  const width = props.size ? props.size : props.width;
  const height = props.size ? props.size : props.height;

  const childProps = {
    height,
    width,
    isRound: props.isRound,
    ...(showCurrentTime ? dayNightDetails : rotatingDetails),
  }

  return (
    <div
      onMouseEnter={() => setUserIsFocused(false)}
      onMouseLeave={() => setUserIsFocused(true)}
    >
      <Landscape {...childProps} />
    </div>
  )
}