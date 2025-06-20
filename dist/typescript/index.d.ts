/// <reference types="react" />
import { StyleProp, ViewStyle, TextStyle } from "react-native";
export declare type DonutItem = {
    name: string;
    value: number;
    color: string;
};
export declare type DonutAnimationType = "fade" | "slide";
export declare type IDonutProps = {
    data: DonutItem[];
    containerWidth: number;
    containerHeight: number;
    radius: number;
    startAngle?: number;
    endAngle?: number;
    strokeWidth?: number;
    type?: "butt" | "round";
    labelValueStyle?: StyleProp<TextStyle>;
    labelTitleStyle?: StyleProp<TextStyle>;
    labelWrapperStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    animationType?: DonutAnimationType;
};
export declare const DonutChart: ({ data, containerWidth, containerHeight, radius, startAngle, endAngle, strokeWidth, type, animationType, labelWrapperStyle, labelValueStyle, labelTitleStyle, containerStyle, }: IDonutProps) => JSX.Element;
//# sourceMappingURL=index.d.ts.map