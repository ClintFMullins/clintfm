import { getCircleAverage, getInfluencedHue } from '../utils/color';

function fillCanvasSquare(context, x1, y1, x2, y2, hue) {
  context.beginPath();
  context.rect(x1, y1, x2, y2);
  context.fillStyle = `hsl(${hue}, 100%, 80%)`;
  context.fill();

  context.fillStyle = `black`;
  context.fillText(hue,x1,y1 + 50);
}

export function initializeGrid(rowCount, columnCount) {
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

export function paintGrid(context, grid, squareSize) {
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

export function getColorAdjustedGrid(grid, velocity) {
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