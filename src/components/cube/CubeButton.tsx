import { ShadowPressable } from "react-native-inner-shadow";
import { colors } from "@/src/utils/objects/styles";
import { StyleSheet, Text } from "react-native";
import Color from "color";

export default function CubeButton({
  width,
  height,
  blur = 0,
  backgroundColor = colors.blue,
  borderRadius = 15,
}: {
  width: number;
  height: number;
  blur?: number;
  backgroundColor?: string;
  borderRadius?: number;
}) {
  const shadowColor = Color(backgroundColor).darken(0.35).string();
  return (
    <ShadowPressable
      style={[styles.button, { width, height, backgroundColor, borderRadius }]}
      onPress={() => {}}
      shadowBlur={blur}
      shadowColor={shadowColor}
    >
      <Text>{"New"}</Text>
    </ShadowPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
