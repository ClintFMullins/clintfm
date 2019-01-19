import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { clamp } from '../../utils/numbers';

const GridWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 100px;
  justify-content: center;
  align-items: center;
  font-family: monospace;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
`;

const GridRow = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
`;

const GridCell = styled.div`
  background-color: lightblue;
  border: 1px solid lightcyan;
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Player = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GRID_SIZE = 5;
function newGrid(size) {
  const grid = [];

  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    grid.push([]);

    for (let cellIndex = 0; cellIndex < size; cellIndex++) {
      const item = rowIndex === 0 & cellIndex === 0 ? { level: 1, isPlayer: true } : null;
      grid[rowIndex].push(item);
    }
  }

  return grid;
}

const initialState = {
  grid: newGrid(GRID_SIZE),
}

const ACTION_MOVE = 'move';

export function reducer(state, action) {
  switch (action.type) {
    case ACTION_MOVE: {
      const grid = [ ...state.grid ];
      const itemToMove = grid[action.fromX][action.fromY];
      grid[action.fromX][action.fromY] = null;
      grid[action.toX][action.toY] = itemToMove;

      return { ...state, grid };
    }
    default: {
      return state;
    }
  }
}

function getPlayerPosition(grid) {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < grid[rowIndex].length; cellIndex++) {
      const gridItem = grid[rowIndex][cellIndex];
      if (gridItem && gridItem.isPlayer) {
        return { rowIndex, cellIndex };
      }
    }
  }
}

function useDirectionKeys({ handleUp, handleDown, handleLeft, handleRight }) {
  function onKeyDown(event) {
    if (event.keyCode === 37) {
      handleLeft && handleLeft();
    } else if (event.keyCode === 38) {
      handleUp && handleUp();
    } else if (event.keyCode === 39) {
      handleRight && handleRight();
    } else if (event.keyCode === 40) {
      handleDown && handleDown();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  })
} 

export function LevelUp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMove(xDir, yDir) {
    const playerPosition = getPlayerPosition(state.grid);

    dispatch({
      type: ACTION_MOVE,
      fromX: playerPosition.rowIndex,
      fromY: playerPosition.cellIndex,
      toX: clamp(playerPosition.rowIndex + xDir, 0, state.grid.length - 1),
      toY: clamp(playerPosition.cellIndex + yDir, 0, state.grid[playerPosition.rowIndex].length -1),
    });
  }
  
  const handleDown = () => handleMove(1, 0);
  const handleUp = () => handleMove(-1, 0);
  const handleLeft = () => handleMove(0, -1);
  const handleRight = () => handleMove(0, 1);

  useDirectionKeys({ handleDown, handleUp, handleLeft, handleRight });

  return (
    <GridWrapper>
      <Grid>
        {state.grid.map((row, rowIndex) => (
          <GridRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <GridCell key={cellIndex}>
                {cell !== null && <Player>{cell.level}</Player>}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </Grid>
    </GridWrapper>
  );
}