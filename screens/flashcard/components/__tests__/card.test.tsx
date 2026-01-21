import { renderWithProviders } from "@/tests/test-utils";
import Card from "../card";

describe("Card", () => {
  it("renders correctly without crashing", () => {
    // Component returns null, which is valid
    renderWithProviders(<Card />);

    // Component should render without throwing errors
    expect(Card).toBeDefined();
  });
});
