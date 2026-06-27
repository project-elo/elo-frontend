import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { colors, styleConsts, shadowEquivalent } from "@/src/utils/styles";
import * as Haptics from "expo-haptics";

export default function SolidToggle({
  value,
  onChange,
  width = 56,
  height = 32,

  offColor = colors.apple,
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

  useEffect(() => {
    t.value = withSpring(value ? 1 : 0, {
      damping: 12,
      stiffness: speed,
      mass: 0.5,
    });
  }, [value, t]);

  const fillStyle = useAnimatedStyle(() => ({
    width: Math.max(0, t.value) * width,
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
      style={[
        {
          width,
          height,
          backgroundColor: offColor,
          borderRadius: height / 2,
          padding: styleConsts.depth,
          overflow: "hidden",
        },
      ]}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          borderRadius: height / 2,
          boxShadow: `inset ${styleConsts.depth * 0.5}px ${styleConsts.depth * 0.5}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
          zIndex: 0,
        }}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: onColor,
            borderRadius: height / 2,
            boxShadow: ` inset ${styleConsts.depth * 0.5}px ${styleConsts.depth * 0.5}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
            zIndex: 1,
          },
          fillStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: colors.white,
            zIndex: 2,
            boxShadow: ` ${styleConsts.depth * 0.5}px ${styleConsts.depth * 0.5}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
          },
          thumbStyle,
        ]}
      />
    </Pressable>
  );
}
