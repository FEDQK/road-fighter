import EventObserver from "../modules/EventObserver";

export default class Service {
  static get(name) {
    return Service.list[name];
  }
}

Service.list = {
  Observer: new EventObserver()
};
