import { StyleSheet, Pressable, View, Animated, Text } from "react-native";
import { colors } from "@/src/utils/objects/styles";
import { useRef } from "react";
import Color from "color";

export default function CubeButton({
  width,
  height,
  depth = 2,
  speed = 150,
  backgroundColor = colors.white,
}: {
  width: number;
  height: number;
  depth?: number;
  speed?: number;
  backgroundColor?: string;
}) {
  const BORDER_RAD = Math.round(Math.min(width, height) * 0.15);
  const anim = useRef(new Animated.Value(0)).current;
  const shadowColor = Color(backgroundColor).darken(0.35).string();

  const pressIn = () =>
    Animated.timing(anim, {
      toValue: 1,
      duration: speed,
      useNativeDriver: true,
    }).start();

  const pressOut = () =>
    Animated.timing(anim, {
      toValue: 0,
      duration: speed,
      useNativeDriver: true,
    }).start();

  const buttonTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, depth],
  });
  const shadowTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [depth, 0],
  });

  return (
    <View style={{ width: width + depth, height: height + depth }}>
      <Animated.View
        style={[
          styles.shadow,
          {
            width,
            height,
            borderRadius: BORDER_RAD,
            backgroundColor: shadowColor,
            transform: [
              { translateX: shadowTranslate },
              { translateY: shadowTranslate },
            ],
          },
        ]}
      />
      <Animated.View
        style={{
          position: "absolute",
          transform: [
            { translateX: buttonTranslate },
            { translateY: buttonTranslate },
          ],
        }}
      >
        <Pressable
          onPressIn={pressIn}
          onPressOut={pressOut}
          style={[
            styles.button,
            { width, height, borderRadius: BORDER_RAD, backgroundColor },
          ]}
        >
          <Text></Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    position: "absolute",
  },
  button: {},
});
