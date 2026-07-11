import { useEffect } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";
import { colors, styleConsts, fontSizes } from "@/src/utils/styles";
import * as Haptics from "expo-haptics";
import { Option } from "@/src/types/componentTypes";

export default function SliderToggle<T extends string | number>({
  options,
  value,
  setValue,
  optionWidth = 80,
  height = styleConsts.tileHeight,
  fullWidth = false,
}: {
  options: Option<T>[];
  value: T;
  setValue: (v: T) => void;
  optionWidth?: number;
  height?: number;
  fullWidth?: boolean;
}) {
  const speed = 150;
  const depth = styleConsts.depth;

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const t = useSharedValue(selectedIndex);
  const rowWidth = useSharedValue(fullWidth ? 0 : optionWidth * options.length);

  useEffect(() => {
    t.value = withSpring(selectedIndex, {
      damping: 20,
      stiffness: speed,
      mass: 0.5,
    });
  }, [selectedIndex, t]);

  const thumbStyle = useAnimatedStyle(() => {
    const slot = rowWidth.value / options.length;
    return {
      width: slot,
      transform: [{ translateX: t.value * slot }],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        height,
        borderRadius: styleConsts.radius,
        backgroundColor: colors.appleDark,
        //boxShadow: `inset ${depth}px ${depth}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          {
            top: -2,
            left: -2,
            position: "absolute",
            height,
            borderRadius: styleConsts.radius,
            backgroundColor: colors.white,
            zIndex: 1,
            boxShadow: `${depth}px ${depth}px 0 ${colors.shadow}`,
          },
          thumbStyle,
        ]}
      />

      <View
        style={styles.row}
        onLayout={(e) => (rowWidth.value = e.nativeEvent.layout.width)}
      >
        {options.map((opt, i) => (
          <ToggleOption
            key={i}
            index={i}
            t={t}
            label={opt.label}
            onPress={() => {
              setValue(opt.value);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          />
        ))}
      </View>
    </View>
  );
}

function ToggleOption({
  index,
  t,
  label,
  onPress,
}: {
  index: number;
  t: SharedValue<number>;
  label: string;
  onPress: () => void;
}) {
  const liftStyle = useAnimatedStyle(() => {
    const k = 1 - Math.min(Math.abs(t.value - index), 1);
    return {
      transform: [
        { translateX: -styleConsts.depth * k },
        { translateY: -styleConsts.depth * k },
      ],
    };
  });

  return (
    <Pressable style={styles.option} onPress={onPress}>
      <Animated.Text
        style={[styles.text, liftStyle]}
        adjustsFontSizeToFit
        numberOfLines={1}
        minimumFontScale={0.6}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    zIndex: 2,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: fontSizes.text,
    textAlign: "center",
  },
});
