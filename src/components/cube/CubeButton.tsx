import { Pressable, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function Button({ source, onPress }) {
  const p = useSharedValue(0); // 0 = idle, 1 = active

  const style = useAnimatedStyle(() => {
    const shadow = -2 + p.value * 4; // -2 to 2
    return {
      width: 34 - p.value * 2,
      height: 34 - p.value * 2,
      marginTop: -2 + p.value * 2,
      marginLeft: -2 + p.value * 2,
      marginRight: 0,
      marginBottom: 0,
      paddingTop: 4 + p.value * 2,
      paddingLeft: 4 + p.value * 2,
      paddingBottom: 6 - p.value * 2,
      paddingRight: 6 - p.value * 2,
      boxShadow: `inset ${shadow}px ${shadow}px 0 rgba(0,0,0,0.35)`,
    };
  });

  const press = (v) =>
    (p.value = withTiming(v, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <Pressable
      onPressIn={() => press(1)}
      onPressOut={() => press(0)}
      onPress={onPress}
    >
      <Animated.View style={[{ borderRadius: 5, overflow: "hidden" }, style]}>
        <Image source={source} style={{ width: "100%", height: "100%" }} />
      </Animated.View>
    </Pressable>
  );
}
