import { View, StyleSheet, Text } from "react-native";
import SolidButton from "../components/solidUI/SolidButton";
import { colors } from "../utils/styles";
import Slider from "../components/solidUI/SolidToggle";
import { useState } from "react";
import SolidInput from "../components/solidUI/SolidInput";
import SolidDropDown from "../components/solidUI/SolidDropDown";
import SolidSlideUpModal from "../components/solidUI/SolidSlideUpModal";
import SolidSlider from "../components/solidUI/SolidSlider";

import { listToOptions } from "../utils/utils";
import AntDesign from "@expo/vector-icons/AntDesign";
import SolidToggleGroup from "../components/solidUI/SolidToggleGroup";

export default function SolidUI() {
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState(false);
  const [open, setOpen] = useState(false);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(50);
  const [minDist, setMinDist] = useState(50);

  return (
    <View style={styles.container}>
      <SolidButton
        backgroundColor={colors.white}
        onPress={() => {
          setOpen(true);
        }}
        child={<AntDesign name="arrow-up" size={24} color="black" />}
      />
      <SolidButton
        backgroundColor={colors.white}
        child={<AntDesign name="api" size={24} color="black" />}
        isToggle={true}
        toggleValue={value3}
        onPress={() => {
          setValue3(!value3);
        }}
      />
      <Slider onChange={setValue} value={value} />

      <SolidDropDown
        title="solid buttons"
        options={listToOptions(["1", "2", "3", "4", "5"])}
        value={value2}
        setValue={setValue2}
      />
      <SolidToggleGroup
        title="radio"
        options={listToOptions(["5'11 ", "6 ft"])}
        value={value2}
        setValue={setValue2}
      />
      <SolidToggleGroup
        title="multi"
        options={listToOptions(["1", "2", "3"])}
        value={value2}
        setValue={setValue2}
      />
      <SolidInput placeholder="text" onChangeText={setValue2} />

      <SolidSlideUpModal
        title={"example"}
        form={<View />}
        modalOpen={open}
        submitForm={() => {}}
        clearForm={() => {
          setOpen(false);
        }}
        canSubmit={true}
      />
      <SolidSlider
        value={minAge}
        onChange={setMinAge}
        min={18}
        max={70}
        value2={maxAge}
        onChange2={setMaxAge}
        unit={"Years Old"}
      />
      <SolidSlider
        value={minDist}
        onChange={setMinDist}
        min={10}
        max={100}
        unit={"Miles Away"}
      />
      <SolidSlider
        value={minDist}
        onChange={setMinDist}
        min={10}
        max={100}
        unit={"feet"}
      />
      <SolidSlider
        value={minAge}
        onChange={setMinAge}
        min={18}
        max={70}
        value2={maxAge}
        onChange2={setMaxAge}
        unit={"feet"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offWhite,
    paddingTop: 100,
    flex: 1,
    padding: 20,
    gap: 5,
  },
});
