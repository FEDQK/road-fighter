import input from "./modules/input";
import loadImages from "./modules/loadImages";
import Game from "./game/Game";

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

const game = new Game();

window.gameLoop = () => {
  if (!game.isGameEnd) {
    requestAnimFrame(gameLoop);
    game.draw();
  }
};
