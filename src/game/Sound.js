export default class Sound {
  constructor(app, src, volume, loop = false) {
    this.app = app;
    this.src = src;
    this.volume = volume;
    this.loop = loop;
    this.init();
  }

  init() {
    this.sound = document.createElement("audio");
    this.sound.src = this.src;
    this.sound.volume = this.volume;
    this.sound.loop = this.loop;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.app.appendChild(this.sound);
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.pause();
  }
}
