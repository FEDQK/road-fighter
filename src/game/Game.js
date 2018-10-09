import Background from "./Background";
import Player from "./Player";
import loadImages from "../modules/loadImages";
// import Service from "../service";

export default class Game {
  constructor() {
    loadImages.load([
      "./media/images/bg.jpg",
      "./media/images/player_type1.png"
    ]);
    loadImages.onReady(this.init, this);
    this.maxSize = { width: 414, height: 736 };
    this.speed = 0;
    // this.observer = Service.get("Observer");
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.getElementById("app").appendChild(this.canvas);
    this.setSizeCanvas();
    this.calcScaleGame();
    this.createBackground();
    this.createPlayer();
    window.gameLoop();
  }

  calcScaleGame() {
    const scaleWidth = this.canvas.width / this.maxSize.width;
    const scaleHeight = this.canvas.height / this.maxSize.height;
    if (scaleWidth < scaleHeight) {
      this.scale = scaleWidth;
    } else {
      this.scale = scaleHeight;
    }
  }

  setSizeCanvas() {
    const { width, height } = this.getSizeWindow();
    this.canvas.width = width;
    this.canvas.height = height;
  }

  getSizeWindow() {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const size = Object.assign({}, this.maxSize);
    if (windowWidth < size.width) {
      size.width = windowWidth;
    }
    if (windowHeight < size.height) {
      size.height = windowHeight;
    }
    return size;
  }

  createBackground() {
    const widthBackgroundImg = 83;
    const height = widthBackgroundImg * this.scale;
    this.background = new Background(
      this.ctx,
      "./media/images/bg.jpg",
      { x: 0, y: 0 },
      { width: this.canvas.width, height: height },
      this.speed,
      { width: this.canvas.width, height: this.canvas.height }
    );
  }

  createPlayer() {
    const playerSpriteWidth = 30;
    const playerSpriteHeight = 50;
    this.player = new Player(
      this.ctx,
      "./media/images/player_type1.png",
      this.getPlayerPosition(playerSpriteWidth),
      this.getPlayerSize(playerSpriteWidth, playerSpriteHeight),
      this.speed,
      this.getPlayerZoneMoving()
    );
  }

  getPlayerPosition(playerSpriteWidth) {
    return {
      x: this.canvas.width / 2 - (playerSpriteWidth * this.scale) / 2,
      y: this.canvas.height / 2 + this.canvas.height / 4
    };
  }

  getPlayerSize(playerSpriteWidth, playerSpriteHeight) {
    return {
      width: playerSpriteWidth * this.scale,
      height: playerSpriteHeight * this.scale
    };
  }

  getPlayerZoneMoving() {
    const margin = 97;
    return {
      min: margin * this.scale,
      max: (this.canvas.width - margin) * this.scale
    };
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw();
    this.player.draw();
    // console.log(Date.now());
  }
}
