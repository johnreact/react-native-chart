"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewBox = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ViewBox {
  constructor(_ref) {
    let {
      width,
      height
    } = _ref;

    _defineProperty(this, "width", 50);

    _defineProperty(this, "height", 50);

    _defineProperty(this, "getWidth", () => this.width);

    _defineProperty(this, "getHeight", () => this.height);

    _defineProperty(this, "getCenterCoord", () => ({
      x: this.width / 2,
      y: this.height / 2
    }));

    this.width = width;
    this.height = height;
  }

}

exports.ViewBox = ViewBox;
//# sourceMappingURL=ViewBox.js.map