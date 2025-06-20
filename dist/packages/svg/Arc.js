"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arc = void 0;
var PolarCoordinate_1 = require("../coordinate/PolarCoordinate");
var Arc = /** @class */ (function () {
    function Arc(props) {
        this.coordX = 0;
        this.coordY = 0;
        this.radius = 0;
        this.startAngle = 0;
        this.endAngle = 0;
        this.coordX = props.coordX;
        this.coordY = props.coordY;
        this.radius = props.radius;
        this.startAngle = props.startAngle;
        this.endAngle = props.endAngle;
    }
    Arc.prototype.getDrawPath = function () {
        var start = new PolarCoordinate_1.PolarCoordinate({
            coordX: this.coordX,
            coordY: this.coordY,
            radius: this.radius,
            angle: this.endAngle,
        }).toCartesian();
        var end = new PolarCoordinate_1.PolarCoordinate({
            coordX: this.coordX,
            coordY: this.coordY,
            radius: this.radius,
            angle: this.startAngle,
        }).toCartesian();
        var largeArcFlag = this.endAngle - this.startAngle <= 180 ? "0" : "1";
        var d = [
            "M",
            start.x,
            start.y,
            "A",
            this.radius,
            this.radius,
            0,
            largeArcFlag,
            0,
            end.x,
            end.y,
        ].join(" ");
        return d;
    };
    return Arc;
}());
exports.Arc = Arc;
