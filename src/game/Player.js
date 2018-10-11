import Sprite from "./Sprite";
import input from "../modules/input";
import Service from "../service";
import Sound from "./Sound";
import gyro from "../modules/gyro";

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
    this.observer = Service.get("SpeedObserver");
    this.app = document.getElementById("app");
    this.addGyroscopeControls();
  }

  checkGyroscope() {
    return gyro.getOrientation().beta && gyro.getOrientation().gamma;
  }

  addGyroscopeControls() {
    if (this.checkGyroscope()) {
      gyro.frequency = 20;
      gyro.startTracking(orientation => {
        if (orientation.beta < 20) {
          this.moveUp();
        } else {
          this.moveDown();
        }
        if (orientation.gamma < 0) {
          this.moveLeft();
        } else {
          this.moveRight();
        }
      });
    }
  }

  draw() {
    super.draw();
    this.handleInput();
  }

  moveDown() {
    const newSpeed = (this.speed * 10 - SPEED_DOWN * 10) / 10;
    if (newSpeed <= 0) {
      this.speed = 0;
    } else {
      this.speed = newSpeed;
    }
    this.createBroadcastChangeSpeed(this.speed);
  }

  moveUp() {
    if (this.speed != MAX_SPEED) {
      this.speed = (this.speed * 10 + SPEED_UP * 10) / 10;
    }
    this.createBroadcastChangeSpeed(this.speed);
  }

  moveLeft() {
    if (this.pos.x - HORIZONTAL_SPEED < this.zoneMoving.min) {
      this.pos.x = this.zoneMoving.min + 5;
      this.stop();
    } else {
      this.pos.x -= HORIZONTAL_SPEED;
    }
  }

  moveRight() {
    if (this.pos.x + HORIZONTAL_SPEED + this.size.width > this.zoneMoving.max) {
      this.pos.x = this.zoneMoving.max - this.size.width - 5;
      this.stop();
    } else {
      this.pos.x += HORIZONTAL_SPEED;
    }
  }

  handleInput() {
    if (input.isDown("DOWN") || input.isDown("s")) {
      this.moveDown();
    }

    if (input.isDown("UP") || input.isDown("w")) {
      this.moveUp();
    }

    if (input.isDown("LEFT") || input.isDown("a")) {
      this.moveLeft();
    }

    if (input.isDown("RIGHT") || input.isDown("d")) {
      this.moveRight();
    }
  }

  stop() {
    if (this.speed > SPEED_STOP) {
      this.speed = (this.speed * 10 - SPEED_STOP * 10) / 10;
    } else {
      this.speed = 0;
    }
    const sxfZap = new Sound(this.app, "./media/sounds/sfx_zap.mp3", 1);
    sxfZap.play();
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
