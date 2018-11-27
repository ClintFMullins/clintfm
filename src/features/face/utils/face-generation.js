function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const PERCENT_MAX = 99;
const PERCENT_MIN = 1;

const MOUTH_MIN = 30;
const MIN_EYE_RANGE_SIZE = 10;

export function generateFace() {
  const mouthSizeX = randomInRange(PERCENT_MIN, PERCENT_MAX);
  const mouthSizeY = mouthSizeX / 2;
  const mouthX = randomInRange(PERCENT_MIN, PERCENT_MAX - mouthSizeX);
  const mouthY = randomInRange(MOUTH_MIN, PERCENT_MAX - mouthSizeY);

  const bothEyesXRange = randomInRange(MIN_EYE_RANGE_SIZE, PERCENT_MAX);
  const eyeSpacing = randomInRange(0, bothEyesXRange - MIN_EYE_RANGE_SIZE);
  const bothEyesX = randomInRange(PERCENT_MIN, PERCENT_MAX - bothEyesXRange);
  const bothEyesSizeX = (bothEyesXRange - eyeSpacing) / 2;
  const eyeLeftX = bothEyesX;
  const eyeRightX = eyeLeftX + bothEyesSizeX + eyeSpacing;
  const bothEyesY = randomInRange(PERCENT_MIN, mouthY);
  const bothEyesSizeY = randomInRange(bothEyesY, mouthY) - bothEyesY;
  
  return {
    mouth: {
      sizeX: mouthSizeX,
      sizeY: mouthSizeY,
      x: mouthX,
      y: mouthY,
    },
    eyes: {
      sizeX: bothEyesSizeX,
      sizeY: bothEyesSizeY,
      leftX: eyeLeftX,
      leftY: bothEyesY,
      rightX: eyeRightX,
      rightY: bothEyesY,
    }
  }
}