"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
function sum(arrays) {
    if (arrays.length == 0) {
        return 0;
    }
    return arrays.reduce(function (total, prev) { return (total += prev); });
}
exports.sum = sum;
