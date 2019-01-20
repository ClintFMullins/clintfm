import { initialFillGrid, newGrid, reconcileGridSpaces } from "./grid";

const GRID_SIZE = 5;

export const ACTION_MOVE = 'move';
export const ACTION_UPDATE_GRID = 'update-grid';

export const initialState = {
  grid: initialFillGrid(newGrid(GRID_SIZE)),
  nextGrid: null,
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTION_MOVE: {
      const nextGrid = state.nextGrid === null ? newGrid(GRID_SIZE, true) : [ ...state.nextGrid ];
      const itemToMove = state.grid[action.fromX][action.fromY][0];
      if (itemToMove.type === 'player') {
        itemToMove.level += 1;
      }
      nextGrid[action.toX][action.toY].push(itemToMove);

      return { ...state, nextGrid };
    }
    case ACTION_UPDATE_GRID: {
      const nextGrid = state.nextGrid === null ? newGrid(GRID_SIZE) : [ ...state.nextGrid ];
      const nextGridReconciled = reconcileGridSpaces(nextGrid);

      return { ...state, grid: nextGridReconciled, nextGrid: null };
    }
    default: {
      return state;
    }
  }
}
