"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonutChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSvg = require("react-native-svg");

var _shape = require("./packages/shape");

var _svg = require("./packages/svg");

var _array = require("./packages/array");

var _math = require("./packages/math");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const AnimatedPath = _reactNative.Animated.createAnimatedComponent(_reactNativeSvg.Path);

const DonutChart = _ref => {
  let {
    data,
    containerWidth,
    containerHeight,
    radius,
    startAngle = -125,
    endAngle = startAngle * -1,
    strokeWidth = 10,
    type = "round",
    animationType = "slide",
    labelWrapperStyle,
    labelValueStyle,
    labelTitleStyle,
    containerStyle
  } = _ref;
  let donutItemListeners = [];
  const viewBox = new _svg.ViewBox({
    width: containerWidth,
    height: containerHeight
  });
  const squareInCircle = new _shape.Square({
    diameter: radius * 2
  });
  const animateOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const animateContainerOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const animatedStrokeWidths = (0, _react.useRef)(data.map(() => new _reactNative.Animated.Value(strokeWidth))).current;
  const pathRefs = (0, _react.useRef)([]);
  const animatedPaths = (0, _react.useRef)([]).current;
  const [displayValue, setDisplayValue] = (0, _react.useState)(data[0]); // TODO:
  // remove WTF is this variable ?

  const [rotationPaths, setRotationPath] = (0, _react.useState)([]);

  const defaultInterpolateConfig = () => ({
    inputRange: [0, 100],
    outputRange: [startAngle, endAngle]
  });

  const sumOfDonutItemValue = (0, _react.useMemo)(() => data.map(d => d.value).reduce((total, prev) => total + prev), [data]);
  const donutItemValueToPercentage = (0, _react.useMemo)(() => data.map(d => d.value / sumOfDonutItemValue * 100), [sumOfDonutItemValue, data]);
  (0, _react.useMemo)(() => {
    const rotationRange = [];
    data.forEach((_, idx) => {
      const fromValues = (0, _array.sum)(donutItemValueToPercentage.slice(0, idx));
      const toValues = (0, _array.sum)(donutItemValueToPercentage.slice(0, idx + 1));
      animatedPaths.push(new _reactNative.Animated.Value((0, _math.LinearInterpolation)({
        value: fromValues,
        ...defaultInterpolateConfig()
      })));
      rotationRange[idx] = {
        from: (0, _math.LinearInterpolation)({
          value: fromValues,
          ...defaultInterpolateConfig()
        }),
        to: (0, _math.LinearInterpolation)({
          value: toValues,
          ...defaultInterpolateConfig()
        })
      };
    });
    setRotationPath(rotationRange);
  }, [data]);
  (0, _react.useEffect)(() => {
    switch (animationType) {
      case "slide":
        animateContainerOpacity.setValue(1);
        slideAnimation();
        break;

      default:
        fadeAnimation();
        break;
    }
  }, []);

  const slideAnimation = () => {
    const animations = data.map((_, i) => {
      const ani = _reactNative.Animated.timing(animatedPaths[i], {
        toValue: rotationPaths[i].to,
        duration: 3000,
        easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1),
        useNativeDriver: true
      });

      return ani;
    });

    _reactNative.Animated.parallel(animations).start();
  };

  const fadeAnimation = () => {
    _reactNative.Animated.timing(animateContainerOpacity, {
      toValue: 1,
      duration: 5000,
      easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true
    }).start();
  };

  (0, _react.useEffect)(() => {
    data.forEach((_, i) => {
      const element = pathRefs.current[i];
      donutItemListeners[i] = addListener({
        element,
        animatedValue: animatedPaths[i],
        startValue: rotationPaths[i].from
      });
    });
  }, []);
  (0, _react.useEffect)(() => {
    return () => {
      if (animationType === "slide") {
        data.forEach((_, i) => {
          if (donutItemListeners !== null && donutItemListeners !== void 0 && donutItemListeners[i] && donutItemListeners !== null && donutItemListeners !== void 0 && donutItemListeners[i].removeAllListeners) {
            var _donutItemListeners$i, _donutItemListeners$i2;

            donutItemListeners === null || donutItemListeners === void 0 ? void 0 : (_donutItemListeners$i = (_donutItemListeners$i2 = donutItemListeners[i]).removeAllListeners) === null || _donutItemListeners$i === void 0 ? void 0 : _donutItemListeners$i.call(_donutItemListeners$i2);
          }
        });
      }
    };
  }, []);

  const addListener = _ref2 => {
    let {
      element,
      animatedValue,
      startValue
    } = _ref2;
    animatedValue.addListener(angle => {
      const arcParams = {
        coordX: viewBox.getCenterCoord().x,
        coordY: viewBox.getCenterCoord().y,
        radius: radius,
        startAngle: startValue,
        endAngle: angle.value
      };
      const drawPath = new _svg.Arc(arcParams).getDrawPath();

      if (element) {
        element.setNativeProps({
          d: drawPath
        });
      }
    });
  };

  (0, _react.useEffect)(() => {
    animateOpacity.setValue(0);

    _reactNative.Animated.timing(animateOpacity, {
      toValue: 1,
      duration: 500,
      easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true
    }).start();
  }, []);

  const onUpdateDisplayValue = (value, index) => {
    setDisplayValue(value);
    animateOpacity.setValue(0);

    _reactNative.Animated.parallel([_reactNative.Animated.timing(animateOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    })]).start();
  };

  const onPressIn = (value, index) => {
    _reactNative.Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth + 2,
      duration: 500,
      useNativeDriver: true,
      easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1)
    }).start();
  };

  const onPressOut = index => {
    _reactNative.Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth,
      duration: 500,
      useNativeDriver: true,
      easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1)
    }).start();
  };

  const _getContainerStyle = () => [styles.defaultContainer, containerStyle, {
    width: containerWidth,
    height: containerHeight
  }];

  const _getLabelValueStyle = color => [styles.defaultLabelValue, {
    color
  }, labelValueStyle];

  const _getLabelTitleStyle = color => [styles.defaultLabelTitle, {
    color
  }, labelTitleStyle];

  const _getLabelWrapperStyle = () => [styles.defaultLabelWrapper, {
    width: squareInCircle.getCorner() - strokeWidth,
    height: squareInCircle.getCorner() - strokeWidth,
    opacity: animateOpacity
  }, labelWrapperStyle];

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _getContainerStyle()
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Svg, {
    width: viewBox.width,
    height: viewBox.height
  }, rotationPaths.map((d, i) => {
    const arcParams = {
      coordX: viewBox.getCenterCoord().x,
      coordY: viewBox.getCenterCoord().y,
      radius: radius,
      startAngle: d.from,
      endAngle: d.to
    };
    const drawPath = new _svg.Arc(arcParams).getDrawPath();
    return /*#__PURE__*/_react.default.createElement(AnimatedPath, {
      key: `item-${i}`,
      ref: el => pathRefs.current[i] = el,
      onPress: () => onUpdateDisplayValue(data[i], i),
      onPressIn: () => onPressIn(data[i], i),
      onPressOut: () => onPressOut(i),
      strokeLinecap: type,
      d: drawPath,
      opacity: animateContainerOpacity,
      fill: "none",
      stroke: data[i].color,
      strokeWidth: animatedStrokeWidths[i]
    });
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: _getLabelWrapperStyle()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _getLabelValueStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color)
  }, displayValue === null || displayValue === void 0 ? void 0 : displayValue.value), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _getLabelTitleStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color)
  }, displayValue === null || displayValue === void 0 ? void 0 : displayValue.name))));
};

exports.DonutChart = DonutChart;

const styles = _reactNative.StyleSheet.create({
  defaultContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  defaultLabelWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  defaultLabelValue: {
    fontSize: 32,
    fontWeight: "bold"
  },
  defaultLabelTitle: {
    fontSize: 16
  }
});
//# sourceMappingURL=index.js.map