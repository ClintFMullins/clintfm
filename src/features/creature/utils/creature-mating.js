import { mateRandomInsideBounds, randomChoice } from './random';
import { PERCENT_MAX } from './creature-generation';

// TODO: Organize all this and make it sane.
// We want to support mutations, less specific trait pulling, trait mix intertia,
// and generally make it easier to deal with feature boundaries. Too many top level % involved here.
export function mateCreatures(creature1, creature2) {
  const bodyRadius = randomChoice(creature1.body.radius, creature2.body.radius);
  const bodyWidth = randomChoice(creature1.body.width, creature2.body.width);
  const bodyHeight = randomChoice(creature1.body.height, creature2.body.height);

  const [mouthX, mouthSizeX] = mateRandomInsideBounds(
    PERCENT_MAX,
    creature1.mouth.x,
    creature2.mouth.x,
    creature1.mouth.sizeX,
    creature2.mouth.sizeX,
  )

  const [mouthY, mouthSizeY] = mateRandomInsideBounds(
    PERCENT_MAX,
    creature1.mouth.y,
    creature2.mouth.y,
    creature1.mouth.sizeY,
    creature2.mouth.sizeY,
  )

  const bothEyesSizeX = randomChoice(creature1.eyes.sizeX, creature2.eyes.sizeX);
  const bothEyesSizeY = randomChoice(creature1.eyes.sizeY, creature2.eyes.sizeY);

  const minEyeXRange = bothEyesSizeX * 2 + 1;
  const bothEyesXRange = Math.max(
    randomChoice(creature1.eyes.bothEyesXRange, creature2.eyes.bothEyesXRange),
    minEyeXRange
  );
  const eyeSpacing = bothEyesXRange - minEyeXRange;

  const maxEyeLeftX = PERCENT_MAX - bothEyesXRange;
  const eyeLeftX = Math.min(
    randomChoice(creature1.eyes.leftX, creature2.eyes.leftX),
    maxEyeLeftX,
  );

  const eyeRightX = eyeLeftX + bothEyesSizeX + eyeSpacing;

  const maxBothEyesY = mouthY - bothEyesSizeY - 4;
  const bothEyesY = Math.min(
    randomChoice(creature1.eyes.leftY, creature2.eyes.leftY),
    maxBothEyesY
  );
  const bothEyesRadius = randomChoice(creature1.eyes.radius, creature2.eyes.radius);

  const [pupilX, pupilSizeX] = mateRandomInsideBounds(
    PERCENT_MAX,
    creature1.eyes.pupilX,
    creature2.eyes.pupilX,
    creature1.eyes.pupilSizeX,
    creature2.eyes.pupilSizeX,
  )
  const [pupilY, pupilSizeY] = mateRandomInsideBounds(
    PERCENT_MAX,
    creature1.eyes.pupilY,
    creature2.eyes.pupilY,
    creature1.eyes.pupilSizeY,
    creature2.eyes.pupilSizeY,
  )

  const pupilRadius = randomChoice(creature1.eyes.pupilRadius, creature2.eyes.pupilRadius);

  const mouthTopLeftRadius = randomChoice(creature1.mouth.topLeftRadius, creature2.mouth.topLeftRadius);
  const mouthTopRightRadius = randomChoice(creature1.mouth.topRightRadius, creature2.mouth.topRightRadius);
  const mouthBottomLeftRadius = randomChoice(creature1.mouth.bottomLeftRadius, creature2.mouth.bottomLeftRadius);
  const mouthBottomRightRadius = randomChoice(creature1.mouth.bottomRightRadius, creature2.mouth.bottomRightRadius);
  
  const hue = randomChoice(creature1.misc.hue, creature2.misc.hue);

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

