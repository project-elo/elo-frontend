import { colors, fontSizes } from "@/src/utils/styles";
import { StyleSheet, View, Text } from "react-native";

export default function FormContainer({
  title,
  children,
  backgroundColor = colors.offWhite,
}: {
  title?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.outer, { backgroundColor }]}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: colors.gray,
    marginLeft: 15,
    fontSize: fontSizes.small,
  },
  outer: {
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    borderColor: colors.lighterGray,
    borderWidth: 1,
  },
});
