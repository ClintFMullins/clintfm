// This needs to be completely redone to make sense.
export function getCreatureAttributes(creatureData) {
  const { body, mouth, eyes, misc } = creatureData;

  const factorMouthBig = (mouth.sizeX + mouth.sizeY) * 4;
  const factorMouthSquare = (mouth.topLeftRadius + mouth.topRightRadius + mouth.bottomLeftRadius + mouth.bottomRightRadius) / 4;
  const aggression = Math.floor(factorMouthBig - factorMouthSquare);

  const factorBodyBig = (body.width * 100) + (body.height * 100);
  const factorBodySquare = body.radius * 4;
  const defense = Math.floor(factorBodyBig + factorBodySquare);

  const factorEyeBig = (eyes.sizeX + eyes.sizeY) * 4;
  const charm = Math.floor(400 - factorEyeBig - factorMouthSquare);

  const speed = Math.floor(200 + factorEyeBig - factorBodyBig);

  const factorEyeForwardness = eyes.leftX + eyes.leftY + eyes.rightX + eyes.rightY;
  const intimidate = Math.floor(300 - factorEyeForwardness);

  const volume = Math.floor(factorMouthBig + eyes.pupilX + eyes.pupilY);

  const factorEyePupilSize = eyes.pupilSizeX + eyes.pupilSizeY;
  const intuition = Math.floor(factorEyeForwardness - factorEyePupilSize);

  return {
    type: getClosestType(misc.hue),
    aggression, // mouth big // mouth square
    defense, // body big // body square
    charm, // eye small // mouth round
    speed, // body small // eyes big
    intimidate, // eyes high // eyes forward
    volume, // mouth big // pupil large
    intuition, // eyes low // pupil small
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
