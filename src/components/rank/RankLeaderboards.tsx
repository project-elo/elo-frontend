import { View, Text, StyleSheet } from "react-native";
import { colors, fontSizes } from "@/src/utils/styles";

// TODO: build out leaderboards UI next.
export default function RankLeaderboards() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Leaderboards coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
  },
  text: {
    fontSize: fontSizes.text,
    color: colors.gray,
  },
});
