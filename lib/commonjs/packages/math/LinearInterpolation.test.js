"use strict";

var _react = _interopRequireDefault(require("react"));
var _LinearInterpolation = require("./LinearInterpolation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe("LinearInterpolation: ", () => {
  it("should equal 50, when value: 50, inputRange: [0, 100], outputRange: [0, 100]", () => {
    const result = (0, _LinearInterpolation.LinearInterpolation)({
      value: 50,
      inputRange: [0, 100],
      outputRange: [0, 100]
    });
    const expectedResult = 50;
    expect(result).toBe(expectedResult);
  });
  it("should equal 0, when value: 0, inputRange: [0, 100], outputRange: [0, 100]", () => {
    const result = (0, _LinearInterpolation.LinearInterpolation)({
      value: 0,
      inputRange: [0, 100],
      outputRange: [0, 100]
    });
    const expectedResult = 0;
    expect(result).toBe(expectedResult);
  });
  it("should equal 100, when value: 100, inputRange: [0, 100], outputRange: [0, 100]", () => {
    const result = (0, _LinearInterpolation.LinearInterpolation)({
      value: 100,
      inputRange: [0, 100],
      outputRange: [0, 100]
    });
    const expectedResult = 100;
    expect(result).toBe(expectedResult);
  });
  it("should equal 10, when value: 100, inputRange: [0, 100], outputRange: [0, 10]", () => {
    const result = (0, _LinearInterpolation.LinearInterpolation)({
      value: 100,
      inputRange: [0, 100],
      outputRange: [0, 10]
    });
    const expectedResult = 10;
    expect(result).toBe(expectedResult);
  });
  it("should equal 9, when value: 90, inputRange: [0, 100], outputRange: [0, 10]", () => {
    const result = (0, _LinearInterpolation.LinearInterpolation)({
      value: 90,
      inputRange: [0, 100],
      outputRange: [0, 10]
    });
    const expectedResult = 9;
    expect(result).toBe(expectedResult);
  });
});
//# sourceMappingURL=LinearInterpolation.test.js.map