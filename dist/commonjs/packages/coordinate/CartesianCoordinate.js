"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartesianCoordinate = void 0;

var _Coordinate = require("./Coordinate");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CartesianCoordinate extends _Coordinate.Coordinate {
  constructor() {
    super();

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);
  }

}

exports.CartesianCoordinate = CartesianCoordinate;
//# sourceMappingURL=CartesianCoordinate.js.map