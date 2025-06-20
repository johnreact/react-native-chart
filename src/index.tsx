import React, { useEffect, useRef, useMemo, useState, Fragment } from "react";
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  Animated,
  StyleSheet,
  TextStyle,
  Easing,
  Dimensions,
  Platform,
} from "react-native";

import { Svg, Path, SvgXml } from "react-native-svg";
import { Square } from "./packages/shape";
import { Arc, ArcParams, ViewBox } from "./packages/svg";
import { sum } from "./packages/array";
import { LinearInterpolation } from "./packages/math";

export type DonutItem = {
  name: string;
  value: number;
  color: string;
};

export type DonutAnimationType = "fade" | "slide";

export type DonutAnimationTypeLabel = 'circular' | 'semi-circular';

export type IDonutProps = {
  data: DonutItem[];
  containerWidth: number;
  containerHeight: number;
  radius: number;
  startAngle?: number;
  endAngle?: number;
  strokeWidth?: number;
  type?: "butt" | "round" | "square";
  typeLabel?: any;
  labelValueStyle?: StyleProp<TextStyle>;
  labelTitleStyle?: StyleProp<TextStyle>;
  labelWrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  animationType?: DonutAnimationType;
  unit?: string;
  styleName?: TextStyle,
  styleValue?: TextStyle
  icon?: string
  switchSvg?: boolean
  animatedRight?: boolean
  disableAnimation?: boolean,
  valueShow?: any
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const DonutChart = ({
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
}: IDonutProps) => {
  let donutItemListeners: any = [];
  const viewBox = new ViewBox({
    width: containerWidth,
    height: containerHeight,
  });
  const squareInCircle = new Square({ diameter: radius * 2 });

  const animateOpacity = useRef(new Animated.Value(0)).current;
  const animateContainerOpacity = useRef(new Animated.Value(0)).current;
  const animatedStrokeWidths = useRef(
    data.map(() => new Animated.Value(strokeWidth))
  ).current;
  const pathRefs = useRef<typeof AnimatedPath[]>([]);
  const animatedPaths = useRef<Array<Animated.Value>>([]).current;


  

  const [displayValue, setDisplayValue] = useState<DonutItem>(switchSvg ? data[1] : data[0]);

  // TODO:
  // remove WTF is this variable ?
  const [rotationPaths, setRotationPath] = useState<
    Array<{ from: number; to: number }>
  >([]);

  const defaultInterpolateConfig = (): {
    inputRange: [number, number];
    outputRange: [number, number];
  } => ({ inputRange: [0, 100], outputRange: [startAngle, endAngle] });

  const sumOfDonutItemValue = useMemo(
    (): number =>
      data
        .map((d) => d.value)
        .reduce((total: number, prev: number) => total + prev),
    [data]
  );

  const donutItemValueToPercentage = useMemo(
    () => data.map((d) => (d.value / sumOfDonutItemValue) * 100),
    [sumOfDonutItemValue, data]
  );

  useMemo(() => {
    const rotationRange: Array<{ from: number; to: number }> = [];

    if (switchSvg) {
      animatedPaths.length = 0;
  
      data.forEach((_, idx) => {
        const fromValues = sum(donutItemValueToPercentage.slice(0, idx));
        const toValues = sum(donutItemValueToPercentage.slice(0, idx + 1))
    
        const start = LinearInterpolation({
          value: fromValues,
          ...defaultInterpolateConfig(),
        });
    
        const end = LinearInterpolation({
          value: toValues,
          ...defaultInterpolateConfig(),
        });
    
        rotationRange[idx] = { from: start, to: end };
    
        animatedPaths.unshift(new Animated.Value(start));
      });
      setRotationPath(rotationRange);
    } else {
    data.forEach((_, idx) => {
      const fromValues = sum(donutItemValueToPercentage.slice(0, idx));
      const toValues = sum(donutItemValueToPercentage.slice(0, idx + 1));

      animatedPaths.push(
        new Animated.Value(
          LinearInterpolation({
            value: fromValues,
            ...defaultInterpolateConfig(),
          })
        )
      );

      rotationRange[idx] = {
        from: LinearInterpolation({
          value: fromValues,
          ...defaultInterpolateConfig(),
        }),
        to: LinearInterpolation({
          value: toValues,
          ...defaultInterpolateConfig(),
        }),
      };
    });
    setRotationPath(rotationRange);
    }

   
  }, [data]);

  useEffect(() => {
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

  let animationInProgress = false;

  const [stepAnimated, setStepAnimated] = useState(1)

  const slideAnimation = () => {
    if (disableAnimation || animationInProgress) return;
    if (switchSvg) {
      const animations: Animated.CompositeAnimation[] = rotationPaths.map((d, i) => {
        return Animated.timing(animatedPaths[i], {
          toValue: d.to,
          duration: 3000,
          easing: Easing.bezier(0.075, 0.82, 0.165, 1),
          useNativeDriver: true,
        });
      });
    
      Animated.parallel(animations).start();
    } else {
        const animations: Animated.CompositeAnimation[] = data.map((_, i) => {
      const ani = Animated.timing(animatedPaths[i], {
        toValue: rotationPaths[i].to,
        duration: 3000,
        easing: Easing.bezier(0.075, 0.82, 0.165, 1),
        useNativeDriver: true,
      });

      return ani;
    });
    Animated.parallel(animations).start();
    }

    animationInProgress = true;

    const startAnimation = (index: number) => {

    if (index >= animatedPaths.length || index > stepAnimated) {
      animationInProgress = false; // Reset when all animations are done
      return;
    }

    setTimeout(() => {
      setStepAnimated(index);
    }, 25);


      Animated.timing(animatedPaths[index], {
        toValue: rotationPaths[index].to,
        duration: 2000,
        easing: Easing.bezier(0.075, 0.82, 0.165, 1),
        useNativeDriver: true,
      }).start(() => {
        startAnimation(index + 1);
       
      });
  };
    startAnimation(0);
    setStepAnimated(0)
  };

  const fadeAnimation = () => {
    Animated.timing(animateContainerOpacity, {
      toValue: 1,
      duration: 2500,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    data.forEach((_, i) => {
      const element = pathRefs.current[animatedRight ? 1 : i];
      donutItemListeners[i] = addListener({
        element,
        animatedValue: animatedPaths[animatedRight ? 1 : i],
        startValue: rotationPaths[animatedRight ? 1 : i].from,
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (animationType === "slide") {
        data.forEach((_, i) => {
          if (
            donutItemListeners?.[i] &&
            donutItemListeners?.[i].removeAllListeners
          ) {
            donutItemListeners?.[i].removeAllListeners?.();
          }
        });
      }
    };
  }, []);

  const addListener = ({
    element,
    animatedValue,
    startValue,
  }: {
    element: any;
    animatedValue: Animated.Value;
    startValue: number;
  }) => {
    animatedValue.addListener((angle) => {
      const arcParams: ArcParams = {
        coordX: viewBox.getCenterCoord().x,
        coordY: viewBox.getCenterCoord().y,
        radius: radius,
        startAngle: startValue,
        endAngle: angle.value,
      };
      const drawPath = new Arc(arcParams).getDrawPath();

      if (element) {
        element.setNativeProps({ d: drawPath });
      }
    });
  };

  useEffect(() => {
    animateOpacity.setValue(0);
    Animated.timing(animateOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
      useNativeDriver: true,
    }).start();
  }, []);

  const onUpdateDisplayValue = (value: DonutItem, index: number) => {
    setDisplayValue(value);
    animateOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(animateOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressIn = (value: DonutItem, index: number) => {
    Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth + 2,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
    }).start();
  };

  const onPressOut = (index: number) => {
    Animated.timing(animatedStrokeWidths[index], {
      toValue: strokeWidth,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.075, 0.82, 0.165, 1),
    }).start();
  };

  const _getContainerStyle = (): StyleProp<ViewStyle> => [
    styles.defaultContainer,
    containerStyle,
    { width: containerWidth, height: containerHeight },
  ];

  const _getLabelValueStyle = (color: string): StyleProp<TextStyle> => [
    styles.defaultLabelValue,
    { color },
    labelValueStyle,
  ];

  const _getLabelTitleStyle = (color: string): StyleProp<TextStyle> => [
    styles.defaultLabelTitle,
    { color },
    labelTitleStyle,
  ];

  const _getLabelWrapperStyle = (): Animated.WithAnimatedArray<any> => [
    typeLabel === 'circular' ? styles.defaultLabelWrapper : styles.defaultLabelSemiCircular , 
    {
      width: squareInCircle.getCorner() - strokeWidth,
      height: squareInCircle.getCorner() - strokeWidth,
      opacity: animateOpacity,
    },
    labelWrapperStyle,
  ];

  const _getLabelWrapperIconStyle = (): Animated.WithAnimatedArray<any> => [
 styles.defaultLabelIcon , 
    {
      width:  radius * (Platform.OS ==='android' ? 1.5 : 1.55),
      height: radius * (Platform.OS ==='android' ? 1.5 : 1.55),
      borderRadius: 120,
      backgroundColor: '#F4F8FC',
      opacity: animateOpacity,
    },
    labelWrapperStyle,
  ];

  const renderSvg = useMemo(() => {
    return (
      <Svg width={viewBox.width} height={viewBox.height}>
        {rotationPaths.map((d, i) => {
          const arcParams: ArcParams = {
            coordX: viewBox.getCenterCoord().x,
            coordY: viewBox.getCenterCoord().y,
            radius: radius,
            startAngle: d.from,
            endAngle: d.to,
          };
          const drawPath = new Arc(arcParams).getDrawPath();

          return (
            <AnimatedPath
              key={`item-${i}`}
              ref={(el: any) => (pathRefs.current[i] = el)}
              onPress={() => onUpdateDisplayValue(data[i], i)}
              onPressIn={() => onPressIn(data[i], i)}
              onPressOut={() => onPressOut(i)}
              strokeLinecap={type}
              d={drawPath}
              opacity={animateContainerOpacity}
              fill="none"
              stroke={ stepAnimated < i && !disableAnimation ?  'white' : data[i].color}
              strokeWidth={animatedStrokeWidths[i]}
            />
          );
        })}
      </Svg>
    )
  }, [rotationPaths, viewBox, stepAnimated, pathRefs.current, animateContainerOpacity, animatedStrokeWidths])
  

  return (
    <Fragment>
      <View style={_getContainerStyle()}>
      {renderSvg}
        {
          icon !== '' ? 
          <Animated.View style={_getLabelWrapperIconStyle()}>
          <SvgXml xml={icon} />
          </Animated.View>
          :
        <Animated.View style={_getLabelWrapperStyle()}>
          <Text style={[_getLabelTitleStyle(displayValue?.color), {...styleName}]}>
            {displayValue?.name}
          </Text>
          <Text style={[_getLabelValueStyle(displayValue?.color), {...styleValue}]}>
            {valueShow.value} {unit}
          </Text>
        </Animated.View>
        }
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
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
    paddingTop: Dimensions.get('window').width * 0.06
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
