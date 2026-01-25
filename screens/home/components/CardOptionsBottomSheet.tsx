import { useTranslation } from "@/hooks/useTranslation";
import { useBottomSheet } from "@contexts/BottomSheetContext";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

interface VideoData {
  id: string;
  title: string;
  image: string;
  duration?: string;
  progress?: number; // Progress percentage (0-100)
}

interface CardOptionsBottomSheetProps {
  videoData: VideoData;
  onDelete?: () => void;
  onAddToPlaylist?: () => void;
  onShare?: () => void;
}

type ActionButton = {
  icon: string;
  label: string;
  color: string;
  testID: string;
  onPress: () => void;
};

export const CardOptionsBottomSheet = ({
  videoData,
  onDelete,
  onAddToPlaylist,
  onShare,
}: CardOptionsBottomSheetProps) => {
  const theme = useTheme();
  const { closeBottomSheet } = useBottomSheet();
  const { t } = useTranslation();

  const handleAction = (callback?: () => void) => {
    callback?.();
    closeBottomSheet();
  };

  const actionButtons: ActionButton[] = [
    {
      icon: "playlist-plus",
      label: t("home.cardOptions.addToPlaylist"),
      color: theme.colors.primary,
      testID: "add-to-playlist-button",
      onPress: () => handleAction(onAddToPlaylist),
    },
    {
      icon: "pencil",
      label: t("home.cardOptions.rename"),
      color: theme.colors.secondary,
      testID: "edit-button",
      onPress: () => handleAction(onShare),
    },
    {
      icon: "delete-outline",
      label: t("home.cardOptions.deleteFromHistory"),
      color: theme.colors.error,
      testID: "delete-from-history-button",
      onPress: () => handleAction(onDelete),
    },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      testID="card-options-bottom-sheet"
    >
      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {actionButtons.map((action) => (
          <TouchableOpacity
            key={action.testID}
            style={[styles.actionButton, { borderColor: theme.colors.outline }]}
            onPress={action.onPress}
            testID={action.testID}
          >
            <View style={styles.actionIcon}>
              <Icon source={action.icon} size={24} color={action.color} />
            </View>
            <Text
              variant="labelLarge"
              style={[styles.actionText, { color: action.color }]}
            >
              {action.label}
            </Text>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontWeight: "600",
  },
});
