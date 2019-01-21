export class Grid {
  constructor({ size }) {
    this.size = size;
    this.reset();
  }

  get() {
    return this.grid;
  }

  getCell(x, y) {
    return this.grid[x][y];
  }

  setCell(x, y, value) {
    this.grid[x][y] = value;
  }

  appendToCell(x, y, value) {
    const currentCell = this.grid[x][y] || [];
    this.grid[x][y] = currentCell.concat([value]);
  }

  isValidPosition(rowIndex, cellIndex) {
    const biggestValidIndex = this.size - 1;

    if (
      rowIndex > biggestValidIndex ||
      cellIndex > biggestValidIndex ||
      rowIndex < 0 ||
      cellIndex < 0
    ) {
      return false;
    }

    return true;
  }

  getInverseDirection(rowIndex, cellIndex, direction) {
    const biggestValidIndex = this.size - 1;

    if (direction === 'down' && rowIndex >= biggestValidIndex) { return 'up' }
    if (direction === 'right' && cellIndex >= biggestValidIndex) { return 'left' }
    if (direction === 'up' && rowIndex <= 0) { return 'down' }
    if (direction === 'left' && cellIndex <= 0) { return 'right' }

    return null;
  }

  convertDirectionToRowCell(direction) {
    if (direction === 'up') { return { rowDir: -1, cellDir: 0 }}
    if (direction === 'left') { return { rowDir: 0, cellDir: -1 }}
    if (direction === 'down') { return { rowDir: 1, cellDir: 0 }}
    if (direction === 'right') { return { rowDir: 0, cellDir: 1 }}

    return null;
  }

  reset() {
    const grid = [];

    for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
      grid.push([]);
  
      for (let cellIndex = 0; cellIndex < this.size; cellIndex++) {
        grid[rowIndex].push([]);
      }
    }
  
    this.grid = grid;
  }
}