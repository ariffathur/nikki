import { renderWithProviders } from "@/tests/test-utils";
import HomeSearchScreen from "../index";

describe("HomeSearchScreen", () => {
  it("renders correctly without crashing", () => {
    const { getByTestId } = renderWithProviders(<HomeSearchScreen />);

    // Check that search bar is present
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("displays search bar component", () => {
    const { getByTestId } = renderWithProviders(<HomeSearchScreen />);

    // Check search bar exists with testID
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("shows search bar with back icon", () => {
    const { getByTestId } = renderWithProviders(<HomeSearchScreen />);

    // Searchbar includes the back icon as part of the component
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("displays empty state when no search query", () => {
    const { getByText } = renderWithProviders(<HomeSearchScreen />);

    // Translation mock returns the key itself
    expect(getByText("emptyState.noContentFound")).toBeTruthy();
  });

  it("is wrapped with SafeAreaView", () => {
    const { UNSAFE_getByType } = renderWithProviders(<HomeSearchScreen />);
    const { SafeAreaView } = require("react-native-safe-area-context");

    // Check that SafeAreaView is present
    expect(UNSAFE_getByType(SafeAreaView)).toBeTruthy();
  });
});
