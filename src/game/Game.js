import Background from "./Background";
import Player from "./Player";
import loadImages from "../modules/loadImages";
import EnemyGenerator from "../generators/EnemyGenerator";
import Time from "./Time";
import Service from "../service";
import Map from "./Map";
import utils from "../utils";

export default class Game {
  constructor() {
    loadImages.load([
      "./media/images/bg.jpg",
      "./media/images/player_type1.png",
      "./media/images/enemy_type1.png"
    ]);
    loadImages.onReady(this.init, this);
    this.defaultSize = { width: 414, height: 736 };
    this.speed = 0;
    this.maxDistance = 1000;
    this.isGameEnd = false;
    this.dataResults = [
      ["test", 130000],
      ["test2", 150500],
      ["test3", 102500],
      ["test", 130000],
      ["test2", 150500],
      ["test3", 102500],
      ["test", 130000],
      ["test2", 150500],
      ["test3", 102500],
      ["test", 130000],
      ["test2", 150500],
      ["test3", 102500],
      ["test", 130000],
      ["test2", 150500],
      ["test3", 102500]
    ];
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.app = document.getElementById("app");
    this.app.appendChild(this.canvas);
    this.setSizeCanvas();
    this.calcScaleGame();
    this.createBackground();
    this.createPlayer();
    this.createEnemies();
    this.createTime();
    this.createDistance();
    // this.drawTable();
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

  checkGameOver() {
    if (this.distance.distance >= this.maxDistance) {
      this.isGameEnd = true;
      this.player.fullStop();
    }
  }

  drawTable() {
    this.sortDataResults();
    const divTable = document.createElement("div");
    divTable.id = "results";
    const table = document.createElement("table");
    if (this.dataResults.length > 10) {
      this.dataResults.length = 10;
    }
    this.drawHeaderTable(table);
    this.dataResults.forEach((data, index) => {
      const tr = document.createElement("tr");
      data.unshift(index + 1);
      data.forEach((value, dataIndex) => {
        const td = document.createElement("td");
        if (dataIndex == 2) {
          td.innerHTML = `${utils.formatTime(
            utils.getMinutes(value)
          )}:${utils.formatTime(utils.getSeconds(value))}`;
        } else {
          td.innerHTML = value;
        }

        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    divTable.appendChild(table);
    this.app.appendChild(divTable);
  }

  drawHeaderTable(table) {
    const dataHeader = ["№", "Name", "Time"];
    const tr = document.createElement("tr");
    dataHeader.forEach(value => {
      const th = document.createElement("th");
      th.innerHTML = value;
      tr.appendChild(th);
    });
    table.appendChild(tr);
  }

  sortDataResults() {
    this.dataResults = this.dataResults.sort((a, b) => a[1] - b[1]);
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
