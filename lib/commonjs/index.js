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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const AnimatedPath = _reactNative.Animated.createAnimatedComponent(_reactNativeSvg.Path);
const DonutChart = ({
  data,
  containerWidth,
  containerHeight,
  radius,
  startAngle = -125,
  endAngle = startAngle * -1,
  strokeWidth = 10,
  type = "round",
  animationType = "slide",
  unit,
  typeLabel = "circular",
  labelWrapperStyle,
  labelValueStyle,
  labelTitleStyle,
  containerStyle,
  styleName,
  styleValue,
  icon = '',
  switchSvg = false,
  animatedRight,
  disableAnimation = true,
  valueShow
}) => {
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
  const [displayValue, setDisplayValue] = (0, _react.useState)(switchSvg ? data[1] : data[0]);

  // TODO:
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
    if (switchSvg) {
      animatedPaths.length = 0;
      data.forEach((_, idx) => {
        const fromValues = (0, _array.sum)(donutItemValueToPercentage.slice(0, idx));
        const toValues = (0, _array.sum)(donutItemValueToPercentage.slice(0, idx + 1));
        const start = (0, _math.LinearInterpolation)({
          value: fromValues,
          ...defaultInterpolateConfig()
        });
        const end = (0, _math.LinearInterpolation)({
          value: toValues,
          ...defaultInterpolateConfig()
        });
        rotationRange[idx] = {
          from: start,
          to: end
        };
        animatedPaths.unshift(new _reactNative.Animated.Value(start));
      });
      setRotationPath(rotationRange);
    } else {
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
    }
  }, [data]);
  (0, _react.useEffect)(() => {
    if (disableAnimation === true) {
      // Không chạy animation, hiển thị ngay trạng thái cuối cùng
      rotationPaths.forEach((d, i) => {
        animatedPaths[i].setValue(d.to); // Đặt giá trị trực tiếp mà không cần animate
      });
    } else {
      switch (animationType) {
        case "slide":
          animateContainerOpacity.setValue(1);
          slideAnimation();
          break;
        default:
          fadeAnimation();
          break;
      }
    }
  }, [disableAnimation, data]);
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
  let animationInProgress = false;
  const [stepAnimated, setStepAnimated] = (0, _react.useState)(1);
  const slideAnimation = () => {
    if (disableAnimation || animationInProgress) return;
    if (switchSvg) {
      const animations = rotationPaths.map((d, i) => {
        return _reactNative.Animated.timing(animatedPaths[i], {
          toValue: d.to,
          duration: 3000,
          easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1),
          useNativeDriver: true
        });
      });
      _reactNative.Animated.parallel(animations).start();
    } else {
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
    }
    animationInProgress = true;
    const startAnimation = index => {
      if (index >= animatedPaths.length || index > stepAnimated) {
        animationInProgress = false; // Reset when all animations are done
        return;
      }
      setTimeout(() => {
        setStepAnimated(index);
      }, 25);
      _reactNative.Animated.timing(animatedPaths[index], {
        toValue: rotationPaths[index].to,
        duration: 2000,
        easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1),
        useNativeDriver: true
      }).start(() => {
        startAnimation(index + 1);
      });
    };
    startAnimation(0);
    setStepAnimated(0);
  };
  const fadeAnimation = () => {
    _reactNative.Animated.timing(animateContainerOpacity, {
      toValue: 1,
      duration: 2500,
      easing: _reactNative.Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true
    }).start();
  };
  (0, _react.useEffect)(() => {
    data.forEach((_, i) => {
      const element = pathRefs.current[animatedRight ? 1 : i];
      donutItemListeners[i] = addListener({
        element,
        animatedValue: animatedPaths[animatedRight ? 1 : i],
        startValue: rotationPaths[animatedRight ? 1 : i].from
      });
    });
  }, []);
  (0, _react.useEffect)(() => {
    return () => {
      if (animationType === "slide") {
        data.forEach((_, i) => {
          if (donutItemListeners !== null && donutItemListeners !== void 0 && donutItemListeners[i] && donutItemListeners !== null && donutItemListeners !== void 0 && donutItemListeners[i].removeAllListeners) {
            var _donutItemListeners$i, _donutItemListeners$i2;
            donutItemListeners === null || donutItemListeners === void 0 || (_donutItemListeners$i = (_donutItemListeners$i2 = donutItemListeners[i]).removeAllListeners) === null || _donutItemListeners$i === void 0 || _donutItemListeners$i.call(_donutItemListeners$i2);
          }
        });
      }
    };
  }, []);
  const addListener = ({
    element,
    animatedValue,
    startValue
  }) => {
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
  const _getLabelWrapperStyle = () => [typeLabel === 'circular' ? styles.defaultLabelWrapper : styles.defaultLabelSemiCircular, {
    width: squareInCircle.getCorner() - strokeWidth,
    height: squareInCircle.getCorner() - strokeWidth,
    opacity: animateOpacity
  }, labelWrapperStyle];
  const _getLabelWrapperIconStyle = () => [styles.defaultLabelIcon, {
    width: radius * (_reactNative.Platform.OS === 'android' ? 1.5 : 1.55),
    height: radius * (_reactNative.Platform.OS === 'android' ? 1.5 : 1.55),
    borderRadius: 120,
    backgroundColor: '#F4F8FC',
    opacity: animateOpacity
  }, labelWrapperStyle];
  const renderSvg = (0, _react.useMemo)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Svg, {
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
        stroke: stepAnimated < i && !disableAnimation ? 'white' : data[i].color,
        strokeWidth: animatedStrokeWidths[i]
      });
    }));
  }, [rotationPaths, viewBox, stepAnimated, pathRefs.current, animateContainerOpacity, animatedStrokeWidths]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _getContainerStyle()
  }, renderSvg, icon !== '' ? /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: _getLabelWrapperIconStyle()
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.SvgXml, {
    xml: icon
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: _getLabelWrapperStyle()
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [_getLabelTitleStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color), {
      ...styleName
    }]
  }, displayValue === null || displayValue === void 0 ? void 0 : displayValue.name), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [_getLabelValueStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color), {
      ...styleValue
    }]
  }, valueShow.value, " ", unit))));
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
  defaultLabelSemiCircular: {
    position: "absolute",
    alignItems: "center",
    justifyContent: 'flex-start',
    paddingTop: _reactNative.Dimensions.get('window').width * 0.06
  },
  defaultLabelIcon: {
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