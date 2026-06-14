import { colors, fontSizes, styleConsts } from "@/src/utils/styles";
import { StyleSheet, View, Text } from "react-native";

export default function SolidContainer({
  title,
  children,
}: {
  title?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.outer}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.container}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  outer: {
    marginBottom: 20,
  },
  title: {
    color: colors.gray,
    marginLeft: 15,
    fontSize: fontSizes.small,
  },
  container: {
    borderRadius: styleConsts.radius,
    marginTop: 10,
    overflow: "hidden",
    paddingRight: styleConsts.depth,
    paddingBottom: styleConsts.depth,
  },
});
