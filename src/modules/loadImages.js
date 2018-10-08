let resourceCache = {};
let readyCallbacks = [];

function load(urlOrArr) {
  if (urlOrArr instanceof Array) {
    urlOrArr.forEach(url => {
      _load(url);
    });
  } else {
    _load(urlOrArr);
  }
}

function _load(url) {
  if (resourceCache[url]) {
    return resourceCache[url];
  } else {
    let img = new Image();
    img.onload = () => {
      resourceCache[url] = img;

      if (isReady()) {
        readyCallbacks.forEach(element => {
          element.func.call(element.context);
        });
      }
    };
    resourceCache[url] = false;
    img.src = url;
  }
}

function get(url) {
  return resourceCache[url];
}

function isReady() {
  let ready = true;
  for (let k in resourceCache) {
    if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
      ready = false;
    }
  }
  return ready;
}

function onReady(func, context) {
  readyCallbacks.push({ func, context });
}

export default {
  load: load,
  get: get,
  onReady: onReady,
  isReady: isReady
};
