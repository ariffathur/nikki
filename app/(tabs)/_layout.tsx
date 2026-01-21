import { router, Slot, usePathname } from "expo-router";
import { View } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { useTranslation } from "@/hooks/useTranslation";

export default function TabsLayout() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const routes = [
    { key: "home", title: t("tabs.home"), focusedIcon: "home" },
    { key: "flashcard", title: t("tabs.flashcard"), focusedIcon: "cards" },
    { key: "setting", title: t("tabs.setting"), focusedIcon: "cog" },
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
