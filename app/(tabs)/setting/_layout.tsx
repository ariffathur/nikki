import { Stack } from "expo-router";

export default function SettingStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="about" />
      <Stack.Screen name="clear-chace" />
      <Stack.Screen name="app-language" />
      <Stack.Screen name="subtitle" />
      <Stack.Screen name="theme" />
      <Stack.Screen name="subscription-plan" />
    </Stack>
  );
}
