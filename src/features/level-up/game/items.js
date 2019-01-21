export const PLAYER_TYPE = 'player';
export const MONSTER_TYPE = 'monster';

export class Player {
  constructor({ level = 1 } = {}) {
    this.type = PLAYER_TYPE;
    this.level = level;
  }
}

export class Monster {
  constructor({ level = 1, direction = 'left' } = {}) {
    this.type = MONSTER_TYPE;
    this.level = level;
    this.direction = direction;
  }
}