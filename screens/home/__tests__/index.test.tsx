import { renderWithProviders } from "@/tests/test-utils";
import HomeScreen from "../index";

describe("HomeScreen", () => {
  it("renders correctly without crashing", () => {
    const { getByText } = renderWithProviders(<HomeScreen />);

    // Check title is displayed
    expect(getByText("home.title")).toBeTruthy();

    // Check filter labels are displayed
    expect(getByText("home.filters.all")).toBeTruthy();
    expect(getByText("home.filters.english")).toBeTruthy();
    expect(getByText("home.filters.japaneseDrama")).toBeTruthy();
    expect(getByText("home.filters.podcast")).toBeTruthy();
    expect(getByText("home.filters.news")).toBeTruthy();
  });

  it("renders Header component", () => {
    const { getByText } = renderWithProviders(<HomeScreen />);

    // Header should display the title
    expect(getByText("home.title")).toBeTruthy();
  });

  it("renders FilterChips component", () => {
    const { getByText } = renderWithProviders(<HomeScreen />);

    // FilterChips should be rendered
    expect(getByText("home.filters.all")).toBeTruthy();
  });

  it("renders card list with dummy data", () => {
    const { getByText } = renderWithProviders(<HomeScreen />);

    // Should render cards with dummy data
    expect(getByText("30 Minutes with 30 Dialogues to Improve English at Workplace |")).toBeTruthy();
    expect(getByText("The Easiest Way to Learn Real English Naturally")).toBeTruthy();
    expect(getByText("Daily Conversation Routine for Beginners")).toBeTruthy();
    expect(getByText("Mastering Japanese Drama Vocabulary")).toBeTruthy();
  });

  it("displays date separators for cards", () => {
    const { getByText } = renderWithProviders(<HomeScreen />);

    // Should show dates for cards
    expect(getByText("2026-1-14")).toBeTruthy();
    expect(getByText("2026-1-12")).toBeTruthy();
    expect(getByText("2026-1-11")).toBeTruthy();
  });

  it("displays card durations", () => {
    const { getByText } = renderWithProviders(<HomeScreen />);

    // Should show durations for cards
    expect(getByText("29:22")).toBeTruthy();
    expect(getByText("21:41")).toBeTruthy();
    expect(getByText("15:00")).toBeTruthy();
    expect(getByText("45:10")).toBeTruthy();
  });
});
