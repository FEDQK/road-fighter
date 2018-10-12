import Service from "./service";

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

const scenes = Service.get("scenes");
const gameEndObserver = Service.get("GameEndObserver");
gameEndObserver.subscribe(() => {
  window.gameLoop();
});

scenes.menu.draw();

window.gameLoop = () => {
  if (!scenes.game.isGameEnd) {
    requestAnimFrame(gameLoop);
    scenes.game.draw();
  }
};
