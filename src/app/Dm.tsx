import { View, Text } from "react-native";
import { router } from "expo-router";
import SolidButton from "../components/solidUI/SolidButton";
import TabContainer from "../components/tabs/TabContainer";

export default function Dm() {
  return (
    <TabContainer>
      <Text>DM Screen</Text>
      <SolidButton
        width={100}
        child={<Text>Close</Text>}
        onPress={() => router.back()}
      />
    </TabContainer>
  );
}
