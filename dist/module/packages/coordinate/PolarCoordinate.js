function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Degree } from "../math";
import { Coordinate } from "./Coordinate"; // https://www.mathsisfun.com/polar-cartesian-coordinates.html

export class PolarCoordinate extends Coordinate {
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
      const angleInRadians = new Degree(startAngle).toRadian();
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
//# sourceMappingURL=PolarCoordinate.js.map