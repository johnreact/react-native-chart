"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearInterpolation = void 0;
// this linear interpolation is suppoprt only clamp.
function LinearInterpolation(_a) {
    var value = _a.value, inputRange = _a.inputRange, outputRange = _a.outputRange;
    var minInputRange = Math.min.apply(Math, inputRange);
    var maxInputRange = Math.max.apply(Math, inputRange);
    var minOutPutRange = Math.min.apply(Math, outputRange);
    var maxOutPutRange = Math.max.apply(Math, outputRange);
    if (value > maxInputRange) {
        return maxOutPutRange;
    }
    else if (value < minInputRange) {
        return minOutPutRange;
    }
    var percentage = getPercentageRange({
        value: value,
        min: minInputRange,
        max: maxInputRange,
    });
    // formula: (1 - percentage) * min + percentage * max; 😎
    return (1 - percentage) * minOutPutRange + percentage * maxOutPutRange;
}
exports.LinearInterpolation = LinearInterpolation;
function getPercentageRange(_a) {
    //formula calclate percentange by range ((input - min) * 100) / (max - min) 😎
    var value = _a.value, min = _a.min, max = _a.max;
    // return between 0 -> 1
    return ((value - min) * 100) / (max - min) / 100;
}
