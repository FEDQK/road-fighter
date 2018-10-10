import Service from "../service";
import Sprite from "./Sprite";

const SIZE_MAP = {
  width: 40,
  height: 300
};
const POS_MAP = {
  x: 20,
  y: 200
};
const MPLAYER_SIZE = {
  width: 15,
  height: 25
};

export default class Map {
  constructor(ctx, maxDistance, speed, scale) {
    this.ctx = ctx;
    this.speed = speed;
    this.scale = scale;
    this.lastTime = Date.now();
    this.distance = 0;
    this.maxDistance = maxDistance;
    this.speedObserver = Service.get("SpeedObserver");
    this.speedObserver.subscribe(data => {
      this.speed = data.speed;
    });
    this.createPlayerOnMap();
  }

  calcDistance() {
    const nowTime = Date.now();
    if ((nowTime - this.lastTime) / 1000 > 1) {
      this.lastTime = nowTime;
      const newDistance = (this.distance * 10 + this.speed * 10) / 10;
      if (newDistance > this.maxDistance) {
        this.distance = this.maxDistance;
      } else {
        this.distance = newDistance;
      }
      console.log("speed", this.speed, "distance", this.distance);
    }
  }

  drawMap() {
    this.ctx.beginPath();
    this.ctx.rect(
      POS_MAP.x * this.scale.x,
      POS_MAP.y * this.scale.y,
      SIZE_MAP.width * this.scale.x,
      SIZE_MAP.height * this.scale.y
    );
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.drawLineStartOrFinish(true);
    this.drawLineStartOrFinish(false);
  }

  drawLineStartOrFinish(isStart = true) {
    this.ctx.beginPath();
    let margin = 0;
    if (isStart) {
      this.ctx.strokeStyle = "green";
      margin =
        -MPLAYER_SIZE.height * this.scale.x + SIZE_MAP.height * this.scale.y;
    } else {
      this.ctx.strokeStyle = "red";
      margin = MPLAYER_SIZE.height * this.scale.x;
    }
    this.ctx.moveTo(
      POS_MAP.x * this.scale.x,
      POS_MAP.y * this.scale.y + margin
    );
    this.ctx.lineTo(
      POS_MAP.x * this.scale.x + SIZE_MAP.width * this.scale.x,
      POS_MAP.y * this.scale.y + margin
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  createPlayerOnMap() {
    this.mPlayer = new Sprite(
      this.ctx,
      "./media/images/player_type1.png",
      this.getPositionMPlayer(),
      {
        width: MPLAYER_SIZE.width * this.scale.x,
        height: MPLAYER_SIZE.height * this.scale.x
      }
    );
  }

  getPositionMPlayer() {
    return {
      x:
        POS_MAP.x * this.scale.x +
        (SIZE_MAP.width * this.scale.x) / 2 -
        (MPLAYER_SIZE.width * this.scale.x) / 2,
      y: this.calcVerticalPositionMPlayer()
    };
  }

  calcVerticalPositionMPlayer() {
    const finishPosition = POS_MAP.y * this.scale.y;
    const startPosition =
      finishPosition +
      SIZE_MAP.height * this.scale.y -
      MPLAYER_SIZE.height * this.scale.x;
    return (
      startPosition -
      (startPosition - finishPosition) * (this.distance / this.maxDistance)
    );
  }

  upadateVerticalPostionMPlayer() {
    this.mPlayer.pos.y = this.calcVerticalPositionMPlayer();
  }

  draw() {
    this.calcDistance();
    this.drawMap();
    this.mPlayer.draw();
    this.upadateVerticalPostionMPlayer();
  }
}
