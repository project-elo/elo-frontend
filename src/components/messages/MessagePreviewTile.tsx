import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { MessagePreviewType } from "@/src/app/Matches";
import { styleConsts, shadowEquivalent, colors } from "@/src/utils/styles";
import { formatTimestamp } from "@/src/utils/utils";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function MessagePreviewTile({
  messagePreview,
}: {
  messagePreview: MessagePreviewType;
}) {
  const p = useSharedValue(0);

  const tileStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: p.value * styleConsts.depth },
        { translateY: p.value * styleConsts.depth },
      ],
      backgroundColor: shadowEquivalent(
        colors.white,
        p.value * styleConsts.darkenFace,
      ),
      boxShadow: ` ${22 * p.value}px ${2 * p.value}px 0 rgba(0,0,0,${styleConsts.shadowOpacity})`,
    };
  });

  const press = (v: number) =>
    (p.value = withTiming(v, {
      duration: styleConsts.pressDuration * 0.5,
      easing: Easing.inOut(Easing.ease),
    }));

  return (
    <AnimatedPressable
      style={[styles.container, tileStyle]}
      onPressIn={() => press(1)}
      onPressOut={() => press(0)}
    >
      <Image
        style={styles.image}
        source={{ uri: messagePreview.profilePictureUrl }}
      />
      <View style={styles.rightContent}>
        <View style={styles.topBar}>
          <Text>{messagePreview.firstName}</Text>
          <Text>{formatTimestamp(messagePreview.lastMessageTimestamp)}</Text>
        </View>
        <View>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {messagePreview.lastMessage}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  rightContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topBar: {
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
  },
  message: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: styleConsts.radius,
  },
});
