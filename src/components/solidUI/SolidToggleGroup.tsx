import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  colors,
  fontSizes,
  styleConsts,
  shadowEquivalent,
} from "@/src/utils/styles";
import Popover from "react-native-popover-view";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Polygon, Rect } from "react-native-svg";
import sleep from "@/src/utils/sleep";
import * as Haptics from "expo-haptics";
import SolidButton from "./SolidButton";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Option<T = string> = {
  label: string;
  value: T;
};

export default function SolidToggleGroup<T extends string | number>({
  title,
  options,
  value,
  setValue,
  backgroundColor,
}: {
  title: string;
  options: Option<T>[];
  value: any;
  setValue: (v: T) => void;
  backgroundColor?: string;
}) {
  const selectedOption = options.find((o) => o.value === value);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttonContainer}>
        {options.map((opt, i) => (
          <SolidButton key={i} onPress={() => {}} width={100} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,

    flexDirection: "row",
    backgroundColor: "red",
  },
  text: {
    fontSize: fontSizes.text,
  },
});
