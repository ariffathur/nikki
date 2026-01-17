import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet } from "../../../context/BottomSheetContext";
import { ImportBottomSheetContent } from "./ImportBottomSheetContent";

interface HeaderProps {
  scrollY: SharedValue<number>;
}

export const Header = ({ scrollY }: HeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { openBottomSheet } = useBottomSheet();

  // Constants
  const HEADER_HEIGHT = 60;
  const HEADER_FULL_HEIGHT = insets.top + HEADER_HEIGHT;
  const SCROLL_RANGE = 80;

  const headerBackgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE - 20],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [42, 22],
      Extrapolation.CLAMP,
    );

    const startTop = insets.top + 60;
    const endTop = insets.top + 12;

    const top = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [startTop, endTop],
      Extrapolation.CLAMP,
    );

    return {
      fontSize,
      top,
    };
  });

  return (
    <>
      <Animated.View
        style={[
          styles.headerBackground,
          {
            height: HEADER_FULL_HEIGHT,
            backgroundColor: theme.colors.surface,
          },
          headerBackgroundStyle,
        ]}
      />

      <View
        style={[
          styles.headerActions,
          { top: insets.top, height: HEADER_HEIGHT },
        ]}
      >
        <View style={{ flex: 1 }} />
        <IconButton
          icon="magnify"
          size={26}
          onPress={() => {}}
          iconColor={theme.colors.onSurface}
        />
        <IconButton
          icon="plus"
          size={26}
          onPress={() => {
            openBottomSheet(<ImportBottomSheetContent />, ["70%"]);
          }}
          containerColor={theme.colors.secondaryContainer}
          iconColor={theme.colors.onSecondaryContainer}
          mode="contained"
          style={styles.plusButton}
        />
      </View>

      <Animated.Text
        style={[
          styles.mainTitle,
          { color: theme.colors.onSurface },
          animatedTitleStyle,
        ]}
      >
        Nikki
      </Animated.Text>
    </>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerActions: {
    position: "absolute",
    left: 0,
    right: 16,
    flexDirection: "row",
    zIndex: 20,
    alignItems: "center",
  },
  plusButton: {
    margin: 0,
    marginLeft: 4,
  },
  mainTitle: {
    position: "absolute",
    left: 20,
    fontWeight: "900",
    zIndex: 10,
  },
});
