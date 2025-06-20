"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarCoordinate = void 0;
var math_1 = require("../math");
var Coordinate_1 = require("./Coordinate");
// https://www.mathsisfun.com/polar-cartesian-coordinates.html
var PolarCoordinate = /** @class */ (function (_super) {
    __extends(PolarCoordinate, _super);
    function PolarCoordinate(_a) {
        var coordX = _a.coordX, coordY = _a.coordY, radius = _a.radius, angle = _a.angle;
        var _this = _super.call(this) || this;
        _this.coordX = 0;
        _this.coordY = 0;
        _this.radius = 0;
        _this.angle = 0;
        _this.toCartesian = function () {
            var startAngle = _this.angle - 90;
            var angleInRadians = new math_1.Degree(startAngle).toRadian();
            return {
                x: _this.coordX + _this.radius * Math.cos(angleInRadians),
                y: _this.coordY + _this.radius * Math.sin(angleInRadians),
            };
        };
        _this.coordX = coordX;
        _this.coordY = coordY;
        _this.angle = angle;
        _this.radius = radius;
        return _this;
    }
    return PolarCoordinate;
}(Coordinate_1.Coordinate));
exports.PolarCoordinate = PolarCoordinate;
