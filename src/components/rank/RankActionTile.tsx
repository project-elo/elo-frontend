import { View, Text, StyleSheet } from "react-native";
import { colors, fontSizes } from "@/src/utils/styles";
import SolidTile from "../solidUI/Form/SolidTile";
import RankIcon from "@/assets/copper4.svg";
import type { RecentAction } from "@/src/types/rankTypes";

function signed(n: number) {
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n)}`;
}

function EloDelta({ action }: { action: RecentAction }) {
  if (action.status === "pending") {
    return (
      <View style={styles.eloCol}>
        <View style={styles.pendingRow}>
          <Text style={[styles.elo, { color: colors.green }]}>
            +{action.pendingGain}
          </Text>
          <Text style={[styles.elo, styles.slash]}>/</Text>
          <Text style={[styles.elo, { color: colors.red }]}>
            {"−"}
            {action.pendingLoss}
          </Text>
        </View>
        <Text style={styles.pendingLabel}>PENDING</Text>
      </View>
    );
  }

  const color = action.status === "gain" ? colors.green : colors.red;
  return (
    <View style={styles.eloCol}>
      <Text style={[styles.elo, { color }]}>{signed(action.elo ?? 0)}</Text>
    </View>
  );
}

export default function RankActionTile({
  action,
  isFirst,
  isLast,
}: {
  action: RecentAction;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <SolidTile isFirst={isFirst} isLast={isLast} minHeight={64}>
      <View style={styles.left}>
        <RankIcon width={34} height={34} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {action.opponent}
          </Text>
          <Text style={styles.reason} numberOfLines={1}>
            {action.reason}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <EloDelta action={action} />
        <Text style={styles.opponentRank} numberOfLines={1}>
          {action.opponentRank}
        </Text>
      </View>
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
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: fontSizes.text,
    fontWeight: "600",
    color: colors.black,
  },
  reason: {
    fontSize: fontSizes.small,
    color: colors.gray,
  },
  right: {
    alignItems: "flex-end",
    gap: 2,
  },
  eloCol: {
    alignItems: "flex-end",
  },
  pendingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  slash: {
    color: colors.lightGray,
    fontWeight: "400",
  },
  elo: {
    fontSize: fontSizes.text,
    fontWeight: "700",
  },
  pendingLabel: {
    fontSize: 9,
    letterSpacing: 0.5,
    color: colors.lightGray,
    fontWeight: "700",
  },
  opponentRank: {
    fontSize: fontSizes.small,
    color: colors.gray,
  },
});
