import { Pressable, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function SolidButton({
  backgroundColor,
  height,
  width,
  depth = 2,
  borderRadius = 10,
  padding = 4,
  onPress,
}: {
  backgroundColor: string;
  height: number;
  width: number;
  depth?: number;
  borderRadius?: number;
  padding?: number;
  onPress: () => void;
}) {
  const p = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    const shadow = -depth + p.value * depth * 2;
    return {
      width: width - p.value * depth,
      height: height - p.value * depth,
      marginTop: -depth + p.value * depth,
      marginLeft: -depth + p.value * depth,
      marginRight: 0,
      marginBottom: 0,
      paddingTop: padding + p.value * depth,
      paddingLeft: padding + p.value * depth,
      paddingBottom: padding + depth - p.value * depth,
      paddingRight: padding + depth - p.value * depth,
      boxShadow: `inset ${shadow}px ${shadow}px 0 rgba(0,0,0,0.35)`,
    };
  });

  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <Pressable
      onPressIn={() => press(1)}
      onPressOut={() => press(0)}
      onPress={onPress}
    >
      <Animated.View
        style={[{ backgroundColor, borderRadius, overflow: "hidden" }, style]}
      ></Animated.View>
    </Pressable>
  );
}
