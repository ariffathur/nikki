import { useDebounce } from "@/hooks/useDebounce";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "@components/EmptyState";
import { SearchResultCard } from "./components/SearchResultCard";

// Dummy data - will be replaced with API calls
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
    date: "2026-1-14",
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

export default function HomeSearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter cards based on search query (case-insensitive)
  const filteredCards = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return [];
    }

    return CARDS.filter((card) =>
      card.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
    );
  }, [debouncedSearchQuery]);

  const handleBack = () => {
    router.back();
  };

  const renderContent = () => {
    // Show empty state when no search query
    if (!debouncedSearchQuery.trim()) {
      return <EmptyState message={t("emptyState.noContentFound")} />;
    }

    // Show empty state when no results found
    if (filteredCards.length === 0) {
      return <EmptyState message={t("search.noResults")} />;
    }

    // Show search results
    return (
      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SearchResultCard
            id={item.id}
            title={item.title}
            image={item.image}
            duration={item.duration}
            testID={`search-result-${item.id}`}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      {/* Header with back button and search bar */}
      <View style={styles.header}>
        <Searchbar
          icon="arrow-left"
          onIconPress={handleBack}
          placeholder={t("search.placeholder")}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          autoFocus
          testID="search-input"
        />
      </View>

      {/* Content area */}
      <View style={styles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flex: 1,
    marginTop: 8,
    elevation: 0,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
});
