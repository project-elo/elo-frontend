import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../utils/styles";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SolidButton from "../components/solidUI/SolidButton";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.blue,
          tabBarStyle: {
            paddingTop: 5,
            height: 100,
          },
        }}
      >
        <Tabs.Screen
          name="People"
          options={{
            title: "People",
            tabBarButton: ({ onPress, accessibilityState }) => (
              <SolidButton
                isToggle
                toggleValue={false}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <MaterialCommunityIcons
                    name="cards"
                    size={24}
                    color={
                      accessibilityState?.selected ? colors.blue : colors.gray
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Likes"
          options={{
            title: "Likes",
            tabBarButton: ({ onPress, accessibilityState }) => (
              <SolidButton
                isToggle
                toggleValue={accessibilityState?.selected}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <FontAwesome6
                    name="heart"
                    size={24}
                    color={
                      accessibilityState?.selected ? colors.blue : colors.gray
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Messages"
          options={{
            title: "Messages",
            tabBarButton: ({ onPress, accessibilityState }) => (
              <SolidButton
                isToggle
                toggleValue={accessibilityState?.selected}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <MaterialCommunityIcons
                    name="message-outline"
                    size={24}
                    color={
                      accessibilityState?.selected ? colors.blue : colors.gray
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Rank"
          options={{
            title: "Rank",
            tabBarButton: ({ onPress, accessibilityState }) => (
              <SolidButton
                isToggle
                toggleValue={accessibilityState?.selected}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <MaterialCommunityIcons
                    name="trophy-outline"
                    size={24}
                    color={
                      accessibilityState?.selected ? colors.blue : colors.gray
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarButton: ({ onPress, accessibilityState }) => (
              <SolidButton
                isToggle
                toggleValue={accessibilityState?.selected}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <FontAwesome6
                    name="circle-user"
                    size={24}
                    color={
                      accessibilityState?.selected ? colors.blue : colors.gray
                    }
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen name="index" options={{ href: null }} />
      </Tabs>
    </GestureHandlerRootView>
  );
}
