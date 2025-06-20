"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Degree = require("./Degree");
Object.keys(_Degree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Degree[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Degree[key];
    }
  });
});
var _Radian = require("./Radian");
Object.keys(_Radian).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Radian[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Radian[key];
    }
  });
});
var _LinearInterpolation = require("./LinearInterpolation");
Object.keys(_LinearInterpolation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LinearInterpolation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LinearInterpolation[key];
    }
  });
});
//# sourceMappingURL=index.js.map