import { View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useState, useEffect } from "react";
import { colors, styleConsts, shadowEquivalent } from "@/src/utils/styles";
import { formatSliderLabel } from "@/src/utils/utils";

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
  unit = "",
}: {
  value: number;
  onChange: (v: number) => void;
  value2?: number;
  onChange2?: (v: number) => void;
  min: number;
  max: number;
  minGap?: number;
  unit?: string;
}) {
  const isRange = value2 !== undefined && onChange2 !== undefined;
  const width = 300;

  const toX = (v: number) => ((v - min) / (max - min)) * width;
  const gapX = toX(min + minGap);

  const x = useSharedValue(toX(value));
  const x2 = useSharedValue(toX(value2 ?? max));
  const startX = useSharedValue(0);
  const startX2 = useSharedValue(0);
  const active = useSharedValue<0 | 1>(0);
  const p = useSharedValue(0);
  const p2 = useSharedValue(0);

  const [label, setLabel] = useState(
    formatSliderLabel(value, unit, max, value2),
  );

  useAnimatedReaction(
    () => ({
      v: Math.round(min + (x.value / width) * (max - min)),
      v2: Math.round(min + (x2.value / width) * (max - min)),
    }),
    ({ v, v2 }) => {
      runOnJS(setLabel)(
        formatSliderLabel(v, unit, max, isRange ? v2 : undefined),
      );
    },
  );

  const press = (target: typeof p, v: number) => {
    "worklet";
    target.value = withTiming(v, {
      duration: styleConsts.pressDuration,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const gesture = Gesture.Pan()
    .hitSlop({ horizontal: 10, vertical: 10 })
    .onBegin((e) => {
      if (isRange && Math.abs(e.x - x2.value) < Math.abs(e.x - x.value)) {
        active.value = 1;
        startX2.value = x2.value;
        press(p2, 1);
      } else {
        active.value = 0;
        startX.value = x.value;
        press(p, 1);
      }
    })
    .onUpdate((e) => {
      if (active.value === 1) {
        x2.value = Math.min(
          Math.max(startX2.value + e.translationX, x.value + gapX),
          width,
        );
      } else {
        x.value = Math.min(
          Math.max(startX.value + e.translationX, 0),
          isRange ? x2.value - gapX : width,
        );
      }
    })
    .onFinalize(() => {
      press(p, 0);
      press(p2, 0);
      runOnJS(onChange)(Math.round(min + (x.value / width) * (max - min)));
      if (onChange2)
        runOnJS(onChange2)(Math.round(min + (x2.value / width) * (max - min)));
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

  useEffect(() => {
    x.value = toX(value);
    x2.value = toX(value2 ?? max);
  }, [width]);

  return (
    <View>
      <Text>{label}</Text>
      <GestureDetector gesture={gesture}>
        <View
          style={{
            width,
            height: TRACK_HEIGHT,
            justifyContent: "center",
            marginLeft: THUMB_SIZE / 2,
            marginRight: THUMB_SIZE / 2,
          }}
        >
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
          <Animated.View style={[thumbBase, thumbStyle]} />
          {isRange && <Animated.View style={[thumbBase, thumb2Style]} />}
        </View>
      </GestureDetector>
    </View>
  );
}
