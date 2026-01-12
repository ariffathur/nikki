import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="flashcard/index"
        options={{
          title: "Flashcard",
          tabBarLabel: "Flashcard",
        }}
      />
      <Tabs.Screen
        name="setting/index"
        options={{
          title: "Setting",
          tabBarLabel: "Setting",
        }}
      />
    </Tabs>
  );
}
