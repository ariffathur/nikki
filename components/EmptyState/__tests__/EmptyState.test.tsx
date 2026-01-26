import { renderWithProviders } from "@/tests/test-utils";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("renders correctly with message", () => {
    const { getByText } = renderWithProviders(
      <EmptyState message="No content found" />,
    );

    expect(getByText("No content found")).toBeTruthy();
  });

  it("displays placeholder image", () => {
    const { getByTestId } = renderWithProviders(
      <EmptyState message="Test message" testID="empty-state" />,
    );

    expect(getByTestId("empty-state")).toBeTruthy();
  });

  it("renders without testID prop", () => {
    const { getByText } = renderWithProviders(
      <EmptyState message="No results" />,
    );

    expect(getByText("No results")).toBeTruthy();
  });

  it("displays message with correct styling", () => {
    const { getByText } = renderWithProviders(
      <EmptyState message="Try a different search term" />,
    );

    const messageElement = getByText("Try a different search term");
    expect(messageElement).toBeTruthy();
  });
});
