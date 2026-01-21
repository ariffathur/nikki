// tests/test-utils.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "react-native-paper";
import { BottomSheetProvider } from "@contexts/BottomSheetContext";
import { useTranslation } from "@hooks/useTranslation";

// Mock theme for testing
const mockTheme = {
  dark: false,
  colors: {
    primary: "#6750A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#EADDFF",
    onPrimaryContainer: "#21005D",
    secondary: "#625B71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E8DEF8",
    onSecondaryContainer: "#1D192B",
    tertiary: "#7D5260",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFD8E4",
    onTertiaryContainer: "#31111D",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#FFFBFE",
    onBackground: "#1C1B1F",
    surface: "#FFFBFE",
    onSurface: "#1C1B1F",
    surfaceVariant: "#E7E0EC",
    onSurfaceVariant: "#49454F",
    outline: "#79747E",
    outlineVariant: "#CAC4D0",
    inverseSurface: "#313033",
    inverseOnSurface: "#F4EFF4",
    inversePrimary: "#D0BCFF",
    shadow: "#000000",
    scrim: "#000000",
    backdrop: "rgba(0, 0, 0, 0.4)",
    elevation: {
      level0: "transparent",
      level1: "rgb(230, 225, 229)",
      level2: "rgb(223, 223, 227)",
      level3: "rgb(216, 218, 222)",
      level4: "rgb(213, 216, 220)",
      level5: "rgb(210, 213, 218)",
    },
    surfaceContainerHighest: "rgb(236, 222, 228)",
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400" as const,
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500" as const,
    },
    light: {
      fontFamily: "System",
      fontWeight: "300" as const,
    },
    thin: {
      fontFamily: "System",
      fontWeight: "100" as const,
    },
  },
};

// Mock translation provider
const MockTranslationProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock useTranslation hook
  React.useMemo(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: jest.fn(),
    });
  }, [children]);

  return <>{children}</>;
};

// Wrapper with all providers
export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={mockTheme}>
      <BottomSheetProvider>
        <MockTranslationProvider>{children}</MockTranslationProvider>
      </BottomSheetProvider>
    </ThemeProvider>
  );
};

// Custom render function with providers
export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: AllTheProviders });
};

// Re-export testing library utilities
export * from "@testing-library/react-native";
