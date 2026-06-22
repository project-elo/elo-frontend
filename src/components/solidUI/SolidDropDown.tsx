import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import {
  colors,
  fontSizes,
  styleConsts,
  shadowEquivalent,
} from "@/src/utils/styles";
import Popover, { Rect } from "react-native-popover-view";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Polygon, Rect as SvgRect } from "react-native-svg";
import { sleep } from "@/src/utils/utils";
import * as Haptics from "expo-haptics";
import { Option } from "@/src/types/componentTypes";
import { useRef, useState } from "react";
import SolidTile from "./Form/SolidTile";

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
        await sleep(150);
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
          <SvgRect width={200} height={2} fill="transparent" />
          <Polygon
            points={`0,0 200,0 200, ${styleConsts.depth} ${styleConsts.depth}, ${styleConsts.depth} `}
            fill={shadowEquivalent(colors.white)}
          />
        </Svg>
      )}
    </AnimatedPressable>
  );
}

export function SolidDropDown<T extends string | number>({
  options,
  value,
  setValue,
  isVisible,
  setOpen,
  from,
}: {
  options: Option<T>[];
  value: any;
  setValue: (v: T) => void;
  isVisible: boolean;
  setOpen: (v: boolean) => void;
  from: Rect | null;
}) {
  return (
    <Popover
      isVisible={isVisible}
      onRequestClose={() => setOpen(false)}
      backgroundStyle={{ backgroundColor: "transparent" }}
      popoverStyle={styles.popover}
      arrowSize={{ width: 0, height: 0 }}
      offset={14}
      from={from}
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
  );
}

export default function SolidDropDownTile<T extends string | number>({
  label,
  isFirst,
  isLast,
  options,
  value,
  setValue,
}: {
  label: string;
  isFirst?: boolean;
  isLast?: boolean;
  options: Option<T>[];
  value: T;
  setValue: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<Rect | null>(null);
  const tileRef = useRef<View>(null);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <>
      <SolidTile
        isFirst={isFirst}
        isLast={isLast}
        label={label}
        onPress={() => {
          tileRef.current?.measureInWindow((x, y, width, height) => {
            setAnchor(new Rect(x, y, width, height));
            setOpen((o) => !o);
          });
        }}
      >
        <View ref={tileRef} style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: fontSizes.small, color: colors.theme }}>
            {selectedOption?.label ?? "Select"}
          </Text>
          <Entypo
            style={{ marginTop: 4, fontSize: fontSizes.text - 4, color: colors.theme }}
            name="select-arrows"
          />
        </View>
      </SolidTile>
      <SolidDropDown
        isVisible={open}
        setOpen={setOpen}
        from={anchor}
        options={options}
        value={value}
        setValue={setValue}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.small,
  },
  icon: {
    marginTop: 1,
    fontSize: fontSizes.small,
  },
  menuItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  popover: {
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingBottom: 2,
    paddingRight: 2,
    marginLeft: -10, // TODO: dont hard code this
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
