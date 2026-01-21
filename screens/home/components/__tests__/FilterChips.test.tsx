import { renderWithProviders } from "@/tests/test-utils";
import { FilterChips, FilterItem } from "../FilterChips";

describe("FilterChips", () => {
  const mockFilters: FilterItem[] = [
    {
      id: "1",
      label: "All",
      selected: true,
      testID: "filter-all",
    },
    {
      id: "2",
      label: "Recent",
      selected: false,
      testID: "filter-recent",
    },
    {
      id: "3",
      label: "Favorites",
      selected: false,
      testID: "filter-favorites",
    },
  ];

  it("renders correctly with filters", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <FilterChips filters={mockFilters} />
    );

    // Check all filter labels are displayed
    expect(getByText("All")).toBeTruthy();
    expect(getByText("Recent")).toBeTruthy();
    expect(getByText("Favorites")).toBeTruthy();

    // Check testIDs are present
    expect(getByTestId("filter-all")).toBeTruthy();
    expect(getByTestId("filter-recent")).toBeTruthy();
    expect(getByTestId("filter-favorites")).toBeTruthy();
  });

  it("renders empty filters array", () => {
    const { getByTestId } = renderWithProviders(
      <FilterChips filters={[]} />
    );

    // Should render without crashing
    expect(FilterChips).toBeTruthy();
  });

  it("renders with single filter", () => {
    const singleFilter: FilterItem[] = [
      {
        id: "1",
        label: "Only Filter",
        selected: true,
        testID: "filter-single",
      },
    ];

    const { getByText, getByTestId } = renderWithProviders(
      <FilterChips filters={singleFilter} />
    );

    expect(getByText("Only Filter")).toBeTruthy();
    expect(getByTestId("filter-single")).toBeTruthy();
  });

  it("displays all filters with correct labels", () => {
    const { getByText } = renderWithProviders(
      <FilterChips filters={mockFilters} />
    );

    mockFilters.forEach((filter) => {
      expect(getByText(filter.label)).toBeTruthy();
    });
  });

  it("renders with all filters unselected", () => {
    const allUnselected = mockFilters.map((f) => ({ ...f, selected: false }));

    const { getByText } = renderWithProviders(
      <FilterChips filters={allUnselected} />
    );

    expect(getByText("All")).toBeTruthy();
    expect(getByText("Recent")).toBeTruthy();
    expect(getByText("Favorites")).toBeTruthy();
  });
});
