"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Circle {
  constructor({
    r
  }) {
    _defineProperty(this, "radius", 20);
    _defineProperty(this, "circumference", () => this.radius * 2 * Math.PI);
    _defineProperty(this, "getArcByPercentage", percentage => {
      const degreeInPercentage = 360 * percentage;
      return degreeInPercentage / 360 * this.circumference();
    });
    _defineProperty(this, "getAngleByPercentange", percentage => {
      return this.getArcByPercentage(percentage) * 360 / 2 / Math.PI / this.radius;
    });
    this.radius = r ?? 50;
  }
}
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map