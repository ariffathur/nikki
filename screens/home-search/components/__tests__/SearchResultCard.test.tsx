import { renderWithProviders } from "@/tests/test-utils";
import { SearchResultCard } from "../SearchResultCard";

describe("SearchResultCard", () => {
  const mockProps = {
    id: "1",
    title: "Test Video Title",
    image: "https://example.com/test.jpg",
    duration: "10:30",
    testID: "test-card",
  };

  it("renders correctly with required props", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <SearchResultCard {...mockProps} />,
    );

    // Check title is displayed
    expect(getByText("Test Video Title")).toBeTruthy();

    // Check testID is present
    expect(getByTestId("test-card")).toBeTruthy();

    // Check duration is displayed
    expect(getByText("10:30")).toBeTruthy();
  });

  it("displays card with image", () => {
    const { getByTestId } = renderWithProviders(
      <SearchResultCard {...mockProps} />,
    );

    expect(getByTestId("test-card")).toBeTruthy();
  });

  it("renders without testID prop", () => {
    const { getByText } = renderWithProviders(
      <SearchResultCard
        id="1"
        title="Test Video"
        image="https://example.com/test.jpg"
        duration="5:00"
      />,
    );

    expect(getByText("Test Video")).toBeTruthy();
  });
});
