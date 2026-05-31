import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { colors, styleConsts, shadowEquivalent } from "@/src/utils/styles";

const THUMB_SIZE = 20;

export default function SolidSlider({
  value,
  onChange,
  min = 0,
  max = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const width = 300;
  const x = useSharedValue(((value - min) / (max - min)) * width);

  const gesture = Gesture.Pan().onUpdate((e) => {
    x.value = Math.min(Math.max(e.x, 0), width);
    runOnJS(onChange)(Math.round(min + (x.value / width) * (max - min)));
  });

  const fillStyle = useAnimatedStyle(() => ({ width: x.value }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value - THUMB_SIZE / 2 }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ width, height: 40, justifyContent: "center" }}>
        <View
          style={{
            height: 4,
            backgroundColor: shadowEquivalent(colors.offWhite),
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
        <Animated.View
          style={[
            thumbStyle,
            {
              position: "absolute",
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: 5,
              backgroundColor: colors.white,
              boxShadow: ` ${2}px ${2}px 0 ${shadowEquivalent(colors.white)}`,
              marginTop: -2,
            },
          ]}
        />
      </View>
    </GestureDetector>
  );
}
