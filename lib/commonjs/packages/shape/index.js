"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Circle = require("./Circle");
Object.keys(_Circle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Circle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Circle[key];
    }
  });
});
var _Square = require("./Square");
Object.keys(_Square).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Square[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Square[key];
    }
  });
});
//# sourceMappingURL=index.js.map