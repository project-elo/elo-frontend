import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { ReactNode, useEffect, useRef } from "react";
import { styleConsts, colors, shadowEquivalent } from "@/src/utils/styles";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SolidButton({
  backgroundColor = colors.white,
  pressedBackgroundColor = shadowEquivalent(
    backgroundColor,
    styleConsts.darkenFace,
  ),
  height = styleConsts.tileHeight,
  width = 50,
  borderTopLeftRadius = styleConsts.radius,
  borderTopRightRadius = styleConsts.radius,
  borderBottomLeftRadius = styleConsts.radius,
  borderBottomRightRadius = styleConsts.radius,
  padding = 4,
  onPress,
  children,
  isToggle = false,
  toggleValue,
  style,
  borderWidth = 0,
  maxPress = 1,
  depth = 2,
}: {
  backgroundColor?: string;
  pressedBackgroundColor?: string;
  height?: number;
  width?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  padding?: number;
  onPress: () => void;
  children?: ReactNode;
  isToggle?: boolean;
  toggleValue?: boolean;
  style?: StyleProp<ViewStyle>;
  borderWidth?: number;
  maxPress?: number;
  depth?: number;
}) {
  const p = useSharedValue(0);
  const pressCompleted = useRef(false);

  const animatedStyle = useAnimatedStyle(() => {
    const scaled = p.value * maxPress;
    const shadow = -depth + scaled * depth * 2;
    return {
      width: width - scaled * depth,
      height: height - scaled * depth,
      marginTop: -depth + scaled * depth,
      marginLeft: -depth + scaled * depth,
      paddingTop: padding + scaled * depth,
      paddingLeft: padding + scaled * depth,
      paddingBottom: padding + depth - scaled * depth,
      paddingRight: padding + depth - scaled * depth,
      boxShadow: `inset ${shadow}px ${shadow}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
      borderColor: `rgba(0,0,0,${styleConsts.shadowOpacity})`,
      borderWidth: (1 - scaled) * borderWidth,
      backgroundColor: interpolateColor(
        p.value,
        [0, 1],
        [backgroundColor, pressedBackgroundColor],
      ),
      justifyContent: "center",
      alignItems: "center",
    };
  });

  useEffect(() => {
    press(toggleValue ? 1 : 0);
  }, [toggleValue]);

  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: styleConsts.pressDuration,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <AnimatedPressable
      style={[
        {
          height,
          width,
          backgroundColor,
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
          overflow: "hidden",
        },
        style,
        animatedStyle,
      ]}
      onPressIn={() => {
        pressCompleted.current = false;
        press(1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      onPressOut={() => {
        if (!isToggle) {
          press(0);
          return;
        }
        Promise.resolve().then(() => {
          if (!pressCompleted.current) {
            press(toggleValue ? 1 : 0);
          }
        });
      }}
      onPress={() => {
        pressCompleted.current = true;
        onPress();
      }}
    >
      {children}
    </AnimatedPressable>
  );
}
