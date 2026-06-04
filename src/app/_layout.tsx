import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../utils/styles";
import { Tabs, usePathname } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SolidButton from "../components/solidUI/SolidButton";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

function Layout() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingTop: 10,
            height: 60 + insets.bottom,
          },
        }}
      >
        <Tabs.Screen
          name="People"
          options={{
            title: "People",
            tabBarButton: ({ onPress }) => (
              <SolidButton
                style={{ alignSelf: "center" }}
                isToggle
                width={60}
                toggleValue={pathname === "/People"}
                onPress={() => onPress?.(undefined as any)}
                borderWidth={1}
                child={
                  <Entypo
                    name="magnifying-glass"
                    size={24}
                    color={pathname === "/People" ? colors.theme : colors.gray}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Matches"
          options={{
            title: "Matches",
            tabBarButton: ({ onPress }) => (
              <SolidButton
                style={{ alignSelf: "center" }}
                isToggle
                width={60}
                toggleValue={pathname === "/Matches"}
                onPress={() => onPress?.(undefined as any)}
                borderWidth={1}
                child={
                  <FontAwesome6
                    name="message"
                    size={24}
                    color={pathname === "/Matches" ? colors.theme : colors.gray}
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
                style={{ alignSelf: "center" }}
                isToggle
                width={60}
                toggleValue={pathname === "/Rank"}
                onPress={() => onPress?.(undefined as any)}
                borderWidth={1}
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
                style={{
                  alignSelf: "center",
                }}
                isToggle
                width={60}
                toggleValue={pathname === "/Profile"}
                onPress={() => onPress?.(undefined as any)}
                borderWidth={1}
                child={
                  <Feather
                    name="user"
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

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Layout />
    </SafeAreaProvider>
  );
}
