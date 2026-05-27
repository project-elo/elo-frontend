import { colors, fontSizes } from "@/src/utils/objects/styles";
import {
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  View,
  Text,
} from "react-native";

export default function SolidInputHorizontalLabel({
  defaultValue,
  placeholder,
  onChangeText,
  keyboardType = "default",
  label,
  backgroundColor = colors.offWhite,
}: {
  defaultValue: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  backgroundColor?: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { backgroundColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor }, { color: colors.theme }]}
        defaultValue={defaultValue}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    fontSize: fontSizes.text,
    flex: 1,
    textAlign: "right",
  },
  label: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    fontSize: fontSizes.text,
    paddingRight: 15,
    color: colors.black,
  },
});
