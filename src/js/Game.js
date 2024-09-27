import Goblin from './Goblin';
import Score from './Score';

export default class Game {
  constructor() {
    this.gameBoard = document.getElementById('game-board');
    this.goblin = new Goblin(this.gameBoard, this);
    this.score = new Score();
    this.missedLimit = 5;
    this.interval = null;
  }

  createBoard() {
    // Create a 4x4 grid of cells for the game
    for (let i = 0; i < 16; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.gameBoard.appendChild(cell);
    }
  }

  start() {
    this.createBoard(); // Create the board when the game starts
    this.interval = setInterval(() => this.goblin.move(), 1000);
  }

  increaseScore() {
    this.score.increase();
  }

  missGoblin() {
    this.score.miss();
    if (this.score.missed >= this.missedLimit) {
      this.endGame();
    }
  }

  endGame() {
    clearInterval(this.interval);
    alert('Game Over! You missed too many goblins.');
    this.goblin.clear();
  }
}
