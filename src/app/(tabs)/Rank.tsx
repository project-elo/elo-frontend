import { View, StyleSheet } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import TabContainer from "../../components/tabs/TabContainer";
import SliderToggle from "@/src/components/solidUI/SliderToggle";
import SolidButton from "@/src/components/solidUI/SolidButton";
import RankPerformance from "@/src/components/rank/RankPerformance";
import RankLeaderboards from "@/src/components/rank/RankLeaderboards";
import { listToOptions } from "../../utils/utils";

export default function Rank() {
  const pages = listToOptions(["Performance", "Leaderboards"]);
  const [page, setPage] = useState("Performance");

  return (
    <TabContainer>
      <View style={styles.header}>
        <SliderToggle
          options={pages}
          value={page}
          setValue={(v) => setPage(v as string)}
          fullWidth
        />
      </View>

      {page === "Performance" ? <RankPerformance /> : <RankLeaderboards />}
    </TabContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
});
