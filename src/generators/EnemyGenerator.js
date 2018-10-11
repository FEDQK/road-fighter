import Enemy from "../game/Enemy";
import Service from "../service";
import utils from "../utils";

const MIN_SPEED_ENEMY = 1;
const MAX_SPEED_ENEMY = 8;
const MIN_ZONE_SPAWN = -100;
const MAX_ZONE_SPAWN = -500;
const COUNT_ENEMIES = 4;

const TYPE_ENEMIES = [
  {
    path: "./media/images/enemy_type1.png",
    width: 30,
    height: 54
  }
];

export default class EnemyGenerator {
  constructor(ctx, speed, zone, scale, canvasSize) {
    this.ctx = ctx;
    this.speed = speed;
    this.zone = zone;
    this.scale = scale;
    this.canvasSize = canvasSize;
    this.enemies = [];
    this.observer = Service.get("SpeedObserver");
    this.observer.subscribe(data => {
      this.speed = data.speed;
    });
    this.generate();
  }

  generate() {
    this.enemies = [];
    for (let i = 0; i < COUNT_ENEMIES; i++) {
      const enemy = new Enemy(
        this.ctx,
        TYPE_ENEMIES[0].path,
        this.getRandomPosition(i, TYPE_ENEMIES[0].width * this.scale),
        this.getEnemySize(TYPE_ENEMIES[0].width, TYPE_ENEMIES[0].height),
        { x: 0, y: this.getRandomSpeed() }
      );
      this.enemies.push(enemy);
    }
  }

  getRandomPosition(index, width) {
    const minPositionX = this.zone.min + index * this.getZoneForOneEnemy();
    return {
      x: utils.getRandomInt(
        minPositionX,
        minPositionX + this.getZoneForOneEnemy() - width
      ),
      y: utils.getRandomInt(
        MIN_ZONE_SPAWN * this.scale,
        MAX_ZONE_SPAWN * this.scale
      )
    };
  }

  getZoneForOneEnemy() {
    return (this.zone.max - this.zone.min) / COUNT_ENEMIES;
  }

  getEnemySize(width, height) {
    return { width: width * this.scale, height: height * this.scale };
  }

  getRandomSpeed() {
    return utils.getRandomInt(MIN_SPEED_ENEMY, MAX_SPEED_ENEMY);
  }

  setNewPositionAndSpeedForEnemy(enemy, index) {
    enemy.pos = this.getRandomPosition(index, enemy.size.width);
    enemy.speed = { x: 0, y: this.getRandomSpeed() };
  }

  draw() {
    this.enemies.forEach((enemy, index) => {
      enemy.draw();
      if (
        enemy.pos.y < MAX_ZONE_SPAWN * this.scale ||
        enemy.pos.y > this.canvasSize.height
      ) {
        this.setNewPositionAndSpeedForEnemy(enemy, index);
      }
    });
  }
}
