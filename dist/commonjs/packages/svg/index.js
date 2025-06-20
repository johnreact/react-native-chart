"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Arc = require("./Arc");

Object.keys(_Arc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Arc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Arc[key];
    }
  });
});

var _ViewBox = require("./ViewBox");

Object.keys(_ViewBox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ViewBox[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ViewBox[key];
    }
  });
});
//# sourceMappingURL=index.js.map