import Background from "./Background";
import Player from "./Player";
import loadImages from "../modules/loadImages";
import EnemyGenerator from "../generators/EnemyGenerator";
import Time from "./Time";
import Map from "./Map";
import Service from "../service";

export default class Game {
  constructor(app) {
    this.app = app;
    loadImages.load([
      "./media/images/bg.jpg",
      "./media/images/player_type1.png",
      "./media/images/enemy_type1.png"
    ]);
    loadImages.onReady(this.init, this);
    this.defaultSize = { width: 414, height: 736 };
    this.speed = 0;
    this.maxDistance = 1000;
    this.isGameEnd = true;
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.app.appendChild(this.canvas);
    this.setSizeCanvas();
    this.calcScaleGame();
    this.createBackground();
    this.createPlayer();
    this.createEnemies();
    this.createDistance();
    window.gameLoop();
  }

  calcScaleGame() {
    this.scale = this.canvas.width / this.defaultSize.width;
    this.scaleY = this.canvas.height / this.defaultSize.height;
  }

  setSizeCanvas() {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
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
      this.getZoneMoving()
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

  getZoneMoving() {
    const margin = 97;
    return {
      min: margin * this.scale,
      max: this.canvas.width - margin * this.scale
    };
  }

  createEnemies() {
    this.enemies = new EnemyGenerator(
      this.ctx,
      this.speed,
      this.getZoneMoving(),
      this.scale,
      { width: this.canvas.width, height: this.canvas.height }
    );
  }

  collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 || b <= y2 || y > b2);
  }

  boxCollides(pos, size, pos2, size2) {
    return this.collides(
      pos.x,
      pos.y,
      pos.x + size.width,
      pos.y + size.height,
      pos2.x,
      pos2.y,
      pos2.x + size2.width,
      pos2.y + size2.height
    );
  }

  checkCollisions() {
    this.enemies.enemies.forEach((enemy, index) => {
      if (
        this.boxCollides(
          this.player.pos,
          this.player.size,
          enemy.pos,
          enemy.size
        )
      ) {
        this.player.fullStop();
        this.enemies.setNewPositionAndSpeedForEnemy(enemy, index);
      }
    });
  }

  createTime() {
    this.time = new Time(this.ctx, "#fff", 16, { x: 20, y: 30 }, this.scale);
  }

  createDistance() {
    this.distance = new Map(this.ctx, this.maxDistance, this.speed, {
      x: this.scale,
      y: this.scaleY
    });
  }

  startGame() {
    this.distance.distance = 990;
    this.enemies.generate();
    this.isGameEnd = false;
    this.createTime();
    const gameEndObserver = Service.get("GameEndObserver");
    gameEndObserver.broadcast({ isGameEnd: this.isGameEnd });
  }

  saveResult() {
    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(["player", this.time.time]);
    const newResults = JSON.stringify(results);
    localStorage.setItem("results", newResults);
  }

  gameOver() {
    this.saveResult();
    this.player.fullStop();
    this.isGameEnd = true;
    this.scenes = Service.get("scenes");
    this.scenes.results.draw();
  }

  checkGameOver() {
    if (this.distance.distance >= this.maxDistance) {
      this.gameOver();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw();
    this.player.draw();
    this.enemies.draw();
    this.time.draw();
    this.distance.draw();
    this.checkCollisions();
    this.checkGameOver();
  }
}
