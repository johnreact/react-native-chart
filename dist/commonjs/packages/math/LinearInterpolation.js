"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinearInterpolation = LinearInterpolation;

// this linear interpolation is suppoprt only clamp.
function LinearInterpolation(_ref) {
  let {
    value,
    inputRange,
    outputRange
  } = _ref;
  const minInputRange = Math.min(...inputRange);
  const maxInputRange = Math.max(...inputRange);
  const minOutPutRange = Math.min(...outputRange);
  const maxOutPutRange = Math.max(...outputRange);

  if (value > maxInputRange) {
    return maxOutPutRange;
  } else if (value < minInputRange) {
    return minOutPutRange;
  }

  const percentage = getPercentageRange({
    value,
    min: minInputRange,
    max: maxInputRange
  }); // formula: (1 - percentage) * min + percentage * max; 😎

  return (1 - percentage) * minOutPutRange + percentage * maxOutPutRange;
}

function getPercentageRange(_ref2) {
  let {
    value,
    min,
    max
  } = _ref2;
  //formula calclate percentange by range ((input - min) * 100) / (max - min) 😎
  // return between 0 -> 1
  return (value - min) * 100 / (max - min) / 100;
}
//# sourceMappingURL=LinearInterpolation.js.map