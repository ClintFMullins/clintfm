export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomInsideBounds(
  minPosition,
  maxPosition,
  rawOptions = {},
) {
  const opts = {
    minSize: 0,
    ...rawOptions,
  }

  const position = randomInRange(minPosition, maxPosition - opts.minSize);
  const size = randomInRange(position + opts.minSize, maxPosition) - position;

  return [
    position,
    size,
  ];
}

export function mateRandomInsideBounds(
  maxPosition,
  position1,
  position2,
  size1,
  size2,
) {
  const position = randomChoice(position1, position2);
  const size = Math.min(
    randomChoice(size1, size2),
    maxPosition - position,
  );

  return [
    position,
    size,
  ];
}

export function randomChoice(...args) {
  const numberOfChoices = args.length;
  const randomChoiceIndex = Math.floor(Math.random() * numberOfChoices);
  return args[randomChoiceIndex];
}

