import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ReactNode, useEffect } from "react";
import { styleConsts } from "@/src/utils/objects/styles";

export default function SolidButton({
  backgroundColor,
  height,
  width,
  depth = 2,
  borderRadius = 10,
  padding = 4,
  onPress,
  icon,
  isToggle = false,
  toggleValue,
}: {
  backgroundColor: string;
  height: number;
  width: number;
  depth?: number;
  borderRadius?: number;
  padding?: number;
  onPress: () => void;
  icon: ReactNode;
  isToggle?: boolean;
  toggleValue?: boolean;
}) {
  const p = useSharedValue(0);

  const style = useAnimatedStyle(() => {
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
      boxShadow: `inset ${shadow}px ${shadow}px 0 rgba(0,0,0,0.3)`,
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
    <Pressable
      onPressIn={() => {
        !isToggle && press(1);
      }}
      onPressOut={() => {
        !isToggle && press(0);
      }}
      onPress={onPress}
    >
      <Animated.View
        style={[{ backgroundColor, borderRadius, overflow: "hidden" }, style]}
      >
        {icon}
      </Animated.View>
    </Pressable>
  );
}
