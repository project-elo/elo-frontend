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
import Svg, { Polygon } from "react-native-svg";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Option<T = string> = {
  label: string;
  value: T;
};

const depth = 2;

function MenuItem<T extends string | number>({
  opt,
  value,
  setValue,
  setOpen,
  overlap,
  isFirst,
  isLast,
}: {
  opt: Option<T>;
  value: any;
  setValue: (v: T) => void;
  setOpen: (v: boolean) => void;
  overlap: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const p = useSharedValue(0);

  const menuItemStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: p.value * depth },
        { translateY: p.value * depth },
      ],
      backgroundColor: shadowEquivalent(colors.white, p.value * 0.025),
    };
  });

  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: styleConsts.pressDuration,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: "transparent",
          marginTop: -overlap,
          borderBottomLeftRadius: isLast ? 12 : 0,
          borderBottomRightRadius: isLast ? 12 : 0,
          borderTopRightRadius: isFirst ? 12 : 0,
          borderTopLeftRadius: isFirst ? 12 : 0,
          overflow: "hidden",
        },
        menuItemStyle,
      ]}
      onPressIn={() => press(1)}
      onPressOut={() => press(0)}
      onPress={() => {
        setValue(opt.value);
        //setOpen(false);
      }}
    >
      <View style={styles.menuItem}>
        <Text style={styles.text}>{opt.label}</Text>
        {opt.value === value && (
          <Entypo style={[styles.icon, { color: colors.theme }]} name="check" />
        )}
      </View>
      <Svg width={200} height={3} style={{ backgroundColor: "transparent" }}>
        <Polygon
          points="0,0 200,0 200,3 3,3"
          fill={shadowEquivalent(colors.white)}
        />
      </Svg>
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
          {options.map((opt, i) => (
            <MenuItem
              key={opt.value}
              opt={opt}
              value={value}
              setValue={setValue}
              setOpen={setOpen}
              overlap={i > 0 ? depth : 0}
              isFirst={i === 0}
              isLast={i === options.length - 1}
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
  menu: {},
  menuItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRightWidth: 2,
    borderRightColor: shadowEquivalent(colors.white),
  },
  popover: {
    backgroundColor: "transparent",
    borderRadius: 12,
    marginHorizontal: -10,
    paddingLeft: 2,
  },
});
