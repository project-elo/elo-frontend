import { View } from "react-native";
import TabContainer from "../components/tabs/TabContainer";
import SolidContainer from "../components/solidUI/SolidContainer";
import SolidTile from "../components/solidUI/SolidTile";

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

const rows = [<View key={0}></View>, <View key={1}></View>];

export default function Rank() {
  return (
    <TabContainer>
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
