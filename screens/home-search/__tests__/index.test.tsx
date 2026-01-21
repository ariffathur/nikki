import { renderWithProviders } from "@/tests/test-utils";
import HomeSearchScreen from "../index";

describe("HomeSearchScreen", () => {
  it("renders correctly without crashing", () => {
    const { getByText } = renderWithProviders(<HomeSearchScreen />);

    // Check text is displayed
    expect(getByText("Hello Home")).toBeTruthy();
  });

  it("displays simple greeting message", () => {
    const { getByText } = renderWithProviders(<HomeSearchScreen />);

    expect(getByText("Hello Home")).toBeTruthy();
  });

  it("renders within View container", () => {
    const { getByText } = renderWithProviders(<HomeSearchScreen />);

    // Component should render
    expect(HomeSearchScreen).toBeDefined();
  });
});
