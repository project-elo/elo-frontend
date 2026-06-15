import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import TabContainer from "../components/tabs/TabContainer";
import SolidContainer from "../components/solidUI/Form/SolidContainer";
import SolidTile from "../components/solidUI/Form/SolidTile";
import SolidToggle from "../components/solidUI/SolidToggle";
import { useRef, useState } from "react";
import SolidToggleGroup from "../components/solidUI/SolidToggleGroup";
import { listToOptions } from "../utils/utils";
import SolidSlider from "../components/solidUI/SolidSlider";
import SolidInput from "../components/solidUI/SolidInput";
import SolidDropDownMenu from "../components/solidUI/SolidDropDown";
import { Rect } from "react-native-popover-view";
import { colors, fontSizes } from "../utils/styles";

export type MessagePreviewType = {
  userId: string;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount?: number;
};

export type MessageType = {
  text: string;
  timestamp: string;
  senderId: string;
};

export default function Rank() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(66);
  const [state, setState] = useState("");
  const [stateOpen, setStateOpen] = useState(false);
  const [stateAnchor, setStateAnchor] = useState<Rect | null>(null);
  const stateTileRef = useRef<View>(null);
  const stateOptions = listToOptions(["VA", "CA", "North Dakota"]);
  const selectedState = stateOptions.find((o) => o.value === state);

  /* 
          <SolidToggleGroup
            key={1}
            options={listToOptions(["Man", "Woman", "x"])}
            value={gender}
            setValue={(v) => setGender(v as string)}
          />

  */

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

        <SolidTile
          isLast
          label="State"
          onPress={() => {
            stateTileRef.current?.measureInWindow((x, y, width, height) => {
              setStateAnchor(new Rect(x, y, width, height));
              setStateOpen((o) => !o);
            });
          }}
        >
          <View
            ref={stateTileRef}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: fontSizes.small, color: colors.theme }}>
              {selectedState?.label ?? "Select"}
            </Text>
            <Entypo
              style={{
                marginTop: 4,
                fontSize: fontSizes.text - 4,
                color: colors.theme,
              }}
              name="select-arrows"
            />
          </View>
        </SolidTile>
        <SolidDropDownMenu
          isVisible={stateOpen}
          setOpen={setStateOpen}
          from={stateAnchor}
          options={stateOptions}
          value={state}
          setValue={(v) => setState(v as string)}
        />
      </SolidContainer>
    </TabContainer>
  );
}
