function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getHours(time) {
  return Math.floor(time / 1000 / 60 / 60);
}

function getMinutes(time) {
  return Math.floor(time / 1000 / 60) % 60;
}

function getSeconds(time) {
  return Math.floor(time / 1000) % 60;
}

function formatTime(value) {
  return value.toString().length <= 1 ? "0" + value : value;
}

export default { getRandomInt, getHours, getMinutes, getSeconds, formatTime };
