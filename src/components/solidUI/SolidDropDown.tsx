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
import SolidButton from "./SolidButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Polygon, Rect } from "react-native-svg";
import { sleep } from "@/src/utils/utils";
import * as Haptics from "expo-haptics";
import { Option } from "@/src/types/componentTypes";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function MenuItem<T extends string | number>({
  opt,
  value,
  setValue,
  setOpen,
  isFirst,
  isLast,
}: {
  opt: Option<T>;
  value: any;
  setValue: (v: T) => void;
  setOpen: (v: boolean) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const p = useSharedValue(0);

  const menuItemStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: p.value * styleConsts.depth * 0.5 },
        { translateY: p.value * styleConsts.depth * 0.5 },
      ],
    };
  });

  const bgColor = useAnimatedStyle(() => {
    return {
      backgroundColor: shadowEquivalent(
        colors.white,
        p.value * styleConsts.darkenFace,
      ),
    };
  });

  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: styleConsts.pressDuration * 0.5,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: "transparent",
          marginTop: isFirst ? 0 : -styleConsts.depth * 0.5,
          borderBottomLeftRadius: isLast ? styleConsts.radius : 0,
          borderBottomRightRadius: isLast ? styleConsts.radius : 0,
          borderTopRightRadius: isFirst ? styleConsts.radius : 0,
          borderTopLeftRadius: isFirst ? styleConsts.radius : 0,
          boxShadow: `${2}px ${2}px 0 ${shadowEquivalent(colors.white)}`,
        },
        menuItemStyle,
      ]}
      onPressIn={() => {
        press(1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      onPressOut={() => press(0)}
      onPress={async () => {
        setValue(opt.value);
        await sleep(250);
        setOpen(false);
      }}
    >
      <Animated.View
        style={[
          styles.menuItem,
          bgColor,
          {
            borderBottomLeftRadius: isLast ? styleConsts.radius : 0,
            borderBottomRightRadius: isLast ? styleConsts.radius : 0,
            borderTopRightRadius: isFirst ? styleConsts.radius : 0,
            borderTopLeftRadius: isFirst ? styleConsts.radius : 0,
          },
        ]}
      >
        <Text style={styles.text}>{opt.label}</Text>
        {opt.value === value && (
          <Entypo style={[styles.icon, { color: colors.theme }]} name="check" />
        )}
      </Animated.View>
      {!isLast && (
        <Svg width={200} height={2} style={{ backgroundColor: "transparent" }}>
          <Rect width={200} height={2} fill="transparent" />
          <Polygon
            points={`0,0 200,0 200, ${styleConsts.depth} ${styleConsts.depth}, ${styleConsts.depth} `}
            fill={shadowEquivalent(colors.white)}
          />
        </Svg>
      )}
    </AnimatedPressable>
  );
}

export default function SolidDropDown<T extends string | number>({
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
          <View>
            <SolidButton
              isToggle={true}
              toggleValue={open}
              onPress={() => setOpen(!open)}
              height={36}
              width={110}
              child={
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
            />
          </View>
        }
      >
        <View>
          {options.map((opt, i) => (
            <MenuItem
              key={opt.value}
              opt={opt}
              value={value}
              setValue={setValue}
              setOpen={setOpen}
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
    justifyContent: "space-between",

    paddingHorizontal: 10,
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
  },
  menuItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  popover: {
    backgroundColor: "transparent",
    marginHorizontal: -10,
    paddingLeft: 2,
    paddingBottom: 2,
    paddingRight: 2,
  },
});
