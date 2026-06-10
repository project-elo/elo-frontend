import { View, StyleSheet } from "react-native";
import MessagePreviewTile from "../components/messages/MessagePreviewTile";
import { colors, shadowEquivalent } from "../utils/styles";
import { ScrollView } from "react-native-gesture-handler";

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

const messages: MessagePreviewType[] = [
  {
    userId: "1",
    profilePictureUrl: "https://picsum.photos/seed/1/100/100",
    firstName: "Emma",
    lastName: "Johnson",
    lastMessage: "Hey! How's it going?",
    lastMessageTimestamp: "2026-06-04T10:30:00Z",
  },
  {
    userId: "2",
    profilePictureUrl: "https://picsum.photos/seed/2/100/100",
    firstName: "Sophia",
    lastName: "Martinez",
    lastMessage: "Are you free this weekend?",
    lastMessageTimestamp: "2026-06-04T09:15:00Z",
    unreadCount: 2,
  },
  {
    userId: "3",
    profilePictureUrl: "https://picsum.photos/seed/3/100/100",
    firstName: "Olivia",
    lastName: "Chen",
    lastMessage: "That sounds like a lot of fun!",
    lastMessageTimestamp: "2026-06-03T22:00:00Z",
  },
  {
    userId: "4",
    profilePictureUrl: "https://picsum.photos/seed/4/100/100",
    firstName: "Ava",
    lastName: "Williams",
    lastMessage:
      "lol yeah exactly aksjdnkajsnd aksjn dkajns dkja nskdjn aksjndkajsnd kajsnk djans kjdn kasj nkd askjndk kajsdn n naksjdkasjdn",
    lastMessageTimestamp: "2026-06-03T18:45:00Z",
    unreadCount: 1,
  },
];

export default function Messages() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollable}
    >
      <View style={styles.content}>
        {messages.map((m, i) => (
          <MessagePreviewTile
            key={i}
            messagePreview={m}
            isFirst={i === 0}
            isLast={i === messages.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
