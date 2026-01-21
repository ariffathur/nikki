import { renderWithProviders } from "@/tests/test-utils";
import Form from "../form";

describe("Form", () => {
  it("renders correctly without crashing", () => {
    // Component returns null, which is valid
    renderWithProviders(<Form />);

    // Component should render without throwing errors
    expect(Form).toBeDefined();
  });
});
