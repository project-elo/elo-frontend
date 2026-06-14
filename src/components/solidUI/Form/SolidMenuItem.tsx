import { StyleSheet, View } from "react-native";
import React from "react";

export default function SolidMenuItem({
  label,
  children,
}: {
  label?: string;
  children?: React.ReactNode;
}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {},
});
