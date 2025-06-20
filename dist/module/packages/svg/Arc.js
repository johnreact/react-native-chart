function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { PolarCoordinate } from "../coordinate/PolarCoordinate"; // For more info:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

export class Arc {
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
    const start = new PolarCoordinate({
      coordX: this.coordX,
      coordY: this.coordY,
      radius: this.radius,
      angle: this.endAngle
    }).toCartesian();
    const end = new PolarCoordinate({
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
//# sourceMappingURL=Arc.js.map