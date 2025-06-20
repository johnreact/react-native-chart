"use strict";

var _react = _interopRequireDefault(require("react"));

var _Radian = require("./Radian");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { sum } from "../../src/utils/Array";
describe("Converter From Radian To Radian", () => {
  it("π/2 == 90 deg", () => {
    const radian = Math.PI / 2;
    const degree = new _Radian.Radian(radian).toDegree();
    const result = Number(degree.toFixed(13));
    const actualResult = 90;
    expect(result).toBe(actualResult);
  });
  it("π/4 == 45 deg", () => {
    const radian = Math.PI / 4;
    const degree = new _Radian.Radian(radian).toDegree();
    const result = Number(degree.toFixed(13));
    const actualResult = 45;
    expect(result).toBe(actualResult);
  });
  it("π == 180deg", () => {
    const radian = Math.PI;
    const degree = new _Radian.Radian(radian).toDegree();
    const result = Number(degree.toFixed(13));
    const actualResult = 180;
    expect(result).toBe(actualResult);
  });
  it("3π/2 == 270 deg", () => {
    const radian = 3 * Math.PI / 2;
    const degree = new _Radian.Radian(radian).toDegree();
    const result = Number(degree.toFixed(13));
    const actualResult = 270;
    expect(result).toBe(actualResult);
  });
  it("2π == 360 deg", () => {
    const radian = 2 * Math.PI;
    const degree = new _Radian.Radian(radian).toDegree();
    const result = Number(degree.toFixed(13));
    const actualResult = 360;
    expect(result).toBe(actualResult);
  });
});
//# sourceMappingURL=Radian.test.js.map