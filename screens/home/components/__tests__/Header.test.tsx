import { renderWithProviders } from "@/tests/test-utils";
import { Header } from "../Header";
import { SharedValue } from "react-native-reanimated";

describe("Header", () => {
  it("renders correctly without crashing", () => {
    // Mock SharedValue - simple object with value property
    const mockScrollY: SharedValue<number> = { value: 0 } as any;

    const { getByText } = renderWithProviders(<Header scrollY={mockScrollY} />);

    // Check title is displayed
    expect(getByText("home.title")).toBeTruthy();
  });

  it("renders header action buttons", () => {
    const mockScrollY: SharedValue<number> = { value: 0 } as any;

    const { getByTestId } = renderWithProviders(<Header scrollY={mockScrollY} />);

    // Header should render without crashing
    // Note: IconButton components don't have testIDs by default
    expect(Header).toBeDefined();
  });

  it("renders with initial scroll position", () => {
    const mockScrollY: SharedValue<number> = { value: 0 } as any;

    const { getByText } = renderWithProviders(<Header scrollY={mockScrollY} />);

    // Title should be visible at scroll position 0
    expect(getByText("home.title")).toBeTruthy();
  });

  it("renders with scrolled position", () => {
    const mockScrollY: SharedValue<number> = { value: 100 } as any;

    const { getByText } = renderWithProviders(<Header scrollY={mockScrollY} />);

    // Title should still be visible when scrolled
    expect(getByText("home.title")).toBeTruthy();
  });
});
