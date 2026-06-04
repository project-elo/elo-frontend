import { StyleSheet, View, Text, Image, useWindowDimensions } from "react-native";
import { MessagePreviewType } from "@/src/app/Matches";
import { styleConsts } from "@/src/utils/styles";
import { formatTimestamp } from "@/src/utils/utils";
import SolidButton from "../solidUI/SolidButton";

const TILE_HEIGHT = 80;
const HORIZONTAL_MARGIN = 40;

export default function MessagePreviewTile({
  messagePreview,
  isFirst = false,
  isLast = false,
}: {
  messagePreview: MessagePreviewType;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const { width: screenWidth } = useWindowDimensions();
  const r = styleConsts.radius;

  return (
    <SolidButton
      onPress={() => {}}
      width={screenWidth - HORIZONTAL_MARGIN}
      height={TILE_HEIGHT}
      borderTopLeftRadius={isFirst ? r : 0}
      borderTopRightRadius={isFirst ? r : 0}
      borderBottomLeftRadius={isLast ? r : 0}
      borderBottomRightRadius={isLast ? r : 0}
      child={
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
      }
    />
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
});
