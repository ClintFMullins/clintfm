import React, { useState } from 'react';
import styled from 'styled-components';
import { useDirectionKeys } from '../../utils/keypress';
import { Game } from './game/game';
import { LEVEL_ONE, LEVELS } from './game/levels';

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

const game = new Game();
game.loadLevel(LEVELS[1]);

export function LevelUp() {
  const [grid, setGrid] = useState(game.grid.get());

  function handleMovement(direction) {
    game.playerTurn(direction)
    setGrid(game.grid.get());
  }

  const handleDown = () => handleMovement('down')
  const handleUp = () => handleMovement('up')
  const handleLeft = () => handleMovement('left')
  const handleRight = () => handleMovement('right')

  useDirectionKeys({ handleDown, handleUp, handleLeft, handleRight });

  return (
    <GridWrapper>
      <Grid>
        {grid.map((row, rowIndex) => (
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