// tests/setup.ts
import "@testing-library/jest-native/extend-expect";

// Mock useTranslation hook
jest.mock("@hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    locale: "en",
    setLocale: jest.fn(),
  }),
}));

// Mock expo-localization
jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageCode: "en" }],
}));

// Mock i18n-js
jest.mock("i18n-js", () => ({
  I18n: jest.fn().mockImplementation(() => ({
    locale: "en",
    translations: {},
    t: (key: string) => key,
  })),
}));

// Mock react-native-reanimated (uses manual mock in __mocks__/react-native-reanimated)
jest.mock("react-native-reanimated");

// Mock react-native-worklets
jest.mock("react-native-worklets", () => ({
  runOnUI: (fn) => fn,
  makeRunInContext: () => (fn) => fn,
  createSerializable: (fn) => fn,
}));

// Mock react-native-gesture-handler
jest.mock("react-native-gesture-handler", () => ({
  GestureDetector: ({ children }: any) => children,
  Gesture: {
    Tap: () => ({}) ,
    Pan: () => ({}) ,
    NativeViewGesture: () => ({}) ,
  },
  GestureHandlerRootView: ({ children }: any) => children,
  State: {},
  Directions: {},
  default: {},
}));

// Mock @gorhom/bottom-sheet
jest.mock("@gorhom/bottom-sheet", () => ({
  BottomSheet: ({ children }: any) => children,
  BottomSheetView: ({ children }: any) => children,
  BottomSheetBackdrop: () => null,
  default: {
    BottomSheet: ({ children }: any) => children,
    BottomSheetView: ({ children }: any) => children,
  },
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
}));
