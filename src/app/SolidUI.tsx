import { View, StyleSheet } from "react-native";
import SolidButton from "../components/solidUI/SolidButton";
import { colors } from "../utils/objects/styles";
import Slider from "../components/solidUI/SolidToggle";
import { useState } from "react";
import SolidInput from "../components/solidUI/SolidInput";
import SolidDropDown from "../components/solidUI/SolidDropDown";
import { listToOptions } from "../utils/listToOptions";

export default function SolidUI() {
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState("");
  return (
    <View style={styles.container}>
      <SolidButton
        width={50}
        height={50}
        backgroundColor={colors.green}
        onPress={() => {}}
      />
      <Slider onChange={setValue} value={value} />
      <SolidInput
        defaultValue=""
        placeholder="input"
        onChangeText={(v: string) => {}}
      />
      <SolidDropDown
        title="drop down"
        options={listToOptions(["1", "2", "3"])}
        value={value2}
        setValue={setValue2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 20,
    gap: 20,
  },
});
