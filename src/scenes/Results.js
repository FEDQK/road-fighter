import utils from "../utils";
import Service from "../service";

export default class Results {
  constructor(app) {
    this.app = app;
    this.dataResults = [];
    this.init();
  }

  init() {
    this.divTable = document.createElement("div");
    this.divTable.id = "results";
  }

  loadResults() {
    this.dataResults = JSON.parse(localStorage.getItem("results")) || [];
  }

  sortDataResults() {
    this.dataResults = this.dataResults.sort((a, b) => a[1] - b[1]);
  }

  createHeaderTable(table) {
    const dataHeader = ["№", "Name", "Time"];
    const tr = document.createElement("tr");
    dataHeader.forEach(value => {
      const th = document.createElement("th");
      th.innerText = value;
      tr.appendChild(th);
    });
    table.appendChild(tr);
  }

  createTable() {
    this.sortDataResults();
    const table = document.createElement("table");
    if (this.dataResults.length > 10) {
      this.dataResults.length = 10;
    }
    this.createHeaderTable(table);
    this.dataResults.forEach((data, index) => {
      const tr = document.createElement("tr");
      let newData = data.slice();
      newData.unshift(index + 1);
      newData.forEach((value, dataIndex) => {
        const td = document.createElement("td");
        if (dataIndex == 2) {
          td.innerText = `${utils.formatTime(
            utils.getMinutes(value)
          )}:${utils.formatTime(utils.getSeconds(value))}`;
        } else {
          td.innerText = value;
        }

        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    this.divTable.appendChild(table);
  }

  createButton() {
    const button = document.createElement("button");
    button.innerText = "Menu";
    button.id = "backToMenu";
    button.classList.add("button");
    this.handleClickButton(button);
    this.divTable.appendChild(button);
  }

  handleClickButton(button) {
    button.addEventListener("click", () => {
      this.closeResults();
      const scenes = Service.get("scenes");

      scenes.menu.draw();
    });
  }

  closeResults() {
    this.divTable.classList.add("hidden");
  }

  clearContent() {
    this.divTable.innerHTML = "";
  }

  draw() {
    this.divTable.classList.remove("hidden");
    this.clearContent();
    this.loadResults();
    this.createTable();
    this.createButton();
    this.app.appendChild(this.divTable);
  }
}
