const DEFAULT_PLAYER_INFO = {
  name: "player",
  type: "black"
};

export default class PlayerInfo {
  constructor() {
    this.loadData();
  }

  loadData() {
    this.data =
      JSON.parse(localStorage.getItem("playerInfo")) || DEFAULT_PLAYER_INFO;
    if (!this.data.type) {
      this.data.type = DEFAULT_PLAYER_INFO.type;
    }
    if (!this.data.name) {
      this.data.name = DEFAULT_PLAYER_INFO.name;
    }
  }

  saveData() {
    localStorage.setItem("playerInfo", JSON.stringify(this.data));
  }
}
