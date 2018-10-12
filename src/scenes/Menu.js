import Service from "../service";
import Scene from "./Scene";

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

export default class Menu extends Scene {
  constructor(app) {
    super(app, "menu");
    this.app = app;
    this.cteateMenu();
  }

  cteateMenu() {
    BUTTONS.forEach(dataButton => {
      const button = document.createElement("button");
      button.innerText = dataButton.name;
      button.id = dataButton.id;
      button.classList.add("button");
      this.handleClick(button, dataButton);
      super.div.appendChild(button);
    });
  }

  handleClick(button, dataButton) {
    button.addEventListener("click", () => {
      const scenes = Service.get("scenes");
      super.closeScene();
      if (dataButton.scene == "game") {
        scenes[dataButton.scene].startGame();
      } else {
        scenes[dataButton.scene].draw();
      }
    });
  }

  draw() {
    super.draw();
    super.showScene();
  }
}
