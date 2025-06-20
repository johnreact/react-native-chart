"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolarCoordinate = void 0;

var _math = require("../math");

var _Coordinate = require("./Coordinate");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://www.mathsisfun.com/polar-cartesian-coordinates.html
class PolarCoordinate extends _Coordinate.Coordinate {
  constructor(_ref) {
    let {
      coordX,
      coordY,
      radius,
      angle
    } = _ref;
    super();

    _defineProperty(this, "coordX", 0);

    _defineProperty(this, "coordY", 0);

    _defineProperty(this, "radius", 0);

    _defineProperty(this, "angle", 0);

    _defineProperty(this, "toCartesian", () => {
      const startAngle = this.angle - 90;
      const angleInRadians = new _math.Degree(startAngle).toRadian();
      return {
        x: this.coordX + this.radius * Math.cos(angleInRadians),
        y: this.coordY + this.radius * Math.sin(angleInRadians)
      };
    });

    this.coordX = coordX;
    this.coordY = coordY;
    this.angle = angle;
    this.radius = radius;
  }

}

exports.PolarCoordinate = PolarCoordinate;
//# sourceMappingURL=PolarCoordinate.js.map