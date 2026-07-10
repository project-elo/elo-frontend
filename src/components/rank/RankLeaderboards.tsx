import SolidContainer from "../solidUI/Form/SolidContainer";
import LeaderboardTile from "./LeaderboardTile";
import type { LeaderboardEntry } from "@/src/types/rankTypes";

// Hardcoded until the elo store / API lands.
const leaderboard: LeaderboardEntry[] = [
  { position: 1, name: "Ava", rank: "Diamond 1", elo: 11240 },
  { position: 2, name: "Lena", rank: "Diamond 3", elo: 10870 },
  { position: 3, name: "Sofia", rank: "Platinum 1", elo: 10510 },
  { position: 4, name: "Maya", rank: "Platinum 2", elo: 10120 },
  { position: 5, name: "Priya", rank: "Platinum 4", elo: 9880 },
  { position: 6, name: "You", rank: "Copper 4", elo: 9512, isCurrentUser: true },
  { position: 7, name: "Elena", rank: "Gold 1", elo: 9300 },
  { position: 8, name: "Jordan", rank: "Gold 3", elo: 9080 },
];

export default function RankLeaderboards() {
  return (
    <SolidContainer>
      {leaderboard.map((entry, i) => (
        <LeaderboardTile
          key={entry.position}
          entry={entry}
          isFirst={i === 0}
          isLast={i === leaderboard.length - 1}
        />
      ))}
    </SolidContainer>
  );
}
