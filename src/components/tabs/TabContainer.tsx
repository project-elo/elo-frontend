import { StyleSheet, ScrollView, Text, View } from "react-native";
import { colors } from "@/src/utils/styles";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export default function TabContainer({
  children,
  header,
  style,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>{header}</View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.body, style]}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 60 },
  container: {
    flex: 1,
    backgroundColor: colors.apple,

    borderLeftWidth: 1,
    borderColor: colors.lighterGray,
    marginLeft: -1,
  },
  header: { paddingHorizontal: 20 },
  body: { padding: 20, flexGrow: 1 },
});
