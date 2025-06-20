"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Degree = void 0;
var Degree = /** @class */ (function () {
    function Degree(value) {
        var _this = this;
        this._value = 0;
        // degree = radian * 180 / Math.PI => radian = degree * Math.PI / 180
        this.toRadian = function () { return (_this._value * Math.PI) / 180; };
        this._value = value;
    }
    return Degree;
}());
exports.Degree = Degree;
