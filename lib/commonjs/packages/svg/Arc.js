"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arc = void 0;
var _PolarCoordinate = require("../coordinate/PolarCoordinate");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// For more info:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

class Arc {
  constructor(props) {
    _defineProperty(this, "coordX", 0);
    _defineProperty(this, "coordY", 0);
    _defineProperty(this, "radius", 0);
    _defineProperty(this, "startAngle", 0);
    _defineProperty(this, "endAngle", 0);
    this.coordX = props.coordX;
    this.coordY = props.coordY;
    this.radius = props.radius;
    this.startAngle = props.startAngle;
    this.endAngle = props.endAngle;
  }
  getDrawPath() {
    const start = new _PolarCoordinate.PolarCoordinate({
      coordX: this.coordX,
      coordY: this.coordY,
      radius: this.radius,
      angle: this.endAngle
    }).toCartesian();
    const end = new _PolarCoordinate.PolarCoordinate({
      coordX: this.coordX,
      coordY: this.coordY,
      radius: this.radius,
      angle: this.startAngle
    }).toCartesian();
    const largeArcFlag = this.endAngle - this.startAngle <= 180 ? "0" : "1";
    const d = ["M", start.x, start.y, "A", this.radius, this.radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
    return d;
  }
}
exports.Arc = Arc;
//# sourceMappingURL=Arc.js.map