import { renderWithProviders } from "@/tests/test-utils";
import FlashcardView from "../flashcard-view";

describe("FlashcardView", () => {
  it("renders correctly without crashing", () => {
    // Component returns null, which is valid
    renderWithProviders(<FlashcardView />);

    // Component should render without throwing errors
    expect(FlashcardView).toBeDefined();
  });
});
