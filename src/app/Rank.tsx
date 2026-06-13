import { View, StyleSheet } from "react-native";
import MessagePreviewTile from "../components/messages/MessagePreviewTile";
import { colors, shadowEquivalent } from "../utils/styles";
import { ScrollView } from "react-native-gesture-handler";
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
    <SolidContainer>
      {rows.map((row, i) => (
        <SolidTile key={i} isFirst={i === 0} isLast={i === rows.length - 1}>
          {row}
        </SolidTile>
      ))}
    </SolidContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.apple,
  },
  scrollable: {
    margin: 20,
    marginTop: 60,
    flex: 1,
  },
  content: {
    overflow: "hidden",
    paddingBottom: 2,
    paddingRight: 2,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
});
