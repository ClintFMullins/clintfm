const CIRCLE_DEGREES = 360;

export function getCircleAverage(hues) {
  const sortedHues = sortedHuesByValue(hues);
  const sortedByDistanceHues = sortedHuesByDistance(sortedHues);
  const adjustedHues = adjustedHuesFunc(sortedByDistanceHues);
  return adjustedHuesAverage(adjustedHues);
};

export function getInfluencedHue(originalHue, influnceHue, velocity) {
  if (originalHue === influnceHue) {
    return parseInt(originalHue);
  }

  let influencedOriginalAdjustedHue;
  const hues = [originalHue, influnceHue];

  const sortedHues = sortedHuesByValue(hues);
  const sortedByDistanceHues = sortedHuesByDistance(sortedHues);
  const adjustedHues = adjustedHuesFunc(sortedByDistanceHues);

  if (adjustedHues[0] % CIRCLE_DEGREES === originalHue) {
    influencedOriginalAdjustedHue = adjustedHues[0] + velocity;
    if (influencedOriginalAdjustedHue > adjustedHues[1]) {
      influencedOriginalAdjustedHue = adjustedHues[1];
    }
  } else {
    influencedOriginalAdjustedHue = adjustedHues[1] - velocity;
    if (influencedOriginalAdjustedHue < adjustedHues[0]) {
      influencedOriginalAdjustedHue = adjustedHues[0];
    }
  }
  return parseInt(influencedOriginalAdjustedHue % CIRCLE_DEGREES);
}

function sortedHuesByValue(hues) {
  return hues.sort(function(hue1, hue2) {
    return hue1 - hue2;
  });
};

function sortedHuesByDistance(sortedHues) {
  var distances = [];

  for (var squareIndex = 1; squareIndex < sortedHues.length; squareIndex++) {
    var distance = sortedHues[squareIndex] - sortedHues[squareIndex - 1];
    distances.push(distance);
  };

  const distanceFromLastToFirst = (CIRCLE_DEGREES - sortedHues[sortedHues.length - 1]) + sortedHues[0];
  distances.unshift(distanceFromLastToFirst);

  const maxDistance = Math.max.apply(null, distances);
  const maxDistanceIndex = distances.indexOf(maxDistance);

  const sortedByDistanceHues = sortedHues.slice(maxDistanceIndex, sortedHues.length);
  return sortedByDistanceHues.concat(sortedHues.slice(0, maxDistanceIndex));
};

function adjustedHuesFunc(sortedByDistanceHues) {
  let passedZero = false;
  const adjustedHues = sortedByDistanceHues.slice(0);

  for (var index = 1; index < sortedByDistanceHues.length; index++) {
    if (sortedByDistanceHues[index] < sortedByDistanceHues[index - 1]) {
      passedZero = true;
    }

    adjustedHues[index] += passedZero ? CIRCLE_DEGREES : 0;
  }

  return adjustedHues;
};

function adjustedHuesAverage(adjustedHues) {
  const averageAdjustedHue = adjustedHues.reduce(function(prev, current) {
    return prev + current;
  }) / adjustedHues.length;

  return parseInt(averageAdjustedHue % CIRCLE_DEGREES);
};