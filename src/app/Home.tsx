import { View, StyleSheet } from "react-native";
import CubeButton from "../components/cube/CubeButton";
import { colors } from "../utils/objects/styles";
import Example from "./Example";

export default function Home() {
  return (
    <View style={styles.container}>
      <CubeButton width={100} height={100} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 300,
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
});
