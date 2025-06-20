"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var Circle = /** @class */ (function () {
    function Circle(_a) {
        var r = _a.r;
        var _this = this;
        this.radius = 20;
        this.circumference = function () { return _this.radius * 2 * Math.PI; };
        this.getArcByPercentage = function (percentage) {
            var degreeInPercentage = 360 * percentage;
            return (degreeInPercentage / 360) * _this.circumference();
        };
        this.getAngleByPercentange = function (percentage) {
            return ((_this.getArcByPercentage(percentage) * 360) / 2 / Math.PI / _this.radius);
        };
        this.radius = r !== null && r !== void 0 ? r : 50;
    }
    return Circle;
}());
exports.Circle = Circle;
