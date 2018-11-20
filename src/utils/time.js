import { useEffect, useState } from 'react';

const DAY_SCALE = 24;
const DAY_SCALE_HALF = DAY_SCALE / 2;
const DAY_SCALE_FOURTH = DAY_SCALE / 4;

export function getDayNightDetails() {
  const currentTime = new Date();

  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();

  return calculateDayNightDetails(hour, minute)
}

/**
 * Runs quickly, good for testing
 */
export function useChangingDayNightDetails() {
  const [hour, setHour] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHour((hour + 1) % DAY_SCALE);
    }, 100);

    return () => {
      clearInterval(interval);
    }
  });

  return calculateDayNightDetails(hour, 0);
}

export function calculateDayNightDetails(hour, minute) {
  // 0-12 = Night, 12-24 = Day, easier for calculations
  const tiltedHour = (hour + DAY_SCALE_FOURTH) % DAY_SCALE;
  const referenceHour = tiltedHour % (DAY_SCALE_HALF);
  const peakDayNightTime = DAY_SCALE_FOURTH;
  const minuteDecimal = minute === 0 ? 0 : (minute / 60);
  const totalReferenceTime = referenceHour + minuteDecimal;
  const distanceFromPeak = Math.abs(peakDayNightTime - totalReferenceTime);
  const skySpherePercentY = (peakDayNightTime - distanceFromPeak) / peakDayNightTime * 100;
  const skySpherePercentX = (totalReferenceTime * 100 / 12);

  const dayPercents = getSectionOpacity(tiltedHour, [0, 3, 6, 9, 12, 15, 18, 21], 4);

  return {
    isDay: tiltedHour >= DAY_SCALE_HALF,
    skySpherePercentY,
    skySpherePercentX,
    eveningPercent: dayPercents[0],
    eveningPeakPercent: dayPercents[1],
    nightPercent: dayPercents[2],
    nightPeakPercent: dayPercents[3],
    morningPercent: dayPercents[4],
    morningPeakPercent: dayPercents[5],
    noonPercent: dayPercents[6],
    noonPeakPercent: dayPercents[7],
    hour,
  };
}

/**
 * Given the params below this returns a parallel array of decimals based on
 * the closeness to each given section.
 * 
 * @param {number} hour
 * @param {number[]} sectionPeaks 
 * @param {number} maxDistance 
 */
export function getSectionOpacity(currentHour, sectionPeaks, maxDistance) {
  return sectionPeaks.map((sectionNum) => {
    const distanceDirect = Math.abs(sectionNum - currentHour);
    const distanceIndirect = sectionNum > currentHour ?
      (24 - sectionNum) + currentHour :
      (24 - currentHour) + sectionNum;
    const distance = Math.min(distanceDirect, distanceIndirect);

    return distance > maxDistance ? 0 : (maxDistance - distance) / maxDistance;
  });
}