import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

// Define the interface for a filter item
export interface FilterItem {
  id: string;
  label: string;
  selected: boolean;
}

interface FilterChipsProps {
  filters: FilterItem[];
}

export const FilterChips = ({ filters }: FilterChipsProps) => {
  const theme = useTheme();

  return (
    <View style={styles.filterContainer}>
      <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => {
          const isSelected = filter.selected;
          const backgroundColor = isSelected
            ? theme.colors.secondaryContainer
            : "transparent";
          const textColor = isSelected
            ? theme.colors.onSecondaryContainer
            : theme.colors.onSurfaceVariant;
          const borderColor = isSelected ? "transparent" : theme.colors.outline;

          return (
            <Chip
              key={filter.id}
              style={[
                styles.chip,
                {
                  backgroundColor,
                  borderColor,
                  borderWidth: isSelected ? 0 : 1,
                },
                index === 0 && { marginLeft: 20 },
                index === filters.length - 1 && { marginRight: 20 },
              ]}
              textStyle={{
                color: textColor,
                fontWeight: isSelected ? "600" : "400",
              }}
              showSelectedOverlay={true}
              mode="flat"
              onPress={() => {}}
            >
              {filter.label}
            </Chip>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 16,
  },
  chip: {
    marginRight: 10,
    borderRadius: 14,
    height: 36,
  },
});
