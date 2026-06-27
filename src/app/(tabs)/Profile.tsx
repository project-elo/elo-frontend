import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import TabContainer from "../../components/tabs/TabContainer";
import SolidContainer from "../../components/solidUI/Form/SolidContainer";
import SolidTile from "../../components/solidUI/Form/SolidTile";
import SolidToggle from "../../components/solidUI/SolidToggle";
import { useRef, useState } from "react";
import SolidToggleGroup from "../../components/solidUI/SolidToggleGroup";
import { listToOptions } from "../../utils/utils";
import SolidSlider from "../../components/solidUI/SolidSlider";
import SolidInput from "../../components/solidUI/SolidInput";
import { Rect } from "react-native-popover-view";
import { colors, fontSizes } from "../../utils/styles";
import SolidDropDownTile from "../../components/solidUI/SolidDropDown";
import SolidStackButton from "../../components/solidUI/SolidStackButton";
import { router } from "expo-router";
import type { Option } from "@/src/types/componentTypes";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [height, setHeight] = useState(50);

  const options: Option[] = [
    {
      label: "Female",
      value: "Female",
      icon: (
        <MaterialCommunityIcons
          name="gender-female"
          size={fontSizes.text}
          color={colors.pink}
        />
      ),
    },
    {
      label: "Male",
      value: "Male",
      icon: (
        <MaterialCommunityIcons
          name="gender-male"
          size={fontSizes.text}
          color={colors.blue}
        />
      ),
    },
    {
      label: "Other",
      value: "Other",
      icon: (
        <MaterialCommunityIcons
          name="gender-non-binary"
          size={fontSizes.text}
          color={colors.gray}
        />
      ),
    },
  ];

  return (
    <TabContainer>
      <SolidContainer>
        <SolidTile isFirst label="Automatic">
          <SolidToggle
            key={0}
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
        </SolidTile>
        <SolidInput
          label="Name"
          value={name}
          setValue={setName}
          placeholder="Required"
        />
        <SolidStackButton
          label="Next Screen"
          onPress={() => router.push("/Dm")}
        />
        <SolidDropDownTile
          label="State"
          options={options}
          value={state}
          setValue={setState}
        />
        <SolidSlider
          value={height}
          onChange={setHeight}
          min={50}
          max={200}
          unit="feet"
        />
        <SolidTile isLast label="Automatic">
          <SolidToggle
            key={0}
            value={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
        </SolidTile>
      </SolidContainer>
    </TabContainer>
  );
}
