import { getRandomInsideBounds, randomInRange } from './random';

export const PERCENT_MAX = 99;
const PERCENT_MIN = 1;

const MOUTH_MIN = 30;
export const MOUTH_BORDER_MAX = 50;
export const MOUTH_BORDER_MIN = 5;

const MIN_EYE_RANGE_SIZE = 10;

const PUPIL_MIN = 10;

export const MOUTH_SIDE_SIZE_VALUES = {
  min: 5,
  max: 70,
}

export const BODY_SIDE_SIZE_VALUES = {
  min: 30,
  max: 98,
}

export const BODY_RADIUS_VALUES = {
  min: 0,
  max: 40,
}

export const EYE_SIZE_VALUES = {
  min: 10,
  max: (PERCENT_MAX - MOUTH_SIDE_SIZE_VALUES.min) / 2,
}

export function generateCreatureData() {
  const bodyRadius = randomInRange(BODY_RADIUS_VALUES.min, BODY_RADIUS_VALUES.max);
  const bodyWidth = randomInRange(BODY_SIDE_SIZE_VALUES.min, BODY_SIDE_SIZE_VALUES.max);
  const bodyHeight = randomInRange(BODY_SIDE_SIZE_VALUES.min, BODY_SIDE_SIZE_VALUES.max);

  const [mouthX, mouthSizeX] = getRandomInsideBounds(5, PERCENT_MAX, { minSize: 5 })
  const [mouthY, mouthSizeY] = getRandomInsideBounds(MOUTH_MIN, PERCENT_MAX, { minSize: 5 })

  const bothEyesXRange = randomInRange(MIN_EYE_RANGE_SIZE, PERCENT_MAX);
  const eyeSpacing = randomInRange(0, bothEyesXRange - MIN_EYE_RANGE_SIZE);
  const eyeLeftX = randomInRange(PERCENT_MIN, PERCENT_MAX - bothEyesXRange);
  const bothEyesSizeX = (bothEyesXRange - eyeSpacing) / 2;
  const eyeRightX = eyeLeftX + bothEyesSizeX + eyeSpacing;
  const [bothEyesY, bothEyesSizeY] = getRandomInsideBounds(PERCENT_MIN, mouthY - 4, { minSize: 10 })
  const bothEyesRadius = randomInRange(3, 10);

  const [pupilX, pupilSizeX] = getRandomInsideBounds(PUPIL_MIN, PERCENT_MAX, { minSize: 15 })
  const [pupilY, pupilSizeY] = getRandomInsideBounds(PUPIL_MIN, PERCENT_MAX, { minSize: 15 })
  const pupilRadius = randomInRange(3, 20);

  const mouthTopLeftRadius = randomInRange(MOUTH_BORDER_MIN, MOUTH_BORDER_MAX);
  const mouthTopRightRadius = randomInRange(MOUTH_BORDER_MIN, MOUTH_BORDER_MAX);
  const mouthBottomLeftRadius = randomInRange(MOUTH_BORDER_MIN, MOUTH_BORDER_MAX);
  const mouthBottomRightRadius = randomInRange(MOUTH_BORDER_MIN, MOUTH_BORDER_MAX);
  
  const hue = randomInRange(0, 360);

  return {
    body: {
      width: bodyWidth,
      height: bodyHeight,
      radius: bodyRadius,
    },
    mouth: {
      sizeX: mouthSizeX,
      sizeY: mouthSizeY,
      x: mouthX,
      y: mouthY,
      topLeftRadius: mouthTopLeftRadius,
      topRightRadius: mouthTopRightRadius,
      bottomLeftRadius: mouthBottomLeftRadius,
      bottomRightRadius: mouthBottomRightRadius,
    },
    eyes: {
      bothEyesXRange, // used for ease of mating
      sizeX: bothEyesSizeX,
      sizeY: bothEyesSizeY,
      leftX: eyeLeftX,
      leftY: bothEyesY,
      rightX: eyeRightX,
      rightY: bothEyesY,
      radius: bothEyesRadius,
      pupilSizeX,
      pupilSizeY,
      pupilX,
      pupilY,
      pupilRadius,
    },
    misc: {
      hue,
    }
  }
}