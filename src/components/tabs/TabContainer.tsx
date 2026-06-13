import { StyleSheet, ScrollView, Text } from "react-native";
import { colors } from "@/src/utils/styles";
import React from "react";

export default function TabContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.apple,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 0,
  },
});
