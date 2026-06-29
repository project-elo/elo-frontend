import { View, Text, StyleSheet } from "react-native";
import { colors, fontSizes, styleConsts } from "@/src/utils/styles";
import RankIcon from "@/assets/copper4.svg";

export default function RankProgress({
  rankName,
  rating,
  max = 100,
}: {
  rankName: string;
  rating: number;
  max?: number;
}) {
  const pct = Math.max(0, Math.min(1, rating / max));

  return (
    <View style={styles.container}>
      <RankIcon width={96} height={96} />
      <Text style={styles.rankName}>{rankName}</Text>

      <View style={styles.barBlock}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>ELO</Text>
          <Text style={styles.value}>
            {rating} <Text style={styles.max}>/ {max}</Text>
          </Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct * 100}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 24,
  },
  rankName: {
    fontSize: fontSizes.extraLarge,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.darkGray,
    marginTop: 8,
  },
  barBlock: {
    width: "80%",
    marginTop: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 6,
  },
  label: {
    fontSize: fontSizes.small,
    letterSpacing: 0.5,
    color: colors.gray,
    fontWeight: "600",
  },
  value: {
    fontSize: fontSizes.small,
    color: colors.darkGray,
    fontWeight: "700",
  },
  max: {
    color: colors.gray,
    fontWeight: "400",
  },
  track: {
    height: 8,
    borderRadius: styleConsts.radius,
    backgroundColor: colors.lighterGray,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: styleConsts.radius,
    backgroundColor: colors.theme,
  },
});
