export function newGrid(size, isEmpty = false) {
  const grid = [];

  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    grid.push([]);

    for (let cellIndex = 0; cellIndex < size; cellIndex++) {
      grid[rowIndex].push([]);
    }
  }

  return grid;
}

export function initialFillGrid(grid) {
  const clonedGrid = [...grid];

  for (let rowIndex = 0; rowIndex < clonedGrid.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < clonedGrid[rowIndex].length; cellIndex++) {
      let items = [];
      if (rowIndex === 0 & cellIndex === 0) {
        items = [{ level: 1, type: 'player' }];
      } else if (Math.random() < 0.2) {
        items = [{ level: Math.round(Math.random() * 10), type: 'monster', direction: getRandomDirection() }];
      }

      clonedGrid[rowIndex][cellIndex] = items;
    }
  }

  return clonedGrid;
}

function getRandomDirection() {
  const num = Math.random();
  if (num < 0.25) {
    return 'up';
  } else if (num < 0.50) {
    return 'left';
  } else if (num < 0.75) {
    return 'down';
  } else {
    return 'right';
  }
}

export function reconcileGridSpaces(grid) {
  const clonedGrid = [...grid];

  for (let rowIndex = 0; rowIndex < clonedGrid.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < clonedGrid[rowIndex].length; cellIndex++) {
      const gridItems = clonedGrid[rowIndex][cellIndex];

      if (gridItems.length > 1) {
        const newGridItems = [];

        const itemA = gridItems[0];
        const itemB = gridItems[1];
        const winningItem = itemA.level > itemB.level ? itemA : itemB;
        
        newGridItems.push(winningItem);

        clonedGrid[rowIndex][cellIndex] = newGridItems;
      }
    }
  }

  return clonedGrid;
}

export function getGridItemPositions(grid, type) {
  let itemPositions = [];

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < grid[rowIndex].length; cellIndex++) {
      const gridItem = grid[rowIndex][cellIndex][0];
      if (gridItem && gridItem.type === type) {
        itemPositions.push({ rowIndex, cellIndex });
      }
    }
  }

  return itemPositions;
}