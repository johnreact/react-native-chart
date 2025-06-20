"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewBox = void 0;
var ViewBox = /** @class */ (function () {
    function ViewBox(_a) {
        var width = _a.width, height = _a.height;
        var _this = this;
        this.width = 50;
        this.height = 50;
        this.getWidth = function () { return _this.width; };
        this.getHeight = function () { return _this.height; };
        this.getCenterCoord = function () { return ({ x: _this.width / 2, y: _this.height / 2 }); };
        this.width = width;
        this.height = height;
    }
    return ViewBox;
}());
exports.ViewBox = ViewBox;
