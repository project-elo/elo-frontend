import { View, StyleSheet } from "react-native";
import CubeButton from "../components/cube/CubeButton";

export default function Home() {
  return (
    <View style={styles.container}>
      <CubeButton height={100} width={100} />
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
