"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonutChart = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_1 = require("react-native-svg");
var shape_1 = require("./packages/shape");
var svg_1 = require("./packages/svg");
var array_1 = require("./packages/array");
var math_1 = require("./packages/math");
var AnimatedPath = react_native_1.Animated.createAnimatedComponent(react_native_svg_1.Path);
var DonutChart = function (_a) {
    var data = _a.data, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, radius = _a.radius, _b = _a.startAngle, startAngle = _b === void 0 ? -125 : _b, _c = _a.endAngle, endAngle = _c === void 0 ? startAngle * -1 : _c, _d = _a.strokeWidth, strokeWidth = _d === void 0 ? 10 : _d, _e = _a.type, type = _e === void 0 ? "round" : _e, _f = _a.animationType, animationType = _f === void 0 ? "slide" : _f, unit = _a.unit, _g = _a.typeLabel, typeLabel = _g === void 0 ? "circular" : _g, labelWrapperStyle = _a.labelWrapperStyle, labelValueStyle = _a.labelValueStyle, labelTitleStyle = _a.labelTitleStyle, containerStyle = _a.containerStyle, styleName = _a.styleName, styleValue = _a.styleValue, _h = _a.icon, icon = _h === void 0 ? '' : _h, _j = _a.switchSvg, switchSvg = _j === void 0 ? false : _j, animatedRight = _a.animatedRight, _k = _a.disableAnimation, disableAnimation = _k === void 0 ? true : _k, valueShow = _a.valueShow;
    var donutItemListeners = [];
    var viewBox = new svg_1.ViewBox({
        width: containerWidth,
        height: containerHeight,
    });
    var squareInCircle = new shape_1.Square({ diameter: radius * 2 });
    var animateOpacity = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var animateContainerOpacity = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var animatedStrokeWidths = (0, react_1.useRef)(data.map(function () { return new react_native_1.Animated.Value(strokeWidth); })).current;
    var pathRefs = (0, react_1.useRef)([]);
    var animatedPaths = (0, react_1.useRef)([]).current;
    var _l = (0, react_1.useState)(switchSvg ? data[1] : data[0]), displayValue = _l[0], setDisplayValue = _l[1];
    // TODO:
    // remove WTF is this variable ?
    var _m = (0, react_1.useState)([]), rotationPaths = _m[0], setRotationPath = _m[1];
    var defaultInterpolateConfig = function () { return ({ inputRange: [0, 100], outputRange: [startAngle, endAngle] }); };
    var sumOfDonutItemValue = (0, react_1.useMemo)(function () {
        return data
            .map(function (d) { return d.value; })
            .reduce(function (total, prev) { return total + prev; });
    }, [data]);
    var donutItemValueToPercentage = (0, react_1.useMemo)(function () { return data.map(function (d) { return (d.value / sumOfDonutItemValue) * 100; }); }, [sumOfDonutItemValue, data]);
    (0, react_1.useMemo)(function () {
        var rotationRange = [];
        if (switchSvg) {
            animatedPaths.length = 0;
            data.forEach(function (_, idx) {
                var fromValues = (0, array_1.sum)(donutItemValueToPercentage.slice(0, idx));
                var toValues = (0, array_1.sum)(donutItemValueToPercentage.slice(0, idx + 1));
                var start = (0, math_1.LinearInterpolation)(__assign({ value: fromValues }, defaultInterpolateConfig()));
                var end = (0, math_1.LinearInterpolation)(__assign({ value: toValues }, defaultInterpolateConfig()));
                rotationRange[idx] = { from: start, to: end };
                animatedPaths.unshift(new react_native_1.Animated.Value(start));
            });
            setRotationPath(rotationRange);
        }
        else {
            data.forEach(function (_, idx) {
                var fromValues = (0, array_1.sum)(donutItemValueToPercentage.slice(0, idx));
                var toValues = (0, array_1.sum)(donutItemValueToPercentage.slice(0, idx + 1));
                animatedPaths.push(new react_native_1.Animated.Value((0, math_1.LinearInterpolation)(__assign({ value: fromValues }, defaultInterpolateConfig()))));
                rotationRange[idx] = {
                    from: (0, math_1.LinearInterpolation)(__assign({ value: fromValues }, defaultInterpolateConfig())),
                    to: (0, math_1.LinearInterpolation)(__assign({ value: toValues }, defaultInterpolateConfig())),
                };
            });
            setRotationPath(rotationRange);
        }
    }, [data]);
    (0, react_1.useEffect)(function () {
        if (disableAnimation === true) {
            // Không chạy animation, hiển thị ngay trạng thái cuối cùng
            rotationPaths.forEach(function (d, i) {
                animatedPaths[i].setValue(d.to); // Đặt giá trị trực tiếp mà không cần animate
            });
        }
        else {
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
    (0, react_1.useEffect)(function () {
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
    var animationInProgress = false;
    var _o = (0, react_1.useState)(1), stepAnimated = _o[0], setStepAnimated = _o[1];
    var slideAnimation = function () {
        if (disableAnimation || animationInProgress)
            return;
        if (switchSvg) {
            var animations = rotationPaths.map(function (d, i) {
                return react_native_1.Animated.timing(animatedPaths[i], {
                    toValue: d.to,
                    duration: 3000,
                    easing: react_native_1.Easing.bezier(0.075, 0.82, 0.165, 1),
                    useNativeDriver: true,
                });
            });
            react_native_1.Animated.parallel(animations).start();
        }
        else {
            var animations = data.map(function (_, i) {
                var ani = react_native_1.Animated.timing(animatedPaths[i], {
                    toValue: rotationPaths[i].to,
                    duration: 3000,
                    easing: react_native_1.Easing.bezier(0.075, 0.82, 0.165, 1),
                    useNativeDriver: true,
                });
                return ani;
            });
            react_native_1.Animated.parallel(animations).start();
        }
        animationInProgress = true;
        var startAnimation = function (index) {
            if (index >= animatedPaths.length || index > stepAnimated) {
                animationInProgress = false; // Reset when all animations are done
                return;
            }
            setTimeout(function () {
                setStepAnimated(index);
            }, 25);
            react_native_1.Animated.timing(animatedPaths[index], {
                toValue: rotationPaths[index].to,
                duration: 2000,
                easing: react_native_1.Easing.bezier(0.075, 0.82, 0.165, 1),
                useNativeDriver: true,
            }).start(function () {
                startAnimation(index + 1);
            });
        };
        startAnimation(0);
        setStepAnimated(0);
    };
    var fadeAnimation = function () {
        react_native_1.Animated.timing(animateContainerOpacity, {
            toValue: 1,
            duration: 2500,
            easing: react_native_1.Easing.bezier(0.075, 0.82, 0.165, 1),
            useNativeDriver: true,
        }).start();
    };
    (0, react_1.useEffect)(function () {
        data.forEach(function (_, i) {
            var element = pathRefs.current[animatedRight ? 1 : i];
            donutItemListeners[i] = addListener({
                element: element,
                animatedValue: animatedPaths[animatedRight ? 1 : i],
                startValue: rotationPaths[animatedRight ? 1 : i].from,
            });
        });
    }, []);
    (0, react_1.useEffect)(function () {
        return function () {
            if (animationType === "slide") {
                data.forEach(function (_, i) {
                    var _a, _b;
                    if ((donutItemListeners === null || donutItemListeners === void 0 ? void 0 : donutItemListeners[i]) &&
                        (donutItemListeners === null || donutItemListeners === void 0 ? void 0 : donutItemListeners[i].removeAllListeners)) {
                        (_b = donutItemListeners === null || donutItemListeners === void 0 ? void 0 : (_a = donutItemListeners[i]).removeAllListeners) === null || _b === void 0 ? void 0 : _b.call(_a);
                    }
                });
            }
        };
    }, []);
    var addListener = function (_a) {
        var element = _a.element, animatedValue = _a.animatedValue, startValue = _a.startValue;
        animatedValue.addListener(function (angle) {
            var arcParams = {
                coordX: viewBox.getCenterCoord().x,
                coordY: viewBox.getCenterCoord().y,
                radius: radius,
                startAngle: startValue,
                endAngle: angle.value,
            };
            var drawPath = new svg_1.Arc(arcParams).getDrawPath();
            if (element) {
                element.setNativeProps({ d: drawPath });
            }
        });
    };
    (0, react_1.useEffect)(function () {
        animateOpacity.setValue(0);
        react_native_1.Animated.timing(animateOpacity, {
            toValue: 1,
            duration: 500,
            easing: react_native_1.Easing.bezier(0.075, 0.82, 0.165, 1),
            useNativeDriver: true,
        }).start();
    }, []);
    var onUpdateDisplayValue = function (value, index) {
        setDisplayValue(value);
        animateOpacity.setValue(0);
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(animateOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };
    var onPressIn = function (value, index) {
        react_native_1.Animated.timing(animatedStrokeWidths[index], {
            toValue: strokeWidth + 2,
            duration: 500,
            useNativeDriver: true,
            easing: react_native_1.Easing.bezier(0.075, 0.82, 0.165, 1),
        }).start();
    };
    var onPressOut = function (index) {
        react_native_1.Animated.timing(animatedStrokeWidths[index], {
            toValue: strokeWidth,
            duration: 500,
            useNativeDriver: true,
            easing: react_native_1.Easing.bezier(0.075, 0.82, 0.165, 1),
        }).start();
    };
    var _getContainerStyle = function () { return [
        styles.defaultContainer,
        containerStyle,
        { width: containerWidth, height: containerHeight },
    ]; };
    var _getLabelValueStyle = function (color) { return [
        styles.defaultLabelValue,
        { color: color },
        labelValueStyle,
    ]; };
    var _getLabelTitleStyle = function (color) { return [
        styles.defaultLabelTitle,
        { color: color },
        labelTitleStyle,
    ]; };
    var _getLabelWrapperStyle = function () { return [
        typeLabel === 'circular' ? styles.defaultLabelWrapper : styles.defaultLabelSemiCircular,
        {
            width: squareInCircle.getCorner() - strokeWidth,
            height: squareInCircle.getCorner() - strokeWidth,
            opacity: animateOpacity,
        },
        labelWrapperStyle,
    ]; };
    var _getLabelWrapperIconStyle = function () { return [
        styles.defaultLabelIcon,
        {
            width: radius * (react_native_1.Platform.OS === 'android' ? 1.5 : 1.55),
            height: radius * (react_native_1.Platform.OS === 'android' ? 1.5 : 1.55),
            borderRadius: 120,
            backgroundColor: '#F4F8FC',
            opacity: animateOpacity,
        },
        labelWrapperStyle,
    ]; };
    var renderSvg = (0, react_1.useMemo)(function () {
        return (<react_native_svg_1.Svg width={viewBox.width} height={viewBox.height}>
        {rotationPaths.map(function (d, i) {
                var arcParams = {
                    coordX: viewBox.getCenterCoord().x,
                    coordY: viewBox.getCenterCoord().y,
                    radius: radius,
                    startAngle: d.from,
                    endAngle: d.to,
                };
                var drawPath = new svg_1.Arc(arcParams).getDrawPath();
                return (<AnimatedPath key={"item-".concat(i)} ref={function (el) { return (pathRefs.current[i] = el); }} onPress={function () { return onUpdateDisplayValue(data[i], i); }} onPressIn={function () { return onPressIn(data[i], i); }} onPressOut={function () { return onPressOut(i); }} strokeLinecap={type} d={drawPath} opacity={animateContainerOpacity} fill="none" stroke={stepAnimated < i && !disableAnimation ? 'white' : data[i].color} strokeWidth={animatedStrokeWidths[i]}/>);
            })}
      </react_native_svg_1.Svg>);
    }, [rotationPaths, viewBox, stepAnimated, pathRefs.current, animateContainerOpacity, animatedStrokeWidths]);
    return (<react_1.Fragment>
      <react_native_1.View style={_getContainerStyle()}>
      {renderSvg}
        {icon !== '' ?
            <react_native_1.Animated.View style={_getLabelWrapperIconStyle()}>
          <react_native_svg_1.SvgXml xml={icon}/>
          </react_native_1.Animated.View>
            :
                <react_native_1.Animated.View style={_getLabelWrapperStyle()}>
          <react_native_1.Text style={[_getLabelTitleStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color), __assign({}, styleName)]}>
            {displayValue === null || displayValue === void 0 ? void 0 : displayValue.name}
          </react_native_1.Text>
          <react_native_1.Text style={[_getLabelValueStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color), __assign({}, styleValue)]}>
            {valueShow.value} {unit}
          </react_native_1.Text>
        </react_native_1.Animated.View>}
      </react_native_1.View>
    </react_1.Fragment>);
};
exports.DonutChart = DonutChart;
var styles = react_native_1.StyleSheet.create({
    defaultContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    defaultLabelWrapper: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    defaultLabelSemiCircular: {
        position: "absolute",
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingTop: react_native_1.Dimensions.get('window').width * 0.06
    },
    defaultLabelIcon: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    defaultLabelValue: {
        fontSize: 32,
        fontWeight: "bold",
    },
    defaultLabelTitle: {
        fontSize: 16,
    },
});
