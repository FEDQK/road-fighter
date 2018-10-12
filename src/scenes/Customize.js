import Scene from "./Scene";
import PlayerInfo from "../game/PlayerInfo";

const COLORS_CAR = [
  { name: "Black", id: "black" },
  { name: "Blue", id: "blue" },
  { name: "Yellow", id: "yellow" },
  { name: "Orange", id: "orange" },
  { name: "Green", id: "green" }
];

export default class Customize extends Scene {
  constructor(app) {
    super(app, "customize");
    this.app = app;
    this.playerInfo = new PlayerInfo();
    this.cteateCustomize();
    this.createBlockChangeColor();
    super.createButtonBackToMenu();
  }

  cteateCustomize() {
    this.createBlockChangeName();
  }

  createBlockChangeName() {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    div.classList.add("change-name");
    input.type = "text";
    input.value = this.playerInfo.data.name;
    this.handleChangeName(input);
    span.innerText = "Name";
    label.appendChild(span);
    label.appendChild(input);
    div.appendChild(label);
    super.div.appendChild(div);
  }

  handleChangeName(input) {
    input.addEventListener("input", event => {
      this.playerInfo.data.name = event.target.value;
      this.playerInfo.saveData();
    });
  }

  createBlockChangeColor() {
    const div = document.createElement("div");
    const span = document.createElement("span");
    const select = document.createElement("select");
    div.classList.add("change-color");
    COLORS_CAR.forEach(dataColor => {
      const option = document.createElement("option");
      option.innerText = dataColor.name;
      option.value = dataColor.id;
      if (this.playerInfo.data.type == dataColor.id) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    this.handleChangeColor(select);
    span.innerText = "Color car";
    div.appendChild(span);
    div.appendChild(select);
    super.div.appendChild(div);
  }

  handleChangeColor(select) {
    select.addEventListener("change", event => {
      this.playerInfo.data.type = event.target.value;
      this.playerInfo.saveData();
    });
  }

  draw() {
    super.draw();
    super.showScene();
  }
}
