import EventObserver from "../modules/EventObserver";
import Game from "../game/Game";
import Results from "../scenes/Results";
import Menu from "../scenes/Menu";
import Customize from "../scenes/Customize";

export default class Service {
  static get(name) {
    return Service.list[name];
  }
}

const app = document.getElementById("app");

Service.list = {
  SpeedObserver: new EventObserver(),
  GameEndObserver: new EventObserver(),
  scenes: {
    game: new Game(app),
    results: new Results(app),
    menu: new Menu(app),
    customize: new Customize(app)
  }
};
