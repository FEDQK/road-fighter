import loadImages from "../modules/loadImages";

export default class Sprite {
  constructor(ctx, url, pos, size) {
    this.ctx = ctx;
    this.url = url;
    this.pos = pos;
    this.size = size;
  }

  draw() {
    this.ctx.drawImage(
      loadImages.get(this.url),
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }
}
