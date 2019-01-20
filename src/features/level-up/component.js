import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { clamp } from '../../utils/numbers';
import { useDirectionKeys } from '../../utils/keypress';
import { getGridItemPositions } from './utils/grid';
import { reducer, initialState, ACTION_MOVE, ACTION_UPDATE_GRID } from './utils/reducer';

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
  width: 80%;
  height: 80%;
  background-color: blue;
  font-size: 30px;
  color: ghostwhite;
`;
const Monster = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  background-color: red;
  font-size: 30px;
  color: ghostwhite;

  ${props => {
    if (props.direction === 'up') {
      return 'border-top: solid 2px black';
    } else if (props.direction === 'down') {
      return 'border-bottom: solid 2px black';
    } else if (props.direction === 'left') {
      return 'border-left: solid 2px black';
    } else if (props.direction === 'right') {
      return 'border-right: solid 2px black';
    }
  }}
`;


export function LevelUp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function playerMove(xDir, yDir) {
    const playerPosition = getGridItemPositions(state.grid, 'player')[0];

    dispatch({
      type: ACTION_MOVE,
      fromX: playerPosition.rowIndex,
      fromY: playerPosition.cellIndex,
      toX: clamp(playerPosition.rowIndex + xDir, 0, state.grid.length - 1),
      toY: clamp(playerPosition.cellIndex + yDir, 0, state.grid[playerPosition.rowIndex].length -1),
    });

    const monsterCells = getGridItemPositions(state.grid, 'monster');

    monsterCells.forEach((monsterPosition) => {
      const { rowIndex, cellIndex } = monsterPosition;
      const { direction } = state.grid[rowIndex][cellIndex][0];
      let monsterDirCell = 0;
      let monsterDirRow = 0;

      if (direction === 'up') {
        monsterDirCell = -1;
      } else if (direction === 'down') {
        monsterDirCell = 1;
      } else if (direction === 'left') {
        monsterDirRow = -1;
      } else if (direction === 'right') {
        monsterDirRow = 1;
      }

      const newRowIndex = rowIndex + monsterDirCell;
      const newCellIndex = cellIndex + monsterDirRow;

      const clampedRow = clamp(newRowIndex, 0, state.grid.length - 1);
      const clampedCell = clamp(newCellIndex, 0, state.grid[rowIndex].length -1);

      if (newRowIndex !== clampedRow) {
        if (direction === 'right') {
          state.grid[rowIndex][cellIndex][0].direction = 'left';
        } else if (direction === 'left') {
          state.grid[rowIndex][cellIndex][0].direction = 'right';
        }
      }

      if (newCellIndex !== clampedCell) {
        if (direction === 'up') {
          state.grid[rowIndex][cellIndex][0].direction = 'down';
        } else if (direction === 'down') {
          state.grid[rowIndex][cellIndex][0].direction = 'up';
        }
      }

      dispatch({
        type: ACTION_MOVE,
        fromX: rowIndex,
        fromY: cellIndex,
        toX: clampedRow,
        toY: clampedCell,
      });
    });

    dispatch({ type: ACTION_UPDATE_GRID });
  }
  
  const handleDown = () => playerMove(1, 0);
  const handleUp = () => playerMove(-1, 0);
  const handleLeft = () => playerMove(0, -1);
  const handleRight = () => playerMove(0, 1);

  useDirectionKeys({ handleDown, handleUp, handleLeft, handleRight });

  return (
    <GridWrapper>
      <Grid>
        {state.grid.map((row, rowIndex) => (
          <GridRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <GridCell key={cellIndex}>
                <GridItem cell={cell} />
              </GridCell>
            ))}
          </GridRow>
        ))}
      </Grid>
    </GridWrapper>
  );
}

function GridItem({ cell }) {
  const cellItem = cell[0];
  if (!cellItem) {
    return null;
  }

  if (cellItem.type === 'player') {
    return <Player>{cellItem.level}</Player>
  } else if (cellItem.type === 'monster') {
    return <Monster direction={cellItem.direction}>{cellItem.level}</Monster>
  }

  return null;
}