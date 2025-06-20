function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class Square {
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
//# sourceMappingURL=Square.js.map