import { View } from "react-native";
import TabContainer from "../components/tabs/TabContainer";
import SolidContainer from "../components/solidUI/Form/SolidContainer";
import SolidTile from "../components/solidUI/Form/SolidTile";
import SolidToggle from "../components/solidUI/SolidToggle";
import { useState } from "react";
import SolidToggleGroup from "../components/solidUI/SolidToggleGroup";
import { listToOptions } from "../utils/utils";
import SolidSlider from "../components/solidUI/SolidSlider";
import SolidInput from "../components/solidUI/SolidInput";
import SolidDropDown from "../components/solidUI/SolidDropDown";

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

        <SolidTile isLast label="State">
          <SolidDropDown
            title="Looking For"
            options={listToOptions(["VA", "CA", "North Dakota"])}
            value={state}
            setValue={(v) => setState(v)}
          />
        </SolidTile>
      </SolidContainer>
    </TabContainer>
  );
}
