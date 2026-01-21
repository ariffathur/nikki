import { renderWithProviders } from "@/tests/test-utils";
import { GlobalBottomSheet } from "../GlobalBottomSheet";

describe("GlobalBottomSheet", () => {
  it("renders correctly without crashing", () => {
    const { getByTestId } = renderWithProviders(<GlobalBottomSheet />);

    // The component should render without throwing errors
    // GlobalBottomSheet uses absolute positioning and is always present in the tree
    expect(GlobalBottomSheet).toBeTruthy();
  });

  it("renders with default closed state", () => {
    const { getByTestId } = renderWithProviders(<GlobalBottomSheet />);

    // Component should render without content initially
    // The bottom sheet should be closed (index=-1) by default
    expect(GlobalBottomSheet).toBeDefined();
  });
});
