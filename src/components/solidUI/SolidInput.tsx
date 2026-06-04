import { colors, fontSizes, styleConsts } from "@/src/utils/styles";
import { BoxShadow } from "@shopify/react-native-skia";
import { StyleSheet, TextInput, KeyboardTypeOptions, View } from "react-native";

export default function SolidInput({
  defaultValue = "",
  placeholder,
  onChangeText,
  keyboardType,
}: {
  defaultValue?: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <TextInput
      style={styles.input}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType ? keyboardType : "default"}
      placeholderTextColor={colors.gray}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    padding: 10,
    fontSize: fontSizes.text,
    borderRadius: 10,
  },
});
