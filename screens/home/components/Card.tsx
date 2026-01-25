import { useTranslation } from "@/hooks/useTranslation";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Icon, Card as PaperCard, Text, useTheme } from "react-native-paper";

interface CardData {
  id: string;
  image: string;
  icon?: string;
  duration: string;
  title: string;
  date?: string; // Included if needed, though not displayed inside the card content based on original code, but might be useful.
  testID?: string;
  progress?: number; // Progress percentage (0-100)
  onLongPress?: () => void;
}

interface CardProps {
  data: CardData;
}

export const Card = ({ data }: CardProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);

  const handleLongPressStart = () => {
    console.log("Long Press Started");
    setIsPressed(true);
  };

  const handleLongPressEnd = () => {
    console.log("Long Press Ended");
    setIsPressed(false);
    if (data.onLongPress) {
      data.onLongPress();
    }
  };

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      "worklet";
      runOnJS(handleLongPressStart)();
    })
    .onEnd(() => {
      "worklet";
      runOnJS(handleLongPressEnd)();
    });

  return (
    <GestureDetector gesture={longPressGesture}>
      <PaperCard
        style={[
          styles.card,
          {
            backgroundColor: isPressed
              ? theme.colors.surfaceVariant
              : theme.colors.elevation.level1,
          },
        ]}
        mode="contained"
        testID={data.testID}
        onPress={() => {
          alert(t("home.cardPressAlert"));
        }}
      >
        <View style={styles.imageContainer}>
          <PaperCard.Cover
            source={{ uri: data.image }}
            style={styles.cardImage}
          />

          {/* Overlay Icon (Top Right) */}
          {data.icon && (
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Icon
                source={data.icon}
                size={20}
                color={theme.colors.onSurface}
              />
            </View>
          )}

          {/* Duration Badge */}
          <View
            style={[
              styles.durationBadge,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text
              style={[styles.durationText, { color: theme.colors.primary }]}
            >
              {data.duration}
            </Text>
          </View>
        </View>

        <PaperCard.Content style={styles.cardContent}>
          <Text
            variant="titleMedium"
            style={[styles.cardTitle, { color: theme.colors.onSurface }]}
          >
            {data.title}
          </Text>
        </PaperCard.Content>
      </PaperCard>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 24,
  },
  imageContainer: {
    position: "relative",
    padding: 8,
  },
  cardImage: {
    height: 180,
    borderRadius: 20,
  },
  iconBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  durationBadge: {
    position: "absolute",
    bottom: 20,
    left: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    paddingBottom: 16,
    paddingTop: 4,
    paddingHorizontal: 12,
  },
  cardTitle: {
    fontWeight: "800",
    fontSize: 18,
    lineHeight: 24,
  },
});
