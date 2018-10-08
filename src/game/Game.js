import Background from "./Background";
import loadImages from "../modules/loadImages";

export default class Game {
  constructor() {
    loadImages.load(["./src/media/images/bg.jpg"]);
    loadImages.onReady(this.init, this);
    this.maxSize = { width: 414, height: 736 };
    this.speed = 1;
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.getElementById("app").appendChild(this.canvas);
    this.setSizeCanvas();
    this.createBackground();
    window.gameLoop();
  }

  setSizeCanvas() {
    const { width, height } = this.checkSizeWindow();
    this.canvas.width = width;
    this.canvas.height = height;
  }

  checkSizeWindow() {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const size = Object.assign({}, this.maxSize);
    if (windowWidth < size.width) {
      size.width = windowWidth;
    }
    if (windowHeight < size.height) {
      size.height = windowHeight;
    }
    return size;
  }

  createBackground() {
    const widthBackgroundImg = 83;
    const height =
      widthBackgroundImg * (this.canvas.width / this.maxSize.width);
    this.background = new Background(
      this.ctx,
      "./src/media/images/bg.jpg",
      { x: 0, y: 0 },
      { width: this.canvas.width, height: height },
      this.speed,
      { width: this.canvas.width, height: this.canvas.height }
    );
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw();
    // console.log(Date.now());
  }
}
