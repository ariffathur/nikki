import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Card as PaperCard, Text, useTheme } from "react-native-paper";

interface CardData {
  id: string;
  image: string;
  icon?: string;
  duration: string;
  title: string;
  date?: string; // Included if needed, though not displayed inside the card content based on original code, but might be useful.
  testID?: string;
}

interface CardProps {
  data: CardData;
}

export const Card = ({ data }: CardProps) => {
  const theme = useTheme();

  return (
    <PaperCard
      style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}
      mode="contained"
      testID={data.testID}
      onPress={() => {
        alert("cuk");
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
            <Icon source={data.icon} size={20} color={theme.colors.onSurface} />
          </View>
        )}

        {/* Duration Badge */}
        <View
          style={[
            styles.durationBadge,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.durationText, { color: theme.colors.primary }]}>
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
