import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

interface SearchResultCardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  testID?: string;
}

export const SearchResultCard = ({
  id,
  title,
  image,
  duration,
  testID,
}: SearchResultCardProps) => {
  const theme = useTheme();

  return (
    <Card mode="contained" style={styles.card} testID={testID}>
      <View style={styles.imageContainer}>
        <Card.Cover source={{ uri: image }} style={styles.cardImage} />

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
            {duration}
          </Text>
        </View>
      </View>

      <Card.Content style={styles.cardContent}>
        <Text
          variant="titleMedium"
          style={[styles.cardTitle, { color: theme.colors.onSurface }]}
        >
          {title}
        </Text>
      </Card.Content>
    </Card>
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
