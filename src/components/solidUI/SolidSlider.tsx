import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { colors, styleConsts, shadowEquivalent } from "@/src/utils/styles";

const THUMB_SIZE = 18;
const PRESS_DEPTH = 1;
const TRACK_HEIGHT = 40;

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
  const gapX = toX(min + minGap);

  const x = useSharedValue(toX(value));
  const x2 = useSharedValue(toX(value2 ?? max));
  const startX = useSharedValue(0);
  const startX2 = useSharedValue(0);
  const p = useSharedValue(0);
  const p2 = useSharedValue(0);

  const press = (target: typeof p, v: number) => {
    "worklet";
    target.value = withTiming(v, {
      duration: styleConsts.pressDuration,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      press(p, 1);
    })
    .onUpdate((e) => {
      x.value = Math.min(
        Math.max(startX.value + e.translationX, 0),
        isRange ? x2.value - gapX : width,
      );
      runOnJS(onChange)(Math.round(min + (x.value / width) * (max - min)));
    })
    .onFinalize(() => {
      press(p, 0);
    });

  const gesture2 = Gesture.Pan()
    .onBegin(() => {
      startX2.value = x2.value;
      press(p2, 1);
    })
    .onUpdate((e) => {
      x2.value = Math.min(
        Math.max(startX2.value + e.translationX, x.value + gapX),
        width,
      );
      if (onChange2)
        runOnJS(onChange2)(Math.round(min + (x2.value / width) * (max - min)));
    })
    .onFinalize(() => {
      press(p2, 0);
    });

  const fillStyle = useAnimatedStyle(() => ({
    left: isRange ? x.value : 0,
    width: isRange ? x2.value - x.value : x.value,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          x.value - THUMB_SIZE / 2 - PRESS_DEPTH + p.value * PRESS_DEPTH,
      },
      { translateY: -PRESS_DEPTH + p.value * PRESS_DEPTH },
    ],
    backgroundColor: shadowEquivalent(
      colors.white,
      p.value * styleConsts.darkenFace,
    ),
  }));

  const thumb2Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          x2.value - THUMB_SIZE / 2 - PRESS_DEPTH + p2.value * PRESS_DEPTH,
      },
      { translateY: -PRESS_DEPTH + p2.value * PRESS_DEPTH },
    ],
    backgroundColor: shadowEquivalent(
      colors.white,
      p2.value * styleConsts.darkenFace,
    ),
  }));

  const thumbBase = {
    position: "absolute" as const,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 5,
    top: (TRACK_HEIGHT - THUMB_SIZE) / 2,
    boxShadow: `${styleConsts.depth}px ${styleConsts.depth}px 0 ${shadowEquivalent(colors.white, styleConsts.shadowOpacity)}`,
  };

  return (
    <View style={{ width, height: TRACK_HEIGHT, justifyContent: "center" }}>
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
      <GestureDetector gesture={gesture}>
        <Animated.View style={[thumbBase, thumbStyle]} />
      </GestureDetector>
      {isRange && (
        <GestureDetector gesture={gesture2}>
          <Animated.View style={[thumbBase, thumb2Style]} />
        </GestureDetector>
      )}
    </View>
  );
}
