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
import React from "react";

type TabBarButtonProps = {
  onPress: ((e?: any) => void) | undefined;
  route: string;
  icon: (isActive: boolean) => React.ReactNode;
};

function TabBarButton({ onPress, route, icon }: TabBarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === `/${route}`;
  return (
    <SolidButton
      style={{ alignSelf: "center" }}
      isToggle
      width={60}
      toggleValue={isActive}
      onPress={() => onPress?.(undefined as any)}
      borderWidth={1}
      child={icon(isActive)}
      backgroundColor={colors.white}
      pressedBackgroundColor={colors.apple}
    />
  );
}

function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingTop: 10,
            paddingBottom: 10,
            height: 60 + insets.bottom,
          },
        }}
      >
        <Tabs.Screen
          name="People"
          options={{
            title: "People",
            tabBarButton: ({ onPress }) => (
              <TabBarButton
                onPress={onPress}
                route="People"
                icon={(isActive) => (
                  <Entypo
                    name="magnifying-glass"
                    size={24}
                    color={isActive ? colors.gray : colors.gray}
                  />
                )}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Matches"
          options={{
            title: "Matches",
            tabBarButton: ({ onPress }) => (
              <TabBarButton
                onPress={onPress}
                route="Matches"
                icon={(isActive) => (
                  <FontAwesome6
                    name="message"
                    size={24}
                    color={isActive ? colors.gray : colors.gray}
                  />
                )}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Rank"
          options={{
            title: "Rank",
            tabBarButton: ({ onPress }) => (
              <TabBarButton
                onPress={onPress}
                route="Rank"
                icon={(isActive) => (
                  <MaterialCommunityIcons
                    name="trophy-outline"
                    size={24}
                    color={isActive ? colors.gray : colors.gray}
                  />
                )}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarButton: ({ onPress }) => (
              <TabBarButton
                onPress={onPress}
                route="Profile"
                icon={(isActive) => (
                  <Feather
                    name="user"
                    size={24}
                    color={isActive ? colors.gray : colors.gray}
                  />
                )}
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
