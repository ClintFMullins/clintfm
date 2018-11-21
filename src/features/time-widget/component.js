import React, { useState } from 'react';
import { useRenderInterval } from '../../utils/render-interval';
import { useChangingDayNightDetails, getDayNightDetails } from '../../utils/time';
import { Landscape } from './components/landscape/component';

const TIME_UPDATE_INTERVAL_MS = 20 * 1000;

export function TimeWidget(props) {
  const [userIsFocused, setUserIsFocused] = useState(true);
  const currentTimeDetails = useRenderInterval(TIME_UPDATE_INTERVAL_MS, getDayNightDetails);
  const showCurrentTime = userIsFocused && !props.alwaysRun;
  const rotatingDetails = useChangingDayNightDetails(!showCurrentTime);

  const width = props.size ? props.size : props.width;
  const height = props.size ? props.size : props.height;

  const childProps = {
    height,
    width,
    isRound: props.isRound,
    ...(showCurrentTime ? currentTimeDetails : rotatingDetails),
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