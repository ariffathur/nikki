// tests/test-utils.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider, MD3LightTheme } from "react-native-paper";
import { BottomSheetProvider } from "@contexts/BottomSheetContext";

// Enhanced mock theme based on MD3LightTheme
const mockTheme = {
  ...MD3LightTheme,
  dark: false,
  mode: "exact" as const,
  animation: {
    scale: 1.0,
  },
};

// Wrapper with all providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={mockTheme}>
      <BottomSheetProvider>{children}</BottomSheetProvider>
    </ThemeProvider>
  );
};

// Custom render function with providers
export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: AllTheProviders });
};

// Re-export testing library utilities
export * from "@testing-library/react-native";
