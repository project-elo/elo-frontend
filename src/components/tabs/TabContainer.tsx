import { StyleSheet, ScrollView, Text } from "react-native";
import { colors } from "@/src/utils/styles";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export default function TabContainer({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, style]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.apple,
    borderLeftWidth: 1,
    borderColor: colors.lighterGray,
    marginLeft: -1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 0,
  },
});
