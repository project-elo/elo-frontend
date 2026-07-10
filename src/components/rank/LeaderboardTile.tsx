import { View, Text, StyleSheet } from "react-native";
import { colors, fontSizes } from "@/src/utils/styles";
import SolidTile from "../solidUI/Form/SolidTile";
import RankIcon from "@/assets/copper4.svg";
import type { LeaderboardEntry } from "@/src/types/rankTypes";

export default function LeaderboardTile({
  entry,
  isFirst,
  isLast,
}: {
  entry: LeaderboardEntry;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const you = entry.isCurrentUser;

  return (
    <SolidTile isFirst={isFirst} isLast={isLast} minHeight={56}>
      <View style={styles.left}>
        <Text style={styles.position}>{entry.position}</Text>
        <RankIcon width={30} height={30} />
        <View style={styles.info}>
          <Text
            style={[styles.name, you && { color: colors.theme }]}
            numberOfLines={1}
          >
            {entry.name}
            {you ? "  ·  YOU" : ""}
          </Text>
          <Text style={styles.rank} numberOfLines={1}>
            {entry.rank}
          </Text>
        </View>
      </View>

      <Text style={styles.elo}>{entry.elo.toLocaleString()}</Text>
    </SolidTile>
  );
}

const styles = StyleSheet.create({
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  position: {
    width: 26,
    fontSize: fontSizes.text,
    fontWeight: "700",
    color: colors.gray,
    textAlign: "center",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: fontSizes.text,
    fontWeight: "600",
    color: colors.black,
  },
  rank: {
    fontSize: fontSizes.small,
    color: colors.gray,
  },
  elo: {
    fontSize: fontSizes.text,
    fontWeight: "700",
    color: colors.darkGray,
  },
});
