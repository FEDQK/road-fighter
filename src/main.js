// import Game from "./game/Game";
// import Results from "./scenes/Results";
// import Menu from "./scenes/Menu";

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

// const game = new Game(app);
// const results = new Results(app);
// const menu = new Menu(app);

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
