import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { colors, styleConsts, shadowEquivalent } from "@/src/utils/styles";

const THUMB_SIZE = 18;

export default function SolidSlider({
  value,
  onChange,
  value2,
  onChange2,
  min,
  max,
  minGap = 3,
}: {
  value: number;
  onChange: (v: number) => void;
  value2?: number;
  onChange2?: (v: number) => void;
  min: number;
  max: number;
  minGap?: number;
}) {
  const isRange = value2 !== undefined && onChange2 !== undefined;
  const width = 300;

  const toX = (v: number) => ((v - min) / (max - min)) * width;
  const gapX = toX(min + (minGap ?? 0));

  const x = useSharedValue(toX(value));
  const x2 = useSharedValue(toX(value2 ?? max));
  const startX = useSharedValue(0);
  const startX2 = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
    })
    .onUpdate((e) => {
      x.value = Math.min(
        Math.max(startX.value + e.translationX, 0),
        isRange ? x2.value - gapX : width,
      );
      runOnJS(onChange)(Math.round(min + (x.value / width) * (max - min)));
    });

  const gesture2 = Gesture.Pan()
    .onBegin(() => {
      startX2.value = x2.value;
    })
    .onUpdate((e) => {
      x2.value = Math.min(
        Math.max(startX2.value + e.translationX, x.value + gapX),
        width,
      );
      if (onChange2)
        runOnJS(onChange2)(Math.round(min + (x2.value / width) * (max - min)));
    });

  const fillStyle = useAnimatedStyle(() => ({
    left: isRange ? x.value : 0,
    width: isRange ? x2.value - x.value : x.value,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value - THUMB_SIZE / 2 }],
  }));

  const thumb2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: x2.value - THUMB_SIZE / 2 }],
  }));

  const thumb = (
    <Animated.View
      style={[
        thumbStyle,
        {
          position: "absolute",
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: 5,
          backgroundColor: colors.white,
          boxShadow: ` ${2}px ${2}px 0 ${shadowEquivalent(colors.white, styleConsts.shadowOpacity)}`,
        },
      ]}
    />
  );

  const thumb2 = (
    <Animated.View
      style={[
        thumb2Style,
        {
          position: "absolute",
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: 5,
          backgroundColor: colors.white,
          boxShadow: ` ${2}px ${2}px 0 ${shadowEquivalent(colors.white, styleConsts.shadowOpacity)}`,
          top: (40 - THUMB_SIZE) / 2,
        },
      ]}
    />
  );

  return (
    <View style={{ width, height: 40, justifyContent: "center" }}>
      <View
        style={{
          height: 4,
          backgroundColor: shadowEquivalent(
            colors.offWhite,
            styleConsts.shadowOpacity,
          ),
          borderRadius: 2,
        }}
      />
      <Animated.View
        style={[
          fillStyle,
          {
            position: "absolute",
            height: 4,
            backgroundColor: colors.theme,
            borderRadius: 2,
          },
        ]}
      />
      <GestureDetector gesture={gesture}>{thumb}</GestureDetector>
      {isRange && (
        <GestureDetector gesture={gesture2}>{thumb2}</GestureDetector>
      )}
    </View>
  );
}
