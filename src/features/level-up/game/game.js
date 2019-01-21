import { Grid } from "./grid";
import { PLAYER_TYPE, MONSTER_TYPE } from './items';

export class Game {
  loadLevel({ gridSize, items }) {
    this.gridSize = gridSize;
    this.grid = new Grid({ size: gridSize });

    items.forEach(({ item, rowIndex, cellIndex }) => {
      this.grid.setCell(rowIndex, cellIndex, [item]);
    });
  }

  playerTurn(playerDirection) {
    const playerDirs = this.grid.convertDirectionToRowCell(playerDirection);
    const isPlayerMoved = this.attemptMovePlayer(playerDirs);

    if (!isPlayerMoved) {
      return;
    }

    this.reconcileGridSpaces();
    this.moveMonsters();
  }

  attemptMovePlayer({ rowDir, cellDir }) {
    const { item: player, rowIndex, cellIndex } = this.getGridItemPositions(PLAYER_TYPE)[0];
    const newRowIndex = rowIndex + rowDir;
    const newCellIndex = cellIndex + cellDir;

    if (!this.grid.isValidPosition(newRowIndex, newCellIndex)) {
      return false;
    }

    player.level += 1;
    this.grid.appendToCell(newRowIndex, newCellIndex, player);
    this.reconcileGridSpaces();
    this.grid.setCell(rowIndex, cellIndex, []);

    return true;
  }

  moveMonsters() {
    const monstersData = this.getGridItemPositions(MONSTER_TYPE);

    monstersData.forEach(({ item: monster, rowIndex, cellIndex }) => {
      const { rowDir, cellDir } = this.grid.convertDirectionToRowCell(monster.direction);

      const newRowIndex = rowIndex + rowDir;
      const newCellIndex = cellIndex + cellDir;

      const newDir = this.grid.getInverseDirection(newRowIndex, newCellIndex, monster.direction);
      
      monster.moved = true;
      if (newDir) {
        monster.direction = newDir;
      }

      this.grid.appendToCell(newRowIndex, newCellIndex, monster);
      this.reconcileGridSpaces();
      this.grid.setCell(rowIndex, cellIndex, []);
    });
  }

  getGridItemPositions(type) {
    let itemPositions = [];

    const grid = this.grid.get();
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < grid[rowIndex].length; cellIndex++) {
        const gridItem = grid[rowIndex][cellIndex][0];
        if (gridItem && gridItem.type === type) {
          itemPositions.push({ item: gridItem, rowIndex, cellIndex });
        }
      }
    }
  
    return itemPositions;
  }

  reconcileGridSpaces() {
    const grid = this.grid.get();
  
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < grid[rowIndex].length; cellIndex++) {
        const gridItems = this.grid.getCell(rowIndex, cellIndex);
  
        if (gridItems.length > 1) {
          const newGridItems = [];
  
          const itemA = gridItems[0];
          const itemB = gridItems[1];
          const winningItem = itemA.level > itemB.level ? itemA : itemB;
          
          newGridItems.push(winningItem);
  
          this.grid.setCell(rowIndex, cellIndex, newGridItems);
        }
      }
    }
  }
}