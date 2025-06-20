"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radian = void 0;
var Radian = /** @class */ (function () {
    function Radian(value) {
        var _this = this;
        this._value = 0;
        // degree = radian * 180 / Math.PI
        this.toDegree = function () { return (_this._value * 180) / Math.PI; };
        this._value = value;
    }
    return Radian;
}());
exports.Radian = Radian;
