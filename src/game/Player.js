import Sprite from "./Sprite";
import input from "../modules/input";
import Service from "../service";

const MAX_SPEED = 10;
const SPEED_UP = 0.05;
const SPEED_DOWN = 0.1;
const HORIZONTAL_SPEED = 3;
const SPEED_STOP = 2;

export default class Player extends Sprite {
  constructor(ctx, url, pos, size, speed, zoneMoving) {
    super(ctx, url, pos, size);
    this.ctx = ctx;
    this.url = url;
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.zoneMoving = zoneMoving;
    this.observer = Service.get("Observer");
  }

  draw() {
    super.draw();
    this.handleInput();
  }

  handleInput() {
    if (input.isDown("DOWN") || input.isDown("s")) {
      if (this.speed <= 0) {
        this.speed = 0;
      } else {
        this.speed = (this.speed * 10 - SPEED_DOWN * 10) / 10;
      }
      this.createBroadcastChangeSpeed(this.speed);
    }

    if (input.isDown("UP") || input.isDown("w")) {
      if (this.speed != MAX_SPEED) {
        this.speed = (this.speed * 10 + SPEED_UP * 10) / 10;
      }
      this.createBroadcastChangeSpeed(this.speed);
    }

    if (input.isDown("LEFT") || input.isDown("a")) {
      if (this.pos.x - HORIZONTAL_SPEED < this.zoneMoving.min) {
        this.pos.x = this.zoneMoving.min + 5;
        this.stop();
      } else {
        this.pos.x -= HORIZONTAL_SPEED;
      }
    }

    if (input.isDown("RIGHT") || input.isDown("d")) {
      if (
        this.pos.x + HORIZONTAL_SPEED + this.size.width >
        this.zoneMoving.max
      ) {
        this.pos.x = this.zoneMoving.max - this.size.width - 5;
        this.stop();
      } else {
        this.pos.x += HORIZONTAL_SPEED;
      }
    }
  }

  stop() {
    if (this.speed > SPEED_STOP) {
      this.speed = (this.speed * 10 - SPEED_STOP * 10) / 10;
    } else {
      this.speed = 0;
    }
    this.createBroadcastChangeSpeed(this.speed);
  }

  fullStop() {
    this.speed = 0;
    this.createBroadcastChangeSpeed(this.speed);
  }

  createBroadcastChangeSpeed(speed) {
    this.observer.broadcast({ speed });
  }
}
