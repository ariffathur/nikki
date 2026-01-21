import { useTranslation } from "@/hooks/useTranslation";
import { useBottomSheet } from "@contexts/BottomSheetContext";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

const OPTIONS = [
  {
    id: "youtube",
    titleKey: "home.import.options.youtube.title",
    descriptionKey: "home.import.options.youtube.description",
    icon: "video",
    testId: "option-youtube",
  },
  {
    id: "local",
    titleKey: "home.import.options.local.title",
    descriptionKey: "home.import.options.local.description",
    icon: "file-document",
    testId: "option-local",
  },
  {
    id: "album",
    titleKey: "home.import.options.album.title",
    descriptionKey: "home.import.options.album.description",
    icon: "image-album",
    testId: "option-album",
  },
  {
    id: "miraa",
    titleKey: "home.import.options.miraa.title",
    descriptionKey: "home.import.options.miraa.description",
    icon: "target",
    testId: "option-miraa",
  },
];

export const ImportBottomSheetContent = () => {
  const theme = useTheme();
  const { closeBottomSheet } = useBottomSheet();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text
        style={[styles.headerTitle, { color: theme.colors.onSurface }]}
        variant="titleMedium"
      >
        {t("home.import.title")}
      </Text>
      <Text
        style={[
          styles.headerSubtitle,
          { color: theme.colors.onSurfaceVariant },
        ]}
        variant="bodyMedium"
      >
        {t("home.import.subtitle")}
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
                {t(option.titleKey)}
              </Text>
              <Text
                style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
                variant="bodySmall"
              >
                {t(option.descriptionKey)}
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
