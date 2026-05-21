import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSettingsUIStore } from "../state/settings/useSettingsUIStore";
import { useSettingsStore } from "../state/settings/useSettingsStore";

export default function Settings() {
  const {} = useSettingsUIStore();
  const {} = useSettingsStore();
  const { settings } = useSettingsStore();

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
});
