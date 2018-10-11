export default class Sound {
  constructor(app, src, volume) {
    this.app = app;
    this.src = src;
    this.volume = volume;
    this.init();
  }

  init() {
    this.sound = document.createElement("audio");
    this.sound.src = this.src;
    this.sound.volume = this.volume;
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
