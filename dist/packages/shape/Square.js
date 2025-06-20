"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
var Square = /** @class */ (function () {
    function Square(_a) {
        var diameter = _a.diameter;
        var _this = this;
        this.diameter = 20;
        this.getDiameter = function () { return _this.diameter; };
        this.getCorner = function () { return _this.diameter / Math.SQRT2; };
        this.diameter = diameter;
    }
    return Square;
}());
exports.Square = Square;
