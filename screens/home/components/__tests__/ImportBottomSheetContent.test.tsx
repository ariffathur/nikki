import { renderWithProviders } from "@/tests/test-utils";
import { ImportBottomSheetContent } from "../ImportBottomSheetContent";

describe("ImportBottomSheetContent", () => {
  it("renders correctly without crashing", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <ImportBottomSheetContent />
    );

    // Check title is displayed
    expect(getByText("home.import.title")).toBeTruthy();

    // Check subtitle is displayed
    expect(getByText("home.import.subtitle")).toBeTruthy();
  });

  it("renders all import options", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <ImportBottomSheetContent />
    );

    // Check all option titles are displayed
    expect(getByText("home.import.options.youtube.title")).toBeTruthy();
    expect(getByText("home.import.options.local.title")).toBeTruthy();
    expect(getByText("home.import.options.album.title")).toBeTruthy();
    expect(getByText("home.import.options.miraa.title")).toBeTruthy();

    // Check all option descriptions are displayed
    expect(getByText("home.import.options.youtube.description")).toBeTruthy();
    expect(getByText("home.import.options.local.description")).toBeTruthy();
    expect(getByText("home.import.options.album.description")).toBeTruthy();
    expect(getByText("home.import.options.miraa.description")).toBeTruthy();

    // Check testIDs are present
    expect(getByTestId("option-youtube")).toBeTruthy();
    expect(getByTestId("option-local")).toBeTruthy();
    expect(getByTestId("option-album")).toBeTruthy();
    expect(getByTestId("option-miraa")).toBeTruthy();
  });

  it("renders correct number of import options", () => {
    const { getAllByTestId } = renderWithProviders(
      <ImportBottomSheetContent />
    );

    // Should have 4 options (youtube, local, album, miraa)
    const options = ["option-youtube", "option-local", "option-album", "option-miraa"];
    options.forEach((testId) => {
      expect(getByTestId(testId)).toBeTruthy();
    });
  });

  it("displays option titles and descriptions correctly", () => {
    const { getByText } = renderWithProviders(
      <ImportBottomSheetContent />
    );

    // Verify each option has both title and description
    const options = [
      { title: "home.import.options.youtube.title", desc: "home.import.options.youtube.description" },
      { title: "home.import.options.local.title", desc: "home.import.options.local.description" },
      { title: "home.import.options.album.title", desc: "home.import.options.album.description" },
      { title: "home.import.options.miraa.title", desc: "home.import.options.miraa.description" },
    ];

    options.forEach((option) => {
      expect(getByText(option.title)).toBeTruthy();
      expect(getByText(option.desc)).toBeTruthy();
    });
  });
});
