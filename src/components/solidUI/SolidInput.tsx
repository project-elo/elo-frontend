import { colors, fontSizes, styleConsts } from "@/src/utils/styles";
import { BoxShadow } from "@shopify/react-native-skia";
import { StyleSheet, TextInput, KeyboardTypeOptions, View } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function SolidInput({
  defaultValue = "",
  placeholder,
  onChangeText,
  keyboardType,
}: {
  defaultValue?: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
}) {
  const p = useSharedValue(0);
  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: styleConsts.pressDuration,
      easing: Easing.inOut(Easing.ease),
    }));

  const depth = 2;
  const padding = 10;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      boxShadow: `inset ${p.value * 2}px ${p.value * 2}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
      paddingTop: padding + p.value * depth,
      paddingLeft: padding + p.value * depth,
      paddingBottom: padding + depth - p.value * depth,
      paddingRight: padding + depth - p.value * depth,
    };
  });

  return (
    <AnimatedInput
      onFocus={() => press(1)}
      onBlur={() => press(0)}
      style={[styles.input, animatedStyle]}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType ? keyboardType : "default"}
      placeholderTextColor={colors.gray}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    padding: 10,
    fontSize: fontSizes.text,
    borderRadius: 10,
  },
});
