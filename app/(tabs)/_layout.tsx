import { router, Slot, usePathname } from "expo-router";
import { View } from "react-native";
import { BottomNavigation } from "react-native-paper";

export default function TabsLayout() {
  const pathname = usePathname();

  const routes = [
    { key: "home", title: "Home", focusedIcon: "home" },
    { key: "flashcard", title: "Flashcard", focusedIcon: "cards" },
    { key: "setting", title: "Setting", focusedIcon: "cog" },
  ];

  const index = routes.findIndex((r) => pathname.startsWith(`/${r.key}`));

  return (
    <View style={{ flex: 1 }}>
      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      {/* BOTTOM TAB */}
      <BottomNavigation.Bar
        navigationState={{
          index: index === -1 ? 0 : index,
          routes,
        }}
        onTabPress={({ route }) => {
          router.replace(`/${route.key}` as any);
        }}
      />
    </View>
  );
}
