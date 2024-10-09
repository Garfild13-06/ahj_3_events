/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// ./src/hammer.png
const hammer_namespaceObject = __webpack_require__.p + "d4aff5a62040cb6d7503.png";
;// ./src/js/Goblin.js
 // Import image through Webpack
 // Импорт картинки молотка

class Goblin {
  constructor(gameBoard, game) {
    this.gameBoard = gameBoard;
    this.game = game;
    this.currentCell = null;
    this.timeout = null;
  }
  getRandomCell(excludeIndex) {
    let randomIndex;
    const cells = this.gameBoard.querySelectorAll('.cell');
    do {
      randomIndex = Math.floor(Math.random() * cells.length);
    } while (randomIndex === excludeIndex);
    return randomIndex;
  }
  move() {
    const cells = this.gameBoard.querySelectorAll('.cell');
    if (this.currentCell !== null) {
      cells[this.currentCell].innerHTML = '';
    }
    const newCellIndex = this.getRandomCell(this.currentCell);
    this.currentCell = newCellIndex;
    const goblinElement = document.createElement('img');
    goblinElement.src = goblin_namespaceObject; // Use imported image path for goblin
    goblinElement.classList.add('goblin');
    goblinElement.onclick = () => {
      this.game.increaseScore();
      this.clear();

      // Change cursor to hammer on click, no additional delay
      document.body.style.cursor = `url(${hammer_namespaceObject}), auto`;

      // Revert cursor back to default after 300ms
      setTimeout(() => {
        document.body.style.cursor = 'auto';
      }, 300);
    };
    cells[newCellIndex].appendChild(goblinElement);

    // Move goblin every 1 second with no additional timeouts
    this.timeout = setTimeout(() => {
      this.game.missGoblin();
      this.clear();
    }, 1000);
  }
  clear() {
    if (this.currentCell !== null) {
      const cells = this.gameBoard.querySelectorAll('.cell');
      cells[this.currentCell].innerHTML = '';
      this.currentCell = null;
    }
    clearTimeout(this.timeout);
  }
}
;// ./src/js/Score.js
class Score {
  constructor() {
    this.score = 0;
    this.missed = 0;
    this.scoreElement = document.getElementById('score');
    this.missedElement = document.getElementById('missed');
  }
  increase() {
    this.score += 1;
    this.update();
  }
  miss() {
    this.missed += 1;
    this.update();
  }
  update() {
    this.scoreElement.textContent = `Score: ${this.score}`;
    this.missedElement.textContent = `Missed: ${this.missed}`;
  }
}
;// ./src/js/Game.js


class Game {
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
;// ./src/index.js



// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.start();
});
/******/ })()
;