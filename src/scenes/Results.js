import utils from "../utils";
import Scene from "./Scene";

export default class Results extends Scene {
  constructor(app) {
    super(app, "results");
    this.app = app;
    this.dataResults = [];
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
    super.div.appendChild(table);
  }

  draw() {
    super.showScene();
    super.clearContent();
    this.loadResults();
    this.createTable();
    super.createButtonBackToMenu();
    super.draw();
  }
}
