import Sprite from "./Sprite";
import Service from "../service";

export default class Enemy extends Sprite {
  constructor(ctx, url, pos, size, speed) {
    super(ctx, url, pos, size);
    this.ctx = ctx;
    this.url = url;
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.speedGame = 0;
    this.observer = Service.get("Observer");
    this.observer.subscribe(data => {
      this.speedGame = data.speed;
    });
  }

  draw() {
    super.draw();
    this.pos.y += this.speedGame - this.speed.y;
    this.pos.x += this.speed.x;
  }
}
