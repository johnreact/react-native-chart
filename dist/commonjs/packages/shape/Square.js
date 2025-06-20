"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Square = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Square {
  constructor(_ref) {
    let {
      diameter
    } = _ref;

    _defineProperty(this, "diameter", 20);

    _defineProperty(this, "getDiameter", () => this.diameter);

    _defineProperty(this, "getCorner", () => this.diameter / Math.SQRT2);

    this.diameter = diameter;
  }

}

exports.Square = Square;
//# sourceMappingURL=Square.js.map