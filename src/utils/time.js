export function getDayNightDetails() {
  const currentTime = new Date();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  return calculateDayNightDetails(hours, minutes)
}

const DAY_SCALE = 24;
const DAY_SCALE_HALF = DAY_SCALE / 2;
const DAY_SCALE_FOURTH = DAY_SCALE / 4;

export function calculateDayNightDetails(hours, minutes) {
  // 0-12 = Night, 12-24 = Day, easier for calculations
  const tiltedHour = (hours + DAY_SCALE_FOURTH) % DAY_SCALE;
  const referenceHour = tiltedHour % (DAY_SCALE_HALF);
  const peakDayNightTime = DAY_SCALE_FOURTH;
  const minuteDecimal = minutes === 0 ? 0 : (minutes / 60);
  const distanceFromPeak = Math.abs(peakDayNightTime - (referenceHour + minuteDecimal));
  const sunMoonHeightPercent = (peakDayNightTime - distanceFromPeak) / peakDayNightTime * 100;

  const dayNightDetails = {};

  if (tiltedHour >= DAY_SCALE_HALF) {
    dayNightDetails.sunHeight = sunMoonHeightPercent;
  } else {
    dayNightDetails.moonHeight = sunMoonHeightPercent;
    dayNightDetails.starVisibilty = sunMoonHeightPercent;
  }

  return dayNightDetails;
}