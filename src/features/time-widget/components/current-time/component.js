import React from 'react';
import { useRenderInterval } from '../../../../utils/render-interval';
import { getDayNightDetails } from '../../../../utils/time';
import { Landscape } from '../landscape/component';

const TIME_UPDATE_INTERVAL_MS = 20 * 1000;

export function CurrentTime(props) {
  const dayNightDetails = useRenderInterval(TIME_UPDATE_INTERVAL_MS, getDayNightDetails);

  return (
    <Landscape {...dayNightDetails} {...props} />
  )
}