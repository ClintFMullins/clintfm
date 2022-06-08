import React, { useState } from "react";

function useForceRender() {
  const [_, setNum] = useState();

  return () => {
    setNum((newNum) => newNum + 1);
  };
}

export function Sudoku() {
  const [grid, setGrid] = useState(new Grid());
  const rerender = useForceRender();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div style={{ border: "1px solid black" }}>
          {grid.rows().map((row) => {
            return (
              <div style={{ display: "flex" }}>
                {row.map((cell) => (
                  <VisualCell
                    cell={cell}
                    updateCell={() => {
                      grid.updateCellPossibilities(cell);
                      rerender();
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            console.log(grid);
          }}
        >
          Solve Iteration
        </button>
        <button
          onClick={() => {
            grid.randomize();
            // grid.testSetup(0.2);
            rerender();
          }}
        >
          Setup Test
        </button>
      </div>
    </div>
  );
}

function VisualCell({ cell, updateCell }) {
  return (
    <div
      style={{
        display: "inline-block",
        width: "40px",
        height: "40px",
        padding: "2px",
        border: "1px solid black",
      }}
      onClick={updateCell}
    >
      {cell.answer === null ? (
        <div
          style={{ fontSize: "8px", wordBreak: "break-all", color: "darkgrey" }}
        >
          {Object.keys(cell.possible)
            .filter((key) => {
              return cell.possible[key];
            })
            .map((key) => {
              return <span>{key}</span>;
            })}
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {cell.answer}
        </div>
      )}
    </div>
  );
}

class Grid {
  constructor() {
    this.clear();
  }

  updateCellPossibilities(cell) {
    const cannotBeThese = [
      ...this.rowOfCell(cell),
      ...this.colOfCell(cell),
      ...this.blockOfCell(cell),
    ];

    for (let surroundingCell in cannotBeThese) {
      if (surroundingCell.answer != null) {
        cell.possible[surroundingCell.answer] = false;
      }
    }
  }

  rowOfCell = (cell) => {
    return this.grid[cell.row];
  };

  colOfCell = (cell) => {
    const col = [];
    for (let row = 0; row < 9; row++) {
      col.push(this.grid[row][cell.col]);
    }
    return col;
  };

  blockOfCell = (cell) => {
    return this.block(Math.floor(cell.row / 3), Math.floor(cell.col / 3));
  };

  block = (blockRow, blockCol) => {
    let block = [];

    for (let row = blockRow * 3; row < (blockRow + 1) * 3; row++) {
      for (let col = blockCol * 3; col < (blockCol + 1) * 3; col++) {
        block.push(this.grid[row][col]);
      }
    }

    return block;
  };

  rows = () => {
    return this.grid;
  };

  get = (row, col) => {
    return this.grid[row][col];
  };

  clear = () => {
    this.grid = [];

    for (let row = 0; row < 9; row++) {
      this.grid.push([]);
      for (let col = 0; col < 9; col++) {
        this.grid[row].push(new Cell(row, col));
      }
    }
  };

  randomize = () => {
    this.clear();

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        console.log("NEW:", row, col);
        const cell = this.get(row, col);
        console.log(cell);
        const posList = cell.possibleAsList();
        console.log([...posList]);
        cell.answer = posList[Math.floor(Math.random() * posList.length)];

        const updateThese = [
          ...this.rowOfCell(cell),
          ...this.colOfCell(cell),
          ...this.blockOfCell(cell),
        ];

        updateThese.forEach((cellToUpdate) => {
          cellToUpdate.possible[cell.answer] = false;
        });
      }
    }
  };

  testSetup = (chance) => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row = 0;
    while (row < 9) {
      // shift backwards once per block
      if (row % 3 === 0) {
        const toAdd = nums.pop();
        nums.unshift(toAdd);
      }

      for (let col = 0; col < 9; col++) {
        this.get(row, col).answer = nums[col];
      }
      // shift 3 times
      for (let idx = 0; idx < 3; idx++) {
        const toAdd = nums.shift();
        nums.push(toAdd);
      }
      row++;
    }

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (Math.random() > chance) {
          this.get(row, col).answer = null;
        }
      }
    }
  };
}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.answer = null;
    this.possible = {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
    };
  }

  possibleAsList = () => {
    const pos = [];
    Object.keys(this.possible).forEach((key) => {
      if (this.possible[key]) {
        pos.push(key);
      }
    });

    return pos;
  };
}
