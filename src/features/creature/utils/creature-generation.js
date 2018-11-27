import { getRandomInsideBounds, randomInRange } from './random';

const PERCENT_MAX = 99;
const PERCENT_MIN = 1;

const MOUTH_MIN = 30;
const MOUTH_BORDER_MAX = 50;
const MOUTH_BORDER_MIN = 5;

const MIN_EYE_RANGE_SIZE = 10;

const PUPIL_MIN = 10;

export function generateCreatureData() {
  const bodyRadius = randomInRange(0, 5);
  const bodyWidth = randomInRange(0.5, 1);
  const bodyHeight = randomInRange(0.5, 1);

  const [mouthX, mouthSizeX] = getRandomInsideBounds(PERCENT_MIN, PERCENT_MAX, { minSize: 5 })
  const [mouthY, mouthSizeY] = getRandomInsideBounds(MOUTH_MIN, PERCENT_MAX, { minSize: 5 })

  const bothEyesXRange = randomInRange(MIN_EYE_RANGE_SIZE, PERCENT_MAX);
  const eyeSpacing = randomInRange(0, bothEyesXRange - MIN_EYE_RANGE_SIZE);
  const bothEyesX = randomInRange(PERCENT_MIN, PERCENT_MAX - bothEyesXRange);
  const bothEyesSizeX = (bothEyesXRange - eyeSpacing) / 2;
  const eyeLeftX = bothEyesX;
  const eyeRightX = eyeLeftX + bothEyesSizeX + eyeSpacing;
  const [bothEyesY, bothEyesSizeY] = getRandomInsideBounds(PERCENT_MIN, mouthY, { minSize: 10 })
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