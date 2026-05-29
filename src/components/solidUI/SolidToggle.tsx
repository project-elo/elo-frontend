import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Color from "color";
import { colors, styleConsts, shadowEquivalent } from "@/src/utils/styles";
import * as Haptics from "expo-haptics";

export default function SolidToggle({
  value,
  onChange,
  width = 56,
  height = 32,

  offColor = "#d4d4d4",
  onColor = colors.theme,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  width?: number;
  height?: number;
  offColor?: string;
  onColor?: string;
}) {
  const t = useSharedValue(value ? 1 : 0);
  const thumbSize = height - styleConsts.depth * 2;
  const range = width - height;
  const speed = 150;

  t.value = withSpring(value ? 1 : 0, {
    damping: 12,
    stiffness: speed,
    mass: 0.5,
  });

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: t.value > 0.5 ? onColor : offColor,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: t.value * range }],
  }));

  return (
    <Pressable
      onPress={() => {
        onChange(!value);

        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }, speed * 0.66);
      }}
    >
      <Animated.View
        style={[
          {
            width,
            height,
            borderRadius: height / 2,
            padding: styleConsts.depth,
            boxShadow: `inset ${styleConsts.depth}px ${styleConsts.depth}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
            overflow: "hidden",
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
              backgroundColor: colors.offWhite,
              boxShadow: `${styleConsts.depth}px ${styleConsts.depth}px 0 ${shadowEquivalent(colors.offWhite)}`,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}
