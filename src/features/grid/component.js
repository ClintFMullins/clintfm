import React, { useRef, useEffect, useState } from 'react';

const CIRCLE_DEGREES = 360;

function getCircleAverage(hues) {
  if (!hues.length) {
    throw("getCircleAverage given empty array");
  }

  const sortedHues = sortedHuesByValue(hues);
  const sortedByDistanceHues = sortedHuesByDistance(sortedHues);
  const adjustedHues = adjustedHuesFunc(sortedByDistanceHues);
  return adjustedHuesAverage(adjustedHues);
};

function getInfluencedHue(originalHue, influnceHue, velocity) {
  if (originalHue === influnceHue) {
    return parseInt(originalHue);
  }

  let influencedOriginalAdjustedHue;
  const hues = [originalHue, influnceHue];

  const sortedHues = sortedHuesByValue(hues);
  const sortedByDistanceHues = sortedHuesByDistance(sortedHues);
  const adjustedHues = adjustedHuesFunc(sortedByDistanceHues);

  if (adjustedHues[0] % CIRCLE_DEGREES == originalHue) {
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

function fillCanvasSquare(context, x1, y1, x2, y2, hue) {
  context.beginPath();
  context.rect(x1, y1, x2, y2);
  context.fillStyle = `hsl(${hue}, 100%, 80%)`;
  context.fill();

  context.fillStyle = `black`;
  context.fillText(hue,x1,y1 + 50);
}

function initializeGrid(rowCount, columnCount) {
  const tempGrid = [];
  for (let rowIndex = 0; rowIndex < columnCount; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < rowCount; columnIndex++) {
      const randomHue = parseInt(Math.random() * 359);

      row.push(randomHue);
    }
    tempGrid.push(row);
  }
  return tempGrid;
};

function paintGrid(context, grid, squareSize) {
  let xPosition = 0;
  let yPosition = 0;

  grid.forEach((row) => {
    row.forEach((columnSquareHue) => {
      fillCanvasSquare(
        context,
        xPosition,
        yPosition,
        xPosition + squareSize,
        yPosition + squareSize,
        columnSquareHue,
      )

      yPosition += squareSize;
    });

    xPosition += squareSize;
    yPosition = 0;
  });
}

function getAdjacent(grid, rowIndex, columnIndex, rowMax, columnMax) {
  const adjacentSquares = [];
  if (rowIndex > 0 && columnIndex > 0) {
    adjacentSquares.push(grid[rowIndex - 1][columnIndex - 1]);
  }

  if (rowIndex > 0) {
    adjacentSquares.push(grid[rowIndex - 1][columnIndex]);
  }

  if (columnIndex > 0) {
    adjacentSquares.push(grid[rowIndex][columnIndex - 1]);
  }

  if (rowIndex < rowMax - 1 && columnIndex < columnMax - 1) {
    adjacentSquares.push(grid[rowIndex + 1][columnIndex + 1]);
  }

  if (rowIndex < rowMax - 1) {
    adjacentSquares.push(grid[rowIndex + 1][columnIndex]);
  }

  if (columnIndex < columnMax - 1) {
    adjacentSquares.push(grid[rowIndex][columnIndex + 1]);
  }

  if (rowIndex < rowMax - 1 && columnIndex > 0) {
    adjacentSquares.push(grid[rowIndex + 1][columnIndex - 1]);
  }

  if (columnIndex < columnMax - 1 & rowIndex > 0) {
    adjacentSquares.push(grid[rowIndex - 1][columnIndex + 1]);
  }

  return adjacentSquares;
};

function getColorAdjustedGrid(grid, velocity) {
  let newGrid = [];

  grid.forEach((row, rowIndex) => {
    newGrid.push([]);
    row.forEach((hue, columnIndex) => {
      const adjacentHues = getAdjacent(grid, rowIndex, columnIndex, grid.length, row.length);
      const averageColor = getCircleAverage(adjacentHues.concat([hue]));
      const nextColorForSquare = getInfluencedHue(hue, averageColor, velocity);

      newGrid[rowIndex].push(nextColorForSquare);
    });
  });

  return newGrid;
}

export function Grid(props) {
  const canvas = useRef();
  const [color, setColor] = useState(0);
  const grid = useRef(initializeGrid(Math.ceil(props.height / props.squareSize), Math.ceil(props.width / props.squareSize)));
  const rowCount = Math.ceil(props.height / props.squareSize);
  const columnCount = Math.ceil(props.width / props.squareSize);

  useEffect(() => {
    grid.current = initializeGrid(rowCount, columnCount);
  }, [props.width, props.height]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newGrid = getColorAdjustedGrid(grid.current, props.velocity);
      const ctx = canvas.current.getContext('2d');
      paintGrid(ctx, newGrid, props.squareSize);

      grid.current = newGrid;
    }, 50);

    return () => {
      clearInterval(interval);
    }
  });

  function onCanvasClick(event) {
    var columnIndex = Math.floor((event.nativeEvent.offsetX * columnCount) / props.width);
    var rowIndex = Math.floor((event.nativeEvent.offsetY * rowCount) / props.height);

    grid.current[columnIndex][rowIndex] = color;
  }

  return ( 
    <div>
      <canvas ref={canvas} width={props.width} height={props.height} onClick={onCanvasClick} />
    </div>
  );
}