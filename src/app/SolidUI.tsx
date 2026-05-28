import { View, StyleSheet, Text } from "react-native";
import SolidButton from "../components/solidUI/SolidButton";
import { colors } from "../utils/styles";
import Slider from "../components/solidUI/SolidToggle";
import { useState } from "react";
import SolidInput from "../components/solidUI/SolidInput";
import SolidDropDown from "../components/solidUI/SolidDropDown";
import SolidDropDown2 from "../components/solidUI/SolidDropDown2";
import SolidDropDown3 from "../components/solidUI/SolidDropDown3";
import DropDownMenu from "../components/form/DropDownMenu";

import { listToOptions } from "../utils/listToOptions";
import SolidInputHorizontalLabel from "../components/solidUI/SolidInputHorizontalLabel";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SolidUI() {
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState(false);
  return (
    <View style={styles.container}>
      <SolidButton
        width={50}
        height={50}
        backgroundColor={colors.white}
        onPress={() => {}}
        icon={<AntDesign name="api" size={24} color="black" />}
      />
      <SolidButton
        width={50}
        height={50}
        backgroundColor={colors.white}
        icon={<AntDesign name="api" size={24} color="black" />}
        isToggle={true}
        toggleValue={value3}
        onPress={() => {
          setValue3(!value3);
        }}
      />
      <Slider onChange={setValue} value={value} />

      <SolidDropDown
        title="solid buttons"
        options={listToOptions(["1", "2", "3", "4", "%"])}
        value={value2}
        setValue={setValue2}
      />
      <SolidDropDown2
        title="block"
        options={listToOptions(["1", "2", "3", "4", "%"])}
        value={value2}
        setValue={setValue2}
      />
      <SolidDropDown3
        title="bubbles"
        options={listToOptions(["1", "2", "3", "4", "%"])}
        value={value2}
        setValue={setValue2}
      />
      <DropDownMenu
        title="normal"
        options={listToOptions(["1", "2", "3", "4", "%"])}
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
