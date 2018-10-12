import Service from "../service";

export default class Scene {
  constructor(app, name) {
    this.app = app;
    this.name = name;
    this.init();
  }

  get div() {
    return this._div;
  }

  set div(value) {
    this._div = value;
  }

  init() {
    this.div = document.createElement("div");
    this.div.id = this.name;
  }

  closeScene() {
    this.div.classList.add("hidden");
  }

  createButtonBackToMenu() {
    const button = document.createElement("button");
    button.innerText = "Menu";
    button.classList.add("button", "back-to-menu");
    this.handleClickBackToMenu(button);
    this.div.appendChild(button);
  }

  handleClickBackToMenu(button) {
    button.addEventListener("click", () => {
      this.closeScene();
      const scenes = Service.get("scenes");
      scenes.menu.showScene();
    });
  }

  draw() {
    this.app.appendChild(this.div);
  }

  clearContent() {
    this.div.innerHTML = "";
  }

  showScene() {
    this.div.classList.remove("hidden");
  }
}
