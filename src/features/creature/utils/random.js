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

