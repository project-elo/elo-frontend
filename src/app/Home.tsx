import { View, StyleSheet } from "react-native";
import CubeButton from "../components/cube/CubeButton";
import { colors } from "../utils/objects/styles";
import Example from "./Example";
import Slider from "../components/cube/Slider";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.container}>
      <CubeButton
        width={50}
        height={50}
        backgroundColor={colors.green}
        onPress={() => {}}
      />
      <Slider onChange={setValue} value={value} />
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
