"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sum = require("./sum");

Object.keys(_sum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sum[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sum[key];
    }
  });
});
//# sourceMappingURL=index.js.map