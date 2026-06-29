import SolidContainer from "../solidUI/Form/SolidContainer";
import RankProgress from "./RankProgress";
import RankActionTile from "./RankActionTile";
import type { RecentAction } from "@/src/types/rankTypes";

// Hardcoded until the elo store / API lands.
const recentActions: RecentAction[] = [
  {
    opponent: "Sofia",
    opponentRank: "Gold 2",
    reason: "Matched",
    status: "gain",
    elo: 12,
  },
  {
    opponent: "Maya",
    opponentRank: "Silver 1",
    reason: "Awaiting response",
    status: "pending",
    pendingGain: 15,
    pendingLoss: 9,
  },
  {
    opponent: "Priya",
    opponentRank: "Platinum 3",
    reason: "Left on read",
    status: "loss",
    elo: -14,
  },
  {
    opponent: "Elena",
    opponentRank: "Gold 4",
    reason: "Match rejected",
    status: "loss",
    elo: -12,
  },
  {
    opponent: "Jordan",
    opponentRank: "Bronze 2",
    reason: "Matched",
    status: "gain",
    elo: 8,
  },
];

export default function RankPerformance() {
  return (
    <>
      <RankProgress rankName="COPPER 4" rating={67} />

      <SolidContainer>
        {recentActions.map((action, i) => (
          <RankActionTile
            key={i}
            action={action}
            isFirst={i === 0}
            isLast={i === recentActions.length - 1}
          />
        ))}
      </SolidContainer>
    </>
  );
}
