import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { useBottomSheet } from "../../../context/BottomSheetContext";

const OPTIONS = [
  {
    id: "youtube",
    title: "Youtube URL",
    description: "Play the Youtube video in app without downloading it",
    icon: "video",
    testId: "option-youtube",
  },
  {
    id: "local",
    title: "Local Media",
    description:
      "Import the media file from your local storage without copying it",
    icon: "file-document",
    testId: "option-local",
  },
  {
    id: "album",
    title: "Photo Album",
    description: "Import the media file from your photo album",
    icon: "image-album",
    testId: "option-album",
  },
  {
    id: "miraa",
    title: "Miraa Drop",
    description: "Drop materials between your nearby miraa devices",
    icon: "target",
    testId: "option-miraa",
  },
];

export const ImportBottomSheetContent = () => {
  const theme = useTheme();
  const { closeBottomSheet } = useBottomSheet();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text
        style={[styles.headerTitle, { color: theme.colors.onSurface }]}
        variant="titleMedium"
      >
        Import video or audio
      </Text>
      <Text
        style={[
          styles.headerSubtitle,
          { color: theme.colors.onSurfaceVariant },
        ]}
        variant="bodyMedium"
      >
        Please select where you want to import the media from
      </Text>

      <View style={styles.listContainer}>
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              {
                borderColor: theme.colors.outlineVariant,
                backgroundColor: theme.colors.surface, // Or strictly theme.colors.surfaceVariant if preferred for cards
              },
            ]}
            onPress={() => {
              closeBottomSheet();
            }}
            testID={option.testId}
          >
            <View style={styles.iconContainer}>
              <Icon
                source={option.icon}
                size={24}
                color={theme.colors.onSurface}
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={{ color: theme.colors.onSurface, fontWeight: "bold" }}
                variant="labelLarge"
              >
                {option.title}
              </Text>
              <Text
                style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
                variant="bodySmall"
              >
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    marginBottom: 20,
  },
  listContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
});
