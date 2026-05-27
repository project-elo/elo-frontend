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
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Option<T = string> = {
  label: string;
  value: T;
};

export default function SolidDropDown<T extends string | number>({
  title,
  options,
  value,
  setValue,
  backgroundColor = colors.white,
}: {
  title: string;
  options: Option<T>[];
  value: any;
  setValue: (v: T) => void;
  backgroundColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const { settings } = useSettingsStore();
  const selectedOption = options.find((o) => o.value === value);

  const width = 200;
  const padding = 10;
  const depth = 2;
  const height = 50;

  const p = useSharedValue(0);

  const menuItemStyle = useAnimatedStyle(() => {
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
    };
  });

  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: styleConsts.pressDuration,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={() => setOpen(true)}
    >
      <Text style={styles.text}>{title}</Text>

      <Popover
        isVisible={open}
        onRequestClose={() => setOpen(false)}
        backgroundStyle={{ backgroundColor: "transparent" }}
        popoverStyle={styles.popover}
        arrowSize={{ width: 0, height: 0 }}
        offset={10}
        from={
          <View style={styles.button}>
            <Text style={[styles.buttonText, { color: colors.theme }]}>
              {selectedOption?.label ?? "Select"}
            </Text>
            <Entypo
              style={[styles.icon, { color: colors.theme }]}
              name="select-arrows"
            />
          </View>
        }
      >
        <View style={styles.menu}>
          {options.map((opt) => (
            <AnimatedPressable
              key={opt.value}
              style={[styles.menuItem, menuItemStyle]}
              onPressIn={() => {
                press(1);
              }}
              onPressOut={() => {
                press(0);
              }}
              onPress={() => {
                setValue(opt.value);
                setOpen(false);
              }}
            >
              <Text style={styles.text}>{opt.label}</Text>
              {opt.value === value && (
                <Entypo
                  style={[styles.icon, { color: colors.theme }]}
                  name="check"
                />
              )}
            </AnimatedPressable>
          ))}
        </View>
      </Popover>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  text: {
    fontSize: fontSizes.text,
  },
  buttonText: {
    fontSize: fontSizes.text,
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
  },
  menu: {
    backgroundColor: shadowEquivalent(colors.white),
    borderRadius: 12,
    minWidth: 200,
    gap: 3,
  },
  menuItem: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popover: {
    backgroundColor: "transparent",
    borderRadius: 12,
    marginHorizontal: -10,
    elevation: 6,
    overflow: "visible",
  },
});
