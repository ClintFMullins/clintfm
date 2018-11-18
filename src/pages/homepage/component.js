import React, { useState, useEffect } from 'react';
import { getDayNightDetails } from '../../utils/time';
import { Moon } from './components/moon/component';
import './style.css';

const TIME_UPDATE_INTERVAL_MS = 20 * 1000;

export function Homepage() {
  const dayNightDetails = intervalUpdatingDayNightDetails(TIME_UPDATE_INTERVAL_MS)

  return (
    <div>
      <Moon translate={dayNightDetails.moonHeight} />
    </div>
  );
}

function intervalUpdatingDayNightDetails(intervalMs) {
  const [dayNightDetails, setDayNightDetails] = useState(getDayNightDetails());

  useEffect(() => {
    setInterval(() => {
      setDayNightDetails(getDayNightDetails());
    }, intervalMs);
  }, []);

  return dayNightDetails;
}
