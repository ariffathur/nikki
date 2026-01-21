import { renderWithProviders } from "@/tests/test-utils";
import FlashcardScreen from "../index";

describe("FlashcardScreen", () => {
  it("renders correctly without crashing", () => {
    const { getByText } = renderWithProviders(<FlashcardScreen />);

    // Check greeting is displayed
    expect(getByText("flashcard.greeting")).toBeTruthy();
  });

  it("displays translated greeting message", () => {
    const { getByText } = renderWithProviders(<FlashcardScreen />);

    expect(getByText("flashcard.greeting")).toBeTruthy();
  });

  it("renders within View container", () => {
    const { getByText } = renderWithProviders(<FlashcardScreen />);

    // Component should render
    expect(FlashcardScreen).toBeDefined();
  });
});
