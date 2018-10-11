export default class Customize {
  constructor(app) {
    this.app = app;
    this.init();
  }

  init() {
    this.divCustomize = document.createElement("div");
    this.divCustomize.id = "customize";
  }

  createBlockName() {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    div.classList.add("change-name");
    input.type = "text";
    span.innerText = "Name";
    label.appendChild(span);
    label.appendChild(input);
    div.appendChild(label);
    this.divCustomize.appendChild(div);
  }

  cteateCustomize() {
    this.createBlockName();
    this.app.appendChild(this.divCustomize);
  }

  closeCustomize() {
    this.divCustomize.classList.add("hidden");
  }

  draw() {
    this.cteateCustomize();
    this.divCustomize.classList.remove("hidden");
  }
}
