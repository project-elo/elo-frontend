import { View } from "react-native";
import TabContainer from "../components/tabs/TabContainer";
import SolidContainer from "../components/solidUI/Form/SolidContainer";
import SolidTile from "../components/solidUI/Form/SolidTile";
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
    <SolidToggle
      key={0}
      value={notificationsEnabled}
      onChange={setNotificationsEnabled}
    />,
    <SolidToggleGroup
      key={1}
      options={listToOptions(["Man", "Woman", "Non-binary"])}
      value={gender}
      setValue={(v) => setGender(v as string)}
    />,
    <SolidSlider
      key={2}
      value={height}
      onChange={setHeight}
      min={48}
      max={96}
      unit="feet"
    />,
  ];

  return (
    <TabContainer>
      <SolidContainer>
        {rows.map((row, i) => (
          <SolidTile
            key={i}
            isFirst={i === 0}
            isLast={i === rows.length - 1}
            childrenAfter={i === 10}
          >
            {row}
          </SolidTile>
        ))}
      </SolidContainer>
    </TabContainer>
  );
}
