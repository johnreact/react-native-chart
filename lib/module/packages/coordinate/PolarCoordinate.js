function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { Degree } from "../math";
import { Coordinate } from "./Coordinate";

// https://www.mathsisfun.com/polar-cartesian-coordinates.html
export class PolarCoordinate extends Coordinate {
  constructor({
    coordX,
    coordY,
    radius,
    angle
  }) {
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