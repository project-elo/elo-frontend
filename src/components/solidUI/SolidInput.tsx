import { useRef } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { colors, fontSizes } from "@/src/utils/styles";
import { KeyboardTypeOptions } from "react-native";

import SolidTile from "./Form/SolidTile";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SolidInput({
  label,
  placeholder,
  isFirst,
  isLast,
  value,
  setValue,
  keyboardType,
}: {
  label: string;
  placeholder: string;
  isFirst?: boolean;
  isLast?: boolean;
  value: string;
  setValue: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
}) {
  const inputRef = useRef<TextInput>(null);

  return (
    <>
      <SolidTile
        isFirst={isFirst}
        isLast={isLast}
        label={label}
        onPress={() => inputRef.current?.focus()}
        pressable={false}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          defaultValue={value}
          placeholder={placeholder}
          onChangeText={setValue}
          keyboardType={keyboardType ? keyboardType : "default"}
          placeholderTextColor={colors.gray}
          cursorColor={colors.theme}
          selectionColor={colors.theme}
        />
      </SolidTile>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: fontSizes.text,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
});
