import { useRef } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors, fontSizes } from "@/src/utils/styles";
import { KeyboardTypeOptions } from "react-native";

import SolidTile from "./Form/SolidTile";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SolidStackButton({
  isLast = false,
  isFirst = false,
  label,
  onPress,
}: {
  isLast?: boolean;
  isFirst?: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <SolidTile
      isFirst={isFirst}
      isLast={isLast}
      label={label}
      onPress={onPress}
    >
      <View style={styles.icon}>
        <Ionicons name="chevron-forward" size={24} color={colors.gray} />
      </View>
    </SolidTile>
  );
}

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
});
