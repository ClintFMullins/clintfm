import { Player, Monster } from "./items";

export const LEVELS = [
  {
    gridSize: 2,
    items: [
      { item: new Player({ level: 1 }), rowIndex: 0, cellIndex: 0 },
      { item: new Monster(), rowIndex: 1, cellIndex: 1 },
    ],
  },
  {
    gridSize: 3,
    items: [
      { item: new Player({ level: 1 }), rowIndex: 0, cellIndex: 0 },
      { item: new Monster({ level: 2, direction: 'up' }), rowIndex: 1, cellIndex: 1 },
      { item: new Monster({ level: 2, direction: 'left' }), rowIndex: 2, cellIndex: 2 },
    ],
  },
]