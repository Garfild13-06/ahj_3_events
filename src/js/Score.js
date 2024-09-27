export default class Score {
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
