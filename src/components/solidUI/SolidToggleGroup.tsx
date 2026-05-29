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
  const totalWidth = 200;
  const width = totalWidth / options.length;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttonContainer}>
        {options.map((opt, i) => (
          <SolidButton
            key={i}
            onPress={() => setValue(opt.value)}
            borderTopLeftRadius={i === 0 ? styleConsts.radius : 0}
            borderBottomLeftRadius={i === 0 ? styleConsts.radius : 0}
            borderTopRightRadius={
              i === options.length - 1 ? styleConsts.radius : 0
            }
            borderBottomRightRadius={
              i === options.length - 1 ? styleConsts.radius : 0
            }
            width={width}
            height={39}
            isToggle={true}
            toggleValue={selectedOption === opt}
            child={
              <View style={styles.child}>
                <Text style={styles.text}>{opt.label}</Text>
              </View>
            }
          />
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
    flexDirection: "row",
    gap: 1,
  },
  child: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
  },
  text: {
    fontSize: fontSizes.text,
  },
});
