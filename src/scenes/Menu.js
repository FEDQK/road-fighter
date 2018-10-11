import Service from "../service";

const BUTTONS = [
  {
    id: "buttonPlay",
    name: "Play",
    scene: "game"
  },
  {
    id: "buttonCustomize",
    name: "Customize",
    scene: "customize"
  },
  {
    id: "buttonResults",
    name: "Results",
    scene: "results"
  }
];

export default class Menu {
  constructor(app) {
    this.app = app;
    this.init();
  }

  init() {
    this.divMenu = document.createElement("div");
    this.divMenu.id = "menu";
    this.cteateMenu();
  }

  cteateMenu() {
    BUTTONS.forEach(dataButton => {
      const button = document.createElement("button");
      button.innerText = dataButton.name;
      button.id = dataButton.id;
      button.classList.add("button");
      this.handleClick(button, dataButton);
      this.divMenu.appendChild(button);
    });
    this.app.appendChild(this.divMenu);
  }

  closeMenu() {
    this.divMenu.classList.add("hidden");
  }

  handleClick(button, dataButton) {
    button.addEventListener("click", () => {
      const scenes = Service.get("scenes");
      this.closeMenu();
      if (dataButton.scene == "game") {
        scenes[dataButton.scene].startGame();
      } else {
        scenes[dataButton.scene].draw();
      }
    });
  }

  draw() {
    this.divMenu.classList.remove("hidden");
  }
}
