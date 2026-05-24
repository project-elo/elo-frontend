import { StyleSheet, Pressable, LayoutAnimation } from "react-native";
import { colors, fontSizes } from "@/src/utils/objects/styles";
import { useState } from "react";
import { Shadow } from "react-native-shadow-2";

export default function CubeButton({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const BORDER_RAD = Math.min(width, height) * 0.15;
  const [pressed, setPressed] = useState(false);
  const constantStyles = {
    borderRadius: Math.round(BORDER_RAD),
  };
  const sizeStyle = pressed
    ? { width: width - 2, height: height - 2 }
    : { width, height };
  return (
    <Shadow
      distance={4}
      offset={[2, 2]}
      startColor="rgba(0,0,0,0.35)"
      style={{ borderRadius: BORDER_RAD }}
    >
      <Pressable
        onPressIn={() => {
          LayoutAnimation.easeInEaseOut();
          setPressed(true);
        }}
        onPressOut={() => {
          LayoutAnimation.easeInEaseOut();
          setPressed(false);
        }}
        style={[
          styles.button,
          constantStyles,
          sizeStyle,
          pressed && styles.buttonActive,
        ]}
      />
    </Shadow>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    padding: 4,
    paddingBottom: 6,
    paddingRight: 6,
    marginLeft: -2,
    marginTop: -2,
  },
  buttonActive: {
    margin: 0,
    padding: 4,
    paddingTop: 6,
    paddingLeft: 6,
  },
});

/* 
.button {
  border-radius: 15%;
  width: 34px;
  height: 34px;
  border: none;
  padding: 4px;
  padding-bottom: 6px;
  padding-right: 6px;
  cursor: pointer;

  box-shadow: inset -2px -2px 0 rgba(0, 0, 0, 0.35);
  transition: 0.25s ease;
  margin-left: -2px;
  margin-top: -2px;
}

.button.active {
  margin: 0px;
  width: 32px;
  height: 32px;
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.35);
  padding: 4px;
  padding-top: 6px;
  padding-left: 6px;
}

img {
  width: 100%;
  height: 100%;
}

*/
