import input from "./modules/input";
import loadImages from "./modules/loadImages";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
init();

function init() {
  document.getElementById("app").appendChild(canvas);
  setSizeCanvas();
}

function setSizeCanvas() {
  const size = checkSizeWindow();
  canvas.width = size.width;
  canvas.height = size.height;
}

function checkSizeWindow() {
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  const size = { width: 414, height: 736 };
  if (windowWidth < size.width) {
    size.width = windowWidth;
  }
  if (windowHeight < size.height) {
    size.height = windowHeight;
  }
  return size;
}

(function() {})();
