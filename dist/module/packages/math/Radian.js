function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class Radian {
  constructor(value) {
    _defineProperty(this, "_value", 0);

    _defineProperty(this, "toDegree", () => this._value * 180 / Math.PI);

    this._value = value;
  } // degree = radian * 180 / Math.PI


}
//# sourceMappingURL=Radian.js.map