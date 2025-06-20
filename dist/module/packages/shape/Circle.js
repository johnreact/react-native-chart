function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class Circle {
  constructor(_ref) {
    let {
      r
    } = _ref;

    _defineProperty(this, "radius", 20);

    _defineProperty(this, "circumference", () => this.radius * 2 * Math.PI);

    _defineProperty(this, "getArcByPercentage", percentage => {
      const degreeInPercentage = 360 * percentage;
      return degreeInPercentage / 360 * this.circumference();
    });

    _defineProperty(this, "getAngleByPercentange", percentage => {
      return this.getArcByPercentage(percentage) * 360 / 2 / Math.PI / this.radius;
    });

    this.radius = r !== null && r !== void 0 ? r : 50;
  }

}
//# sourceMappingURL=Circle.js.map