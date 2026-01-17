import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { GlobalBottomSheet } from "../components/BottomSheet/GlobalBottomSheet";
import { BottomSheetProvider } from "../context/BottomSheetContext";

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <BottomSheetProvider>
          <BottomSheetModalProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
            <GlobalBottomSheet />
          </BottomSheetModalProvider>
        </BottomSheetProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
