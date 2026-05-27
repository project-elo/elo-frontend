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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Option<T = string> = {
  label: string;
  value: T;
};

const width = 200;
const padding = 10;
const depth = 2;
const height = 50;

function MenuItem<T extends string | number>({
  opt,
  value,
  setValue,
  setOpen,
}: {
  opt: Option<T>;
  value: any;
  setValue: (v: T) => void;
  setOpen: (v: boolean) => void;
}) {
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
    };
  });

  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: styleConsts.pressDuration,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <AnimatedPressable
      style={[styles.menuItem, menuItemStyle]}
      onPressIn={() => press(1)}
      onPressOut={() => press(1)}
      onPress={() => {
        setValue(opt.value);
        //setOpen(false);
      }}
    >
      <Text style={styles.text}>{opt.label}</Text>
      {opt.value === value && (
        <Entypo style={[styles.icon, { color: colors.theme }]} name="check" />
      )}
    </AnimatedPressable>
  );
}

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
  const selectedOption = options.find((o) => o.value === value);

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
        offset={14}
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
            <MenuItem
              key={opt.value}
              opt={opt}
              value={value}
              setValue={setValue}
              setOpen={setOpen}
            />
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
    backgroundColor: shadowEquivalent(colors.red),
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
    elevation: 6,
    marginHorizontal: -10,
    paddingLeft: 2,
  },
});
