import { colors, fontSizes } from "@/src/utils/objects/styles";
import { BoxShadow } from "@shopify/react-native-skia";
import { StyleSheet, TextInput, KeyboardTypeOptions, View } from "react-native";

export default function SolidInput({
  defaultValue,
  placeholder,
  onChangeText,
  keyboardType,
}: {
  defaultValue: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType ? keyboardType : "default"}
        placeholderTextColor={colors.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    boxShadow: `inset ${2}px ${2}px 0 rgba(0,0,0,0.35)`,
    padding: 3,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  input: {
    padding: 10,
    fontSize: fontSizes.text,
    borderRadius: 10,
  },
});
