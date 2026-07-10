// "gain" / "loss" are settled outcomes; "pending" means the other person
// hasn't accepted/rejected yet, so we show the *potential* swing instead.
export type ActionStatus = "gain" | "loss" | "pending";

export type RecentAction = {
  opponent: string;
  opponentRank: string;
  reason: string;
  status: ActionStatus;
  // settled outcome (gain/loss)
  elo?: number;
  // pending outcome — different magnitudes by design of the elo math
  pendingGain?: number;
  pendingLoss?: number;
};

export type LeaderboardEntry = {
  position: number;
  name: string;
  rank: string;
  elo: number;
  isCurrentUser?: boolean;
};
