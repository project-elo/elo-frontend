import { View, Pressable } from "react-native";
import React from "react";

import { colors, styleConsts, shadowEquivalent } from "@/src/utils/styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Polygon, Rect } from "react-native-svg";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SolidTile({
  children,
  isFirst = false,
  isLast = false,
}: {
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
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
          boxShadow: `${styleConsts.depth}px ${styleConsts.depth}px 0 ${shadowEquivalent(colors.white)}`,
        },
        menuItemStyle,
      ]}
      onPressIn={() => {
        press(1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      onPressOut={() => press(0)}
    >
      <Animated.View
        style={[
          bgColor,
          {
            borderBottomLeftRadius: isLast ? styleConsts.radius : 0,
            borderBottomRightRadius: isLast ? styleConsts.radius : 0,
            borderTopRightRadius: isFirst ? styleConsts.radius : 0,
            borderTopLeftRadius: isFirst ? styleConsts.radius : 0,
          },
        ]}
      >
        <View>{children}</View>
      </Animated.View>
      {!isLast && (
        <Svg
          width={2000}
          height={styleConsts.depth}
          style={{ backgroundColor: "transparent" }}
        >
          <Rect width={2000} height={styleConsts.depth} fill="transparent" />
          <Polygon
            points={`0,0 2000,0 2000, ${styleConsts.depth} ${styleConsts.depth}, ${styleConsts.depth} `}
            fill={shadowEquivalent(colors.white)}
          />
        </Svg>
      )}
    </AnimatedPressable>
  );
}
