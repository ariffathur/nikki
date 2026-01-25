import { renderWithProviders } from "@/tests/test-utils";
import { CardOptionsBottomSheet } from "../CardOptionsBottomSheet";

describe("CardOptionsBottomSheet", () => {
  const mockVideoData = {
    id: "1",
    title: "Learning Japanese for Beginners 1",
    image: "https://example.com/video.jpg",
    duration: "29:22",
    progress: 40,
  };

  it("renders correctly without crashing", () => {
    const { getByTestId } = renderWithProviders(
      <CardOptionsBottomSheet videoData={mockVideoData} />
    );

    // Check testID is present
    expect(getByTestId("card-options-bottom-sheet")).toBeTruthy();
  });

  it("displays all action buttons", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <CardOptionsBottomSheet videoData={mockVideoData} />
    );

    // Check all action buttons are present
    expect(getByTestId("delete-from-history-button")).toBeTruthy();
    expect(getByTestId("add-to-playlist-button")).toBeTruthy();
    expect(getByTestId("share-button")).toBeTruthy();

    // Check button labels are displayed
    expect(getByText("home.cardOptions.deleteFromHistory")).toBeTruthy();
    expect(getByText("home.cardOptions.addToPlaylist")).toBeTruthy();
    expect(getByText("home.cardOptions.share")).toBeTruthy();
  });

  it("renders with correct button structure", () => {
    const { getByTestId } = renderWithProviders(
      <CardOptionsBottomSheet videoData={mockVideoData} />
    );

    // Verify all buttons render without crashing
    expect(getByTestId("delete-from-history-button")).toBeTruthy();
    expect(getByTestId("add-to-playlist-button")).toBeTruthy();
    expect(getByTestId("share-button")).toBeTruthy();
  });

  it("accepts and handles callback props", () => {
    const mockDelete = jest.fn();
    const mockAddToPlaylist = jest.fn();
    const mockShare = jest.fn();

    const { getByTestId } = renderWithProviders(
      <CardOptionsBottomSheet
        videoData={mockVideoData}
        onDelete={mockDelete}
        onAddToPlaylist={mockAddToPlaylist}
        onShare={mockShare}
      />
    );

    // Verify the component renders with callbacks
    expect(getByTestId("delete-from-history-button")).toBeTruthy();
    expect(getByTestId("add-to-playlist-button")).toBeTruthy();
    expect(getByTestId("share-button")).toBeTruthy();
  });

  it("renders without callbacks", () => {
    const { getByTestId } = renderWithProviders(
      <CardOptionsBottomSheet videoData={mockVideoData} />
    );

    // Should render fine even without callbacks
    expect(getByTestId("card-options-bottom-sheet")).toBeTruthy();
  });
});
