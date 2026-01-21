import * as ReactNative from "react-native";

// Mock SharedValue class
export class SharedValue<T = any> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

// Mock hooks to return simple values
export const useAnimatedStyle = (stylesheetOrFn: any, deps?: any[]) => {
  return typeof stylesheetOrFn === "function" ? {} : stylesheetOrFn;
};

export const useSharedValue = <T>(value: T) => new SharedValue(value);

export const useDerivedValue = () => new SharedValue(0);

export const useAnimatedScrollHandler = () => () => {};

// Mock animation functions (no-ops for testing)
export const withSpring = (value: any) => value;
export const withTiming = (value: any) => value;
export const withDecay = (value: any) => value;
export const withSequence = (...args: any[]) => args[0];
export const withDelay = (delay: number, animation: any) => animation;
export const withRepeat = (animation: any, iterations: number) => animation;

// Mock interpolation
export const interpolate = (value: any, inputRange: any, outputRange: any) => {
  return outputRange[0];
};

export const Extrapolation = {
  CLAMP: "clamp",
  EXTEND: "extend",
};

// Mock worklets
export const runOnUI = (fn: any) => fn;
export const call = () => {};

// Default export
export const default = {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  useAnimatedScrollHandler,
  withSpring,
  withTiming,
  withDecay,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  Extrapolation,
  runOnUI,
  call,
};

// KEY: Treat Animated components as regular React Native components for testing
// This allows tests to focus on rendering and interaction without worrying about animations
export const Animated = {
  View: ReactNative.View,
  Text: ReactNative.Text,
  Image: ReactNative.Image,
  ScrollView: ReactNative.ScrollView,
  FlatList: ReactNative.FlatList,
  StyleSheet: ReactNative.StyleSheet,
};

export const createAnimatedComponent = (component: any) => component;
