import React from 'react';
import { useChangingDayNightDetails } from '../../../../utils/time';
import { Landscape } from '../landscape/component';

export function QuickTime(props) {
  const dayNightDetails = useChangingDayNightDetails();

  return (
    <Landscape {...dayNightDetails} size={props.size} />
  )
}