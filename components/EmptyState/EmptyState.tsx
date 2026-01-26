import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface EmptyStateProps {
  message: string;
  testID?: string;
}

export const EmptyState = ({ message, testID }: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container} testID={testID}>
      <Image
        source={{ uri: "https://picsum.photos/400/400?random=empty" }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        variant="titleMedium"
        style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    opacity: 0.6,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
  },
});
