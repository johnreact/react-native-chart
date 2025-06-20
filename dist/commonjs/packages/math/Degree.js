"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Degree = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Degree {
  constructor(value) {
    _defineProperty(this, "_value", 0);

    _defineProperty(this, "toRadian", () => this._value * Math.PI / 180);

    this._value = value;
  } // degree = radian * 180 / Math.PI => radian = degree * Math.PI / 180


}

exports.Degree = Degree;
//# sourceMappingURL=Degree.js.map