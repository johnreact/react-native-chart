"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sum = sum;

function sum(arrays) {
  if (arrays.length == 0) {
    return 0;
  }

  return arrays.reduce((total, prev) => total += prev);
}
//# sourceMappingURL=sum.js.map