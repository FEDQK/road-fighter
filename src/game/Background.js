import Sprite from "./Sprite";
import Service from "../service";

export default class Background {
  constructor(ctx, src, pos, size, speed, canvasSize) {
    this.ctx = ctx;
    this.src = src;
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.canvasSize = canvasSize;
    this.tiles = [];
    this.observer = Service.get("SpeedObserver");
    this.init();
  }

  init() {
    const countTiles = Math.ceil(this.canvasSize.height / this.size.height);
    this.calcAdditionalSpace(countTiles);
    for (let i = -1; i < countTiles; i++) {
      const sprite = new Sprite(
        this.ctx,
        this.src,
        { x: this.pos.x, y: i * this.size.height },
        this.size
      );
      this.tiles.push(sprite);
    }
    this.observer.subscribe(data => {
      this.speed = data.speed;
    });
  }

  calcAdditionalSpace(countTiles) {
    this.additionalSpace =
      countTiles * this.size.height - this.canvasSize.height;
  }

  draw() {
    this.tiles.forEach(tile => {
      tile.pos.y += this.speed;
      tile.draw();
      if (tile.pos.y > this.canvasSize.height) {
        tile.pos.y =
          tile.pos.y -
          this.canvasSize.height +
          -this.size.height -
          this.additionalSpace;
      }
    });
  }
}
