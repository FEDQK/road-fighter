import utils from "../utils";

export default class Time {
  constructor(ctx, color, size, pos, scale) {
    this.ctx = ctx;
    this.color = color;
    this.size = size;
    this.pos = pos;
    this.scale = scale;
    this.startTime = Date.now();
    this.time = 0;
    this.init();
  }

  init() {
    this.ctx.font = `${this.size * this.scale}px Arial`;
  }

  calcTime() {
    const nowTime = Date.now();
    this.time = nowTime - this.startTime;
  }

  getFormatedTime() {
    return `${utils.formatTime(utils.getMinutes(this.time))}:${utils.formatTime(
      utils.getSeconds(this.time)
    )}`;
  }

  draw() {
    this.calcTime();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(
      this.getFormatedTime(),
      this.pos.x * this.scale,
      this.pos.y * this.scale
    );
    this.ctx.closePath();
  }
}
