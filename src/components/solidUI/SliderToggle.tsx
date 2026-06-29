import { useEffect } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  colors,
  styleConsts,
  fontSizes,
  shadowEquivalent,
} from "@/src/utils/styles";
import * as Haptics from "expo-haptics";
import { Option } from "@/src/types/componentTypes";

export default function SliderToggle<T extends string | number>({
  options,
  value,
  setValue,
  optionWidth = 80,
  height = styleConsts.tileHeight,
}: {
  options: Option<T>[];
  value: T;
  setValue: (v: T) => void;
  optionWidth?: number;
  height?: number;
}) {
  const speed = 150;

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const trackWidth = optionWidth * options.length;
  const thumbHeight = height - styleConsts.depth * 2;

  const t = useSharedValue(selectedIndex);

  useEffect(() => {
    t.value = withSpring(selectedIndex, {
      damping: 20,
      stiffness: speed,
      mass: 0.5,
    });
  }, [selectedIndex, t]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: t.value * optionWidth }],
  }));

  return (
    <View
      style={{
        width: trackWidth,
        height,
        borderRadius: styleConsts.radius,
        padding: styleConsts.depth,
        overflow: "hidden",
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          borderRadius: styleConsts.radius,
          backgroundColor: colors.apple,
          zIndex: 0,
        }}
      />

      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: styleConsts.depth,
            left: styleConsts.depth,
            width: optionWidth - styleConsts.depth * 2,
            height: thumbHeight,
            borderRadius: styleConsts.radius,
            backgroundColor: colors.white,
            zIndex: 1,
            boxShadow: `${styleConsts.depth}px ${styleConsts.depth}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
          },
          thumbStyle,
        ]}
      />

      <View style={styles.row}>
        {options.map((opt, i) => {
          const isSelected = i === selectedIndex;
          return (
            <Pressable
              key={i}
              onPress={() => {
                setValue(opt.value);
                setTimeout(() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }, speed * 0.66);
              }}
              style={[styles.option, { width: optionWidth }]}
            >
              <Text
                style={styles.text}
                adjustsFontSizeToFit
                numberOfLines={1}
                minimumFontScale={0.6}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    zIndex: 2,
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: fontSizes.text,
    textAlign: "center",
  },
});
