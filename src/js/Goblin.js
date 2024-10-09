import goblinImg from '../goblin.png'; // Import image through Webpack
import hammerImg from '../hammer.png';  // Импорт картинки молотка

export default class Goblin {
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
    goblinElement.src = goblinImg; // Use imported image path
    goblinElement.classList.add('goblin');

    goblinElement.onclick = () => {
      this.game.increaseScore();
      this.clear();

      // Изменяем курсор на молоток при клике
      document.body.style.cursor = `url(${hammerImg}), auto`;

      // Возвращаем курсор обратно через 300ms
      setTimeout(() => {
        document.body.style.cursor = 'auto';
      }, 300);
    };


    cells[newCellIndex].appendChild(goblinElement);

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
