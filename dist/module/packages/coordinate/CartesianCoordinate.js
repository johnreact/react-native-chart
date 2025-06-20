function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Coordinate } from "./Coordinate";
export class CartesianCoordinate extends Coordinate {
  constructor() {
    super();

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);
  }

}
//# sourceMappingURL=CartesianCoordinate.js.map