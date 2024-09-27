import './css/style.css';
import Game from './js/Game';

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.start();
});