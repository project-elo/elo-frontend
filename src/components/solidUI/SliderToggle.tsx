import { useEffect } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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
        width: fullWidth ? "100%" : optionWidth * options.length,
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
            boxShadow: `${depth}px ${depth}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
          },
          thumbStyle,
        ]}
      />

      <View
        style={styles.row}
        onLayout={(e) => (rowWidth.value = e.nativeEvent.layout.width)}
      >
        {options.map((opt, i) => (
          <Pressable
            key={i}
            onPress={() => {
              setValue(opt.value);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            style={styles.option}
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
        ))}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: fontSizes.text,
    textAlign: "center",
  },
});
