import {
  View,
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";

import {
  colors,
  styleConsts,
  shadowEquivalent,
  fontSizes,
} from "@/src/utils/styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Polygon, Rect } from "react-native-svg";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SolidTile = React.forwardRef<
  View,
  {
    children?: React.ReactNode;
    isFirst?: boolean;
    isLast?: boolean;
    width?: number;
    label?: string;
    onPress?: () => void;
    pressable?: boolean;
    minHeight?: number;
    contentStyle?: StyleProp<ViewStyle>;
  }
>(function SolidTile(
  {
    children,
    isFirst = false,
    isLast = false,
    width,
    label,
    onPress,
    pressable,
    minHeight = styleConsts.tileHeight,
    contentStyle,
  },
  ref,
) {
  const p = useSharedValue(0);
  if (pressable === undefined) {
    pressable = onPress !== undefined;
  }

  const [currWidth, setCurrWidth] = useState(0);

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
      ref={ref}
      onPress={onPress}
      style={[
        {
          backgroundColor: "transparent",
          marginTop: isFirst ? 0 : -styleConsts.depth * 0.5,
          borderBottomLeftRadius: isLast ? styleConsts.radius : 0,
          borderBottomRightRadius: isLast ? styleConsts.radius : 0,
          borderTopRightRadius: isFirst ? styleConsts.radius : 0,
          borderTopLeftRadius: isFirst ? styleConsts.radius : 0,
          boxShadow: `${styleConsts.depth}px ${styleConsts.depth}px 0 ${colors.shadow}`,
          width,
          flex: width === undefined ? 1 : undefined,
        },
        menuItemStyle,
      ]}
      onPressIn={() => {
        if (pressable) {
          press(1);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }}
      onPressOut={() => press(0)}
      onLayout={(e) => setCurrWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          bgColor,

          {
            borderBottomLeftRadius: isLast ? styleConsts.radius : 0,
            borderBottomRightRadius: isLast ? styleConsts.radius : 0,
            borderTopRightRadius: isFirst ? styleConsts.radius : 0,
            borderTopLeftRadius: isFirst ? styleConsts.radius : 0,
            minHeight,
          },
        ]}
      >
        <View style={[styles.container, contentStyle]}>
          {label && <Text style={styles.text}>{label}</Text>}
          {children}
        </View>
      </Animated.View>
      {!isLast && currWidth > 0 && (
        <Svg
          width={currWidth}
          height={styleConsts.depth}
          style={{ backgroundColor: "transparent" }}
        >
          <Rect
            width={currWidth}
            height={styleConsts.depth}
            fill="transparent"
          />
          <Polygon
            points={`0,0 ${currWidth},0 ${currWidth},${styleConsts.depth} ${styleConsts.depth},${styleConsts.depth}`}
            fill={colors.shadow}
          />
        </Svg>
      )}
    </AnimatedPressable>
  );
});

export default SolidTile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  text: {
    fontSize: fontSizes.text,
    width: styleConsts.labelWidth,
  },
});
