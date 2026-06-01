import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ReactNode, useEffect, useRef } from "react";
import { styleConsts, colors, shadowEquivalent } from "@/src/utils/styles";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SolidButton({
  backgroundColor = colors.white,
  height = 50,
  width = 50,
  borderTopLeftRadius = styleConsts.radius,
  borderTopRightRadius = styleConsts.radius,
  borderBottomLeftRadius = styleConsts.radius,
  borderBottomRightRadius = styleConsts.radius,
  padding = 4,
  onPress,
  child,
  isToggle = false,
  toggleValue,
  style,
}: {
  backgroundColor?: string;
  height?: number;
  width?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  padding?: number;
  onPress: () => void;
  child?: ReactNode;
  isToggle?: boolean;
  toggleValue?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const p = useSharedValue(0);
  const depth = styleConsts.depth;
  const pressCompleted = useRef(false);

  const animatedStyle = useAnimatedStyle(() => {
    const shadow = -depth + p.value * depth * 2;
    return {
      width: width - p.value * depth,
      height: height - p.value * depth,
      marginTop: -depth + p.value * depth,
      marginLeft: -depth + p.value * depth,
      paddingTop: padding + p.value * depth,
      paddingLeft: padding + p.value * depth,
      paddingBottom: padding + depth - p.value * depth,
      paddingRight: padding + depth - p.value * depth,
      boxShadow: `inset ${shadow}px ${shadow}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
      borderColor: `rgba(0,0,0,${styleConsts.shadowOpacity})`,
      backgroundColor: shadowEquivalent(
        colors.white,
        p.value * styleConsts.darkenFace,
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
      {child}
    </AnimatedPressable>
  );
}
