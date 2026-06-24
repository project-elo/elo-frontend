import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { MessagePreviewType } from "@/src/app/(tabs)/Matches";
import { formatTimestamp } from "@/src/utils/utils";
import SolidButton from "../solidUI/SolidButton";

import {
  colors,
  fontSizes,
  styleConsts,
  shadowEquivalent,
} from "@/src/utils/styles";
import Popover from "react-native-popover-view";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Polygon, Rect } from "react-native-svg";
import { sleep } from "@/src/utils/utils";
import * as Haptics from "expo-haptics";
import { Option } from "@/src/types/componentTypes";

const TILE_HEIGHT = 80;
const HORIZONTAL_MARGIN = 40;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function MessagePreviewTile({
  messagePreview,
  isFirst = false,
  isLast = false,
}: {
  messagePreview: MessagePreviewType;
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
          boxShadow: `${2}px ${2}px 0 ${shadowEquivalent(colors.white)}`,
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
          styles.menuItem,
          bgColor,
          {
            borderBottomLeftRadius: isLast ? styleConsts.radius : 0,
            borderBottomRightRadius: isLast ? styleConsts.radius : 0,
            borderTopRightRadius: isFirst ? styleConsts.radius : 0,
            borderTopLeftRadius: isFirst ? styleConsts.radius : 0,
          },
        ]}
      >
        <View style={styles.inner}>
          <Image
            style={styles.image}
            source={{ uri: messagePreview.profilePictureUrl }}
          />
          <View style={styles.rightContent}>
            <View style={styles.topBar}>
              <Text>{messagePreview.firstName}</Text>
              <Text>
                {formatTimestamp(messagePreview.lastMessageTimestamp)}
              </Text>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {messagePreview.lastMessage}
            </Text>
          </View>
        </View>
      </Animated.View>
      {!isLast && (
        <Svg width={2000} height={2} style={{ backgroundColor: "transparent" }}>
          <Rect width={2000} height={2} fill="transparent" />
          <Polygon
            points={`0,0 2000,0 2000, ${styleConsts.depth} ${styleConsts.depth}, ${styleConsts.depth} `}
            fill={shadowEquivalent(colors.white)}
          />
        </Svg>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: styleConsts.radius,
  },
  menuItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
