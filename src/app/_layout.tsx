import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSettingsStore } from "../state/settings/useSettingsStore";
import { useEffect } from "react";
import { colors } from "../utils/objects/styles";

import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { settings, loadSettings } = useSettingsStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarStyle: {
          paddingTop: 5,
          height: 85,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-edit"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Example"
        options={{
          title: "Example",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-edit"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="gear" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
    </GestureHandlerRootView>
  );
}
