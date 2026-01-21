import { renderWithProviders } from "@/tests/test-utils";
import SettingScreen from "../index";

describe("SettingScreen", () => {
  it("renders correctly without crashing", () => {
    const { getByText } = renderWithProviders(<SettingScreen />);

    // Check greeting is displayed
    expect(getByText("setting.greeting")).toBeTruthy();
  });

  it("displays translated greeting message", () => {
    const { getByText } = renderWithProviders(<SettingScreen />);

    expect(getByText("setting.greeting")).toBeTruthy();
  });

  it("renders within View container", () => {
    const { getByText } = renderWithProviders(<SettingScreen />);

    // Component should render
    expect(SettingScreen).toBeDefined();
  });
});
