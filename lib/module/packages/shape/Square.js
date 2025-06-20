function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export class Square {
  constructor({
    diameter
  }) {
    _defineProperty(this, "diameter", 20);
    _defineProperty(this, "getDiameter", () => this.diameter);
    _defineProperty(this, "getCorner", () => this.diameter / Math.SQRT2);
    this.diameter = diameter;
  }
}
//# sourceMappingURL=Square.js.map