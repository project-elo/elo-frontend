import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../utils/styles";
import { Tabs, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SolidButton from "../components/solidUI/SolidButton";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
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
            tabBarButton: ({ onPress }) => (
              <SolidButton
                isToggle
                toggleValue={pathname === "/People"}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <MaterialCommunityIcons
                    name="cards"
                    size={24}
                    color={pathname === "/People" ? colors.theme : colors.gray}
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
            tabBarButton: ({ onPress }) => (
              <SolidButton
                isToggle
                toggleValue={pathname === "/Likes"}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <FontAwesome6
                    name="heart"
                    size={24}
                    color={pathname === "/Likes" ? colors.theme : colors.gray}
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
            tabBarButton: ({ onPress }) => (
              <SolidButton
                isToggle
                toggleValue={pathname === "/Messages"}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <MaterialCommunityIcons
                    name="message-outline"
                    size={24}
                    color={
                      pathname === "/Messages" ? colors.theme : colors.gray
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
            tabBarButton: ({ onPress }) => (
              <SolidButton
                isToggle
                toggleValue={pathname === "/Rank"}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <MaterialCommunityIcons
                    name="trophy-outline"
                    size={24}
                    color={pathname === "/Rank" ? colors.theme : colors.gray}
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
            tabBarButton: ({ onPress }) => (
              <SolidButton
                isToggle
                toggleValue={pathname === "/Profile"}
                onPress={() => onPress?.(undefined as any)}
                child={
                  <FontAwesome6
                    name="circle-user"
                    size={24}
                    color={pathname === "/Profile" ? colors.theme : colors.gray}
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
