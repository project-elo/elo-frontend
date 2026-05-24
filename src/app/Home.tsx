import { View, StyleSheet } from "react-native";
import CubeButton from "../components/cube/CubeButton";
import { colors } from "../utils/objects/styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <CubeButton
        height={200}
        width={200}
        backgroundColor={colors.white}
        depth={10}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
});
