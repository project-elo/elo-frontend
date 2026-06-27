import { StyleSheet, View, Text, Image } from "react-native";
import { MessagePreviewType } from "@/src/app/(tabs)/Matches";
import { formatTimestamp } from "@/src/utils/utils";
import { styleConsts } from "@/src/utils/styles";
import SolidTile from "../solidUI/Form/SolidTile";

export default function MessagePreviewTile({
  messagePreview,
  isFirst = false,
  isLast = false,
}: {
  messagePreview: MessagePreviewType;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <SolidTile
      isFirst={isFirst}
      isLast={isLast}
      minHeight={0}
      contentStyle={styles.menuItem}
      pressable
    >
      <View style={styles.inner}>
        <Image
          style={styles.image}
          source={{ uri: messagePreview.profilePictureUrl }}
        />
        <View style={styles.rightContent}>
          <View style={styles.topBar}>
            <Text>{messagePreview.firstName}</Text>
            <Text>{formatTimestamp(messagePreview.lastMessageTimestamp)}</Text>
          </View>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {messagePreview.lastMessage}
          </Text>
        </View>
      </View>
    </SolidTile>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  topBar: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: styleConsts.radius,
  },
  menuItem: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
