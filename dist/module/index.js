import React, { useEffect, useRef, useMemo, useState, Fragment } from "react";
import { Text, View, Animated, StyleSheet, Easing } from "react-native";
import { Svg, Path } from "react-native-svg";
import { Square } from "./packages/shape";
import { Arc, ViewBox } from "./packages/svg";
import { sum } from "./packages/array";
import { LinearInterpolation } from "./packages/math";
const AnimatedPath = Animated.createAnimatedComponent(Path);
export const DonutChart = _ref => {
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
  const viewBox = new ViewBox({
    width: containerWidth,
    height: containerHeight
  });
  const squareInCircle = new Square({
    diameter: radius * 2
  });
  const animateOpacity = useRef(new Animated.Value(0)).current;
  const animateContainerOpacity = useRef(new Animated.Value(0)).current;
  const animatedStrokeWidths = useRef(data.map(() => new Animated.Value(strokeWidth))).current;
  const pathRefs = useRef([]);
  const animatedPaths = useRef([]).current;
  const [displayValue, setDisplayValue] = useState(data[0]); // TODO:
  // remove WTF is this variable ?

  const [rotationPaths, setRotationPath] = useState([]);

  const defaultInterpolateConfig = () => ({
    inputRange: [0, 100],
    outputRange: [startAngle, endAngle]
  });

  const sumOfDonutItemValue = useMemo(() => data.map(d => d.value).reduce((total, prev) => total + prev), [data]);
  const donutItemValueToPercentage = useMemo(() => data.map(d => d.value / sumOfDonutItemValue * 100), [sumOfDonutItemValue, data]);
  useMemo(() => {
    const rotationRange = [];
    data.forEach((_, idx) => {
      const fromValues = sum(donutItemValueToPercentage.slice(0, idx));
      const toValues = sum(donutItemValueToPercentage.slice(0, idx + 1));
      animatedPaths.push(new Animated.Value(LinearInterpolation({
        value: fromValues,
        ...defaultInterpolateConfig()
      })));
      rotationRange[idx] = {
        from: LinearInterpolation({
          value: fromValues,
          ...defaultInterpolateConfig()
        }),
        to: LinearInterpolation({
          value: toValues,
          ...defaultInterpolateConfig()
        })
      };
    });
    setRotationPath(rotationRange);
  }, [data]);
  useEffect(() => {
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
      const ani = Animated.timing(animatedPaths[i], {
        toValue: rotationPaths[i].to,
        duration: 3000,
        easing: Easing.bezier(0.075, 0.82, 0.165, 1),
        useNativeDriver: true
      });
      return ani;
    });
    Animated.parallel(animations).start();
  };

  const fadeAnimation = () => {
    Animated.timing(animateContainerOpacity, {
      toValue: 1,
      duration: 5000,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    data.forEach((_, i) => {
      const element = pathRefs.current[i];
      donutItemListeners[i] = addListener({
        element,
        animatedValue: animatedPaths[i],
        startValue: rotationPaths[i].from
      });
    });
  }, []);
  useEffect(() => {
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
      const drawPath = new Arc(arcParams).getDrawPath();

      if (element) {
        element.setNativeProps({
          d: drawPath
        });
      }
    });
  };

  useEffect(() => {
    animateOpacity.setValue(0);
    Animated.timing(animateOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true
    }).start();
  }, []);

  const onUpdateDisplayValue = (value, index) => {
    setDisplayValue(value);
    animateOpacity.setValue(0);
    Animated.parallel([Animated.timing(animateOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    })]).start();
  };

  const onPressIn = (value, index) => {
    Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth + 2,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1)
    }).start();
  };

  const onPressOut = index => {
    Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1)
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

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: _getContainerStyle()
  }, /*#__PURE__*/React.createElement(Svg, {
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
    const drawPath = new Arc(arcParams).getDrawPath();
    return /*#__PURE__*/React.createElement(AnimatedPath, {
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
  })), /*#__PURE__*/React.createElement(Animated.View, {
    style: _getLabelWrapperStyle()
  }, /*#__PURE__*/React.createElement(Text, {
    style: _getLabelValueStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color)
  }, displayValue === null || displayValue === void 0 ? void 0 : displayValue.value), /*#__PURE__*/React.createElement(Text, {
    style: _getLabelTitleStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color)
  }, displayValue === null || displayValue === void 0 ? void 0 : displayValue.name))));
};
const styles = StyleSheet.create({
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