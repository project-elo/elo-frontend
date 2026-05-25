import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function Toggle({
  value,
  onChange,
  width = 56,
  height = 32,
  depth = 2,
  offColor = "#d4d4d4",
  onColor = "#7cc47c",
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  width?: number;
  height?: number;
  depth?: 2;
  offColor?: string;
  onColor?: string;
}) {
  const t = useSharedValue(value ? 1 : 0);
  const thumbSize = height - depth * 2;
  const range = width - height;

  // sync if parent flips it
  t.value = withTiming(value ? 1 : 0, {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
  });

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: t.value > 0.5 ? onColor : offColor,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: t.value * range }],
  }));

  return (
    <Pressable onPress={() => onChange(!value)}>
      <Animated.View
        style={[
          {
            width,
            height,
            borderRadius: height / 2,
            padding: depth,
            boxShadow: `inset ${depth}px ${depth}px 0 rgba(0,0,0,0.35)`,
          },
          trackStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: "#f5f5f5",
              boxShadow: ` ${depth}px ${depth}px 0 rgba(0,0,0,0.35)`,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}
