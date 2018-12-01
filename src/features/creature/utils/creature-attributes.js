import { ValueWithInfluence } from './value-influnce';
import { EYE_SIZE_VALUES, BODY_RADIUS_VALUES, BODY_SIDE_SIZE_VALUES, MOUTH_SIDE_SIZE_VALUES, MOUTH_BORDER_MIN, MOUTH_BORDER_MAX } from './creature-generation';

// This needs to be completely redone to make sense.
export function getCreatureAttributes(creatureData) {
  const { body, mouth, eyes, misc } = creatureData;

  const sumMouthSquare = mouth.topLeftRadius + mouth.topRightRadius + mouth.bottomLeftRadius + mouth.bottomRightRadius;

  const aggression = new ValueWithInfluence(50);
  aggression.addInfluence({
    value: mouth.sizeX,
    min: MOUTH_SIDE_SIZE_VALUES.min,
    max: MOUTH_SIDE_SIZE_VALUES.max,
    multiplier: 2,
  });
  aggression.addInfluence({
    value: mouth.sizeY,
    min: MOUTH_SIDE_SIZE_VALUES.min,
    max: MOUTH_SIDE_SIZE_VALUES.max,
    multiplier: 2,
  });
  aggression.addInfluence({
    value: sumMouthSquare,
    min: MOUTH_BORDER_MIN * 4,
    max: MOUTH_BORDER_MAX * 4,
    multiplier: 1,
  });

  const defense = new ValueWithInfluence(50);
  defense.addInfluence({
    value: body.width * body.height,
    min: BODY_SIDE_SIZE_VALUES.min * BODY_SIDE_SIZE_VALUES.min,
    max:  BODY_SIDE_SIZE_VALUES.max * BODY_SIDE_SIZE_VALUES.max,
    multiplier: 4,
  });
  defense.addInfluence({
    value: body.radius,
    min: BODY_RADIUS_VALUES.min,
    max: BODY_RADIUS_VALUES.max,
    multiplier: 2,
  });

  const charm = new ValueWithInfluence(50);
  charm.addInfluence({
    value: (EYE_SIZE_VALUES.max * EYE_SIZE_VALUES.max) - eyes.sizeX * eyes.sizeY,
    min: EYE_SIZE_VALUES.min * EYE_SIZE_VALUES.min,
    max: EYE_SIZE_VALUES.max * EYE_SIZE_VALUES.max,
    multiplier: 4,
  });
  charm.addInfluence({
    value: (MOUTH_BORDER_MAX * 4) - sumMouthSquare,
    min: MOUTH_BORDER_MIN * 4,
    max: MOUTH_BORDER_MAX * 4,
    multiplier: 1,
  });

  const speed = new ValueWithInfluence(50);
  speed.addInfluence({
    value: (BODY_SIDE_SIZE_VALUES.max * BODY_SIDE_SIZE_VALUES.max) - body.width * body.height,
    min: BODY_SIDE_SIZE_VALUES.min * BODY_SIDE_SIZE_VALUES.min,
    max: BODY_SIDE_SIZE_VALUES.max * BODY_SIDE_SIZE_VALUES.max,
    multiplier: 3,
  });
  speed.addInfluence({
    value: eyes.sizeX * eyes.sizeY,
    min: EYE_SIZE_VALUES.min * EYE_SIZE_VALUES.min,
    max: EYE_SIZE_VALUES.max * EYE_SIZE_VALUES.max,
    multiplier: 4,
  });

  const intimidate = new ValueWithInfluence(50);
  intimidate.addInfluence({
    value: 300 - (eyes.leftX + eyes.leftY + eyes.rightX + eyes.rightY),
    min: 0,
    max: 300, // TODO: this isn't accurate
    multiplier: 5,
  });

  const volume = new ValueWithInfluence(50);
  volume.addInfluence({
    value: mouth.sizeX,
    min: MOUTH_SIDE_SIZE_VALUES.min,
    max: MOUTH_SIDE_SIZE_VALUES.max,
    multiplier: 2,
  });
  volume.addInfluence({
    value: mouth.sizeY,
    min: MOUTH_SIDE_SIZE_VALUES.min,
    max: MOUTH_SIDE_SIZE_VALUES.max,
    multiplier: 2,
  });
  volume.addInfluence({
    value: eyes.pupilSizeX + eyes.pupilSizeY,
    min: 15 * 15,
    max: 100 * 100,
    multiplier: 2,
  });

  const intuition = new ValueWithInfluence(50);
  intuition.addInfluence({
    value: eyes.leftX + eyes.leftY + eyes.rightX + eyes.rightY,
    min: 0,
    max: 300, // TODO: this isn't accurate
    multiplier: 5,
  });

  return {
    type: getClosestType(misc.hue),
    aggression: aggression.getValue() , // mouth big // mouth square
    defense: defense.getValue() , // body big // body square
    charm: charm.getValue() , // eye small // mouth round
    speed: speed.getValue() , // body small // eyes big
    intimidate: intimidate.getValue() , // eyes high // eyes forward
    volume: volume.getValue() , // mouth big // pupil large
    intuition: intuition.getValue() , // eyes low // pupil small
  }
}

// If I ever make a battle system,
// this is not good enough. 
// 0 -   red        - Fire
// 60 -  yellow     - Sun
// 120 - green      - Forest
// 180 - cyan       - Wind
// 240 - deep blue  - Water
// 300 - purple     - Spirit
function getClosestType(hue) {
  if (hue >= 30 && hue < 90) {
    return 'sun';
  } else if (hue >= 90 && hue < 150) {
    return 'forest';
  } else if (hue >= 150 && hue < 210) {
    return 'wind';
  } else if (hue >= 210 && hue < 270) {
    return 'water';
  } else if (hue >= 270 && hue < 330) {
    return 'spirit';
  } else {
    return 'fire';
  }
}
