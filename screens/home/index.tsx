import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card as ContentCard } from "./components/Card";
import { FilterChips } from "./components/FilterChips";
import { Header } from "./components/Header";

// --- Dummy Data ---

const FILTERS = [
  { id: "1", label: "All", selected: true },
  { id: "2", label: "english", selected: false },
  { id: "3", label: "Japanes drama", selected: false },
  { id: "4", label: "Podcast", selected: false },
  { id: "5", label: "News", selected: false },
];

const CARDS = [
  {
    id: "1",
    date: "2026-1-14",
    duration: "29:22",
    title: "30 Minutes with 30 Dialogues to Improve English at Workplace |",
    image: "https://picsum.photos/700/350?random=1",
    icon: "youtube",
  },
  {
    id: "2",
    date: "2026-1-14", // Same date as above
    duration: "21:41",
    title: "The Easiest Way to Learn Real English Naturally",
    image: "https://picsum.photos/700/350?random=2",
    icon: "play",
  },
  {
    id: "3",
    date: "2026-1-12",
    duration: "15:00",
    title: "Daily Conversation Routine for Beginners",
    image: "https://picsum.photos/700/350?random=3",
    icon: "video",
  },
  {
    id: "4",
    date: "2026-1-11",
    duration: "45:10",
    title: "Mastering Japanese Drama Vocabulary",
    image: "https://picsum.photos/700/350?random=4",
    icon: "play",
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  // Constants for layout
  const HEADER_HEIGHT = 60;
  const EXPANDED_TITLE_HEIGHT = 50;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header scrollY={scrollY} />

      {/* --- FlatList Content --- */}
      <Animated.FlatList
        data={CARDS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_HEIGHT + EXPANDED_TITLE_HEIGHT + 24,
          paddingBottom: 100,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<FilterChips filters={FILTERS} />}
        renderItem={({ item, index }) => {
          // Grouping Logic: Show date only if it's the first item OR different from previous
          const prevItem = CARDS[index - 1];
          const showDate = index === 0 || item.date !== prevItem?.date;

          return (
            <View style={styles.cardWrapper}>
              {showDate && (
                <Text
                  variant="titleSmall"
                  style={[
                    styles.dateText,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {item.date}
                </Text>
              )}

              <ContentCard data={item} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    paddingHorizontal: 20,
  },
  dateText: {
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },
});
