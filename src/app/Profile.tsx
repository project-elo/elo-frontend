import { StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { colors, fontSizes } from "../utils/styles";
import { listToOptions } from "../utils/utils";
import TabContainer from "../components/tabs/TabContainer";
import FormContainer from "../components/form/FormContainer";
import SolidInput from "../components/solidUI/SolidInput";
import SolidToggle from "../components/solidUI/SolidToggle";
import SolidToggleGroup from "../components/solidUI/SolidToggleGroup";
import SolidSlider from "../components/solidUI/SolidSlider";
import SolidButton from "../components/solidUI/SolidButton";
import SolidTile from "../components/solidUI/Form/SolidTile";
import SolidDropDownMenu from "../components/solidUI/SolidDropDown";
import { Rect } from "react-native-popover-view";

export default function Profile() {
  return (
    <TabContainer>
      <></>
    </TabContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.gray,
    marginBottom: 8,
    marginTop: 16,
  },
});
