import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "@/hooks/useTranslation";
import { useBottomSheet } from "@contexts/BottomSheetContext";
import { EmptyState } from "@components/EmptyState";
import { Card as ContentCard } from "./components/Card";
import { CardOptionsBottomSheet } from "./components/CardOptionsBottomSheet";
import { FilterChips } from "./components/FilterChips";
import { Header } from "./components/Header";

// --- Dummy Data ---

// Note: FILTERS will be defined inside the component to use useTranslation hook

const CARDS = [
  {
    id: "1",
    date: "2026-1-14",
    duration: "29:22",
    title: "30 Minutes with 30 Dialogues to Improve English at Workplace |",
    image: "https://picsum.photos/700/350?random=1",
    icon: "youtube",
    progress: 40,
  },
  {
    id: "2",
    date: "2026-1-14", // Same date as above
    duration: "21:41",
    title: "The Easiest Way to Learn Real English Naturally",
    image: "https://picsum.photos/700/350?random=2",
    icon: "play",
    progress: 75,
  },
  {
    id: "3",
    date: "2026-1-12",
    duration: "15:00",
    title: "Daily Conversation Routine for Beginners",
    image: "https://picsum.photos/700/350?random=3",
    icon: "video",
    progress: 20,
  },
  {
    id: "4",
    date: "2026-1-11",
    duration: "45:10",
    title: "Mastering Japanese Drama Vocabulary",
    image: "https://picsum.photos/700/350?random=4",
    icon: "play",
    progress: 90,
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const { t } = useTranslation();
  const { openBottomSheet } = useBottomSheet();

  // Constants for layout
  const HEADER_HEIGHT = 60;
  const EXPANDED_TITLE_HEIGHT = 50;

  // Define filters with translations
  const FILTERS = [
    { id: "1", label: t("home.filters.all"), selected: true },
    { id: "2", label: t("home.filters.english"), selected: false },
    { id: "3", label: t("home.filters.japaneseDrama"), selected: false },
    { id: "4", label: t("home.filters.podcast"), selected: false },
    { id: "5", label: t("home.filters.news"), selected: false },
  ];

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleCardLongPress = (cardData: typeof CARDS[0]) => {
    openBottomSheet(
      <CardOptionsBottomSheet
        videoData={{
          id: cardData.id,
          title: cardData.title,
          image: cardData.image,
          duration: cardData.duration,
          progress: cardData.progress,
        }}
        onDelete={() => {
          console.log("Delete from history:", cardData.id);
        }}
        onAddToPlaylist={() => {
          console.log("Add to playlist:", cardData.id);
        }}
        onShare={() => {
          console.log("Share:", cardData.id);
        }}
      />,
      ["70%", "90%"],
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header scrollY={scrollY} />

      {CARDS.length === 0 ? (
        <EmptyState message={t("emptyState.noContentFound")} />
      ) : (
        /* --- FlatList Content --- */
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

                <ContentCard
                  data={{
                    ...item,
                    onLongPress: () => handleCardLongPress(item),
                  }}
                />
              </View>
            );
          }}
        />
      )}
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
