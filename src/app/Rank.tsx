import { View } from "react-native";
import TabContainer from "../components/tabs/TabContainer";
import SolidContainer from "../components/solidUI/Form/SolidContainer";
import SolidTile from "../components/solidUI/Form/SolidTile";
import SolidMenuItem from "../components/solidUI/Form/SolidMenuItem";
import SolidToggle from "../components/solidUI/SolidToggle";
import { useState } from "react";
import SolidToggleGroup from "../components/solidUI/SolidToggleGroup";
import { listToOptions } from "../utils/utils";
import SolidSlider from "../components/solidUI/SolidSlider";

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

  const rows = [
    <SolidMenuItem key={0}>
      <SolidToggle
        value={notificationsEnabled}
        onChange={setNotificationsEnabled}
      />
    </SolidMenuItem>,
    <SolidMenuItem key={1}>
      <SolidToggleGroup
        title="Gender Identity"
        options={listToOptions(["Man", "Woman", "Non-binary"])}
        value={gender}
        setValue={(v) => setGender(v as string)}
      />
    </SolidMenuItem>,
    <SolidMenuItem key={1}>
      <SolidSlider
        value={height}
        onChange={setHeight}
        min={48}
        max={96}
        unit="feet"
      />
    </SolidMenuItem>,
  ];

  return (
    <TabContainer>
      <SolidContainer>
        {rows.map((row, i) => (
          <SolidTile key={i} isFirst={i === 0} isLast={i === rows.length - 1}>
            {row}
          </SolidTile>
        ))}
      </SolidContainer>

      <SolidContainer>
        {rows.map((row, i) => (
          <SolidTile key={i} isFirst={i === 0} isLast={i === rows.length - 1}>
            {row}
          </SolidTile>
        ))}
      </SolidContainer>
    </TabContainer>
  );
}
