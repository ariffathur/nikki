# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nikki** (日記 - meaning "diary" in Japanese) is a language learning app focused on **comprehensible input** through two core methodologies:

1. **Shadowing Practice**: Users add YouTube videos or videos from phone gallery. The app transcribes and adds subtitles, enabling users to shadow (speak along with) the content while receiving explanations when tapping individual words in the subtitles.

2. **Spaced Repetition Flashcards**: Users can save any sentence from videos to their personal flashcard deck for review through a spaced repetition system (SRS), facilitating long-term language acquisition.

## Development Commands

### Starting Development
- `yarn install` - Install dependencies
- `yarn start` - Start the development server
- `yarn android` - Run on Android emulator/device
- `yarn ios` - Run on iOS simulator/device
- `yarn web` - Run in web browser

### Code Quality
- `yarn lint` - Run ESLint
- `yarn reset-project` - Reset project (moves starter code to app-example/)

## Architecture

### File-Based Routing Structure
The app uses **Expo Router** with a hybrid stack/tab navigation:

```
app/
├── _layout.tsx                    # Root Stack layout (wraps tabs)
├── (tabs)/
│   ├── _layout.tsx               # Main Tab navigation (Home, Flashcard, Setting)
│   ├── home/
│   │   ├── index.tsx             # Home tab (routes to screens/home)
│   │   ├── search.tsx            # Search feature
│   │   ├── learn.tsx             # Learn feature
│   │   └── _layout.tsx
│   ├── flashcard/
│   │   ├── index.tsx             # Flashcard tab (routes to screens/flashcard)
│   │   ├── review.tsx            # Flashcard review screen
│   │   └── _layout.tsx           # Stack navigator within flashcard tab
│   └── setting/
│       ├── index.tsx             # Settings tab
│       ├── theme.tsx             # Theme settings
│       ├── app-language.tsx      # App language settings
│       ├── subtitle.tsx          # Subtitle settings
│       ├── clear-chace.tsx       # Cache management
│       ├── subscription-plan.tsx # Subscription screen
│       ├── about.tsx             # About screen
│       └── _layout.tsx
```

**Key Pattern**: Route files in `app/` are thin wrappers that import screen implementations from `screens/`.

### Screen Architecture

Each feature in `screens/` follows a **consistent modular structure**:

```
screens/{feature}/
├── index.tsx              # Main screen component
├── api.ts                 # API calls and data fetching
├── types.ts               # TypeScript type definitions
├── hooks.ts               # Custom React hooks
└── components/            # Feature-specific components
    └── *.tsx
```

Features:
- `home/` - Home screen with video content and shadowing interface
- `home-search/` - Search functionality for discovering content
- `flashcard/` - SRS flashcard system with review mode
- `setting/` - App settings and configuration

### Shared Code Structure

- `components/` - Shared UI components (button.tsx, text.tsx)
- `lib/` - Shared utilities and configurations (apiClient.ts for API configuration)
- `constants/` - App-wide constants (currently empty)

### Key Technologies

- **React Native** 0.81.5 with **React** 19.1.0
- **Expo Router** v6 with typed routes enabled (`experiments.typedRoutes: true`)
- **React Navigation** for bottom tabs and stack navigation
- **React Native Reanimated** ~4.1.1 for animations
- **React Native Worklets** 0.5.1 for JSI-based optimizations
- **TypeScript** with strict mode enabled
- **ESLint** with Expo config

### UI Components & Patterns

**Global Bottom Sheet**:
- Context-based API via `useBottomSheet()` hook from `context/BottomSheetContext.tsx`
- Call `openBottomSheet(content, snapPoints)` to display any React node
- Global instance rendered in root layout with `@gorhom/bottom-sheet`
- Supports custom snap points (e.g., `["50%", "80%"]`)

**Theming**:
- Material Design 3 (MD3) with React Native Paper
- Automatic dark/light mode based on system preference
- Theme accessible via `useTheme()` hook
- Custom theme extensions in `app/_layout.tsx`

**Internationalization**:
- `i18n-js` with `expo-localization` for auto-detecting device language
- Custom `useTranslation()` hook wraps i18n API
- Translations stored in `localization/translations/` (en.json, id.json)
- Locale change triggers re-renders across components

**Navigation Patterns**:
- File-based routing via Expo Router with typed routes enabled
- Route files in `app/` are thin wrappers importing from `screens/`
- Bottom tabs controlled via React Native Paper's `BottomNavigation.Bar`
- Stack navigators within tabs for nested screens (e.g., flashcard/review.tsx)

### Core Features to Implement

**Video & Subtitle System**:
- Video player interface (YouTube embed + local video playback)
- Subtitle display with word-level interactivity
- Word tap-to-explain functionality
- Shadowing practice mode
- Video transcription and subtitle generation

**Flashcard System**:
- Add sentences from subtitles to flashcard deck
- Spaced repetition algorithm (SRS)
- Review interface with flip animation
- Progress tracking and scheduling

**Content Management**:
- YouTube video integration
- Local video gallery support
- Video library/playlist management
- Search and discover content

### Editor Configuration

VSCode automatically organizes imports and fixes issues on save (configured in `.vscode/settings.json`).

### Project-Specific Settings

- **Deep linking scheme**: `nikki://`
- **Path aliases** (configured in tsconfig.json):
  - `@/*` - maps to project root
  - `@localization/*` - maps to localization/
  - `@hooks/*` - maps to hooks/
  - `@components/*` - maps to components/
  - `@screens/*` - maps to screens/
  - `@services/*` - maps to services/
  - `@assets/*` - maps to assets/
- **New Architecture**: Enabled for performance
- **Experiments**:
  - `typedRoutes`: True - enables typed routing
  - `reactCompiler`: True - enables React Compiler optimizations

## Component & Screen Development Guidelines

This section defines the standards for building UI components and screens in the Nikki app.

### 1. Type Organization

**Component-level types**: Keep types inline within component files when they're specific to that component.

```tsx
// screens/home/components/VideoCard.tsx
interface VideoCardProps {
  title: string;
  thumbnailUrl: string;
}
```

**Feature-level shared types**: When multiple components within a feature share the same types, create a `shared-types.ts` file at the feature level.

```
screens/home/
├── shared-types.ts          # Shared types used across home components
├── index.tsx
└── components/
    ├── VideoCard.tsx        # Uses types from shared-types.ts
    └── VideoList.tsx        # Uses types from shared-types.ts
```

**Globally shared types**: Rare. Only create `@types/` for truly cross-cutting types used across multiple features.

### 2. UI Components Strategy

**Default to React Native Paper**: Always use React Native Paper components as the foundation. They provide:
- Material Design 3 compliant components
- Built-in theming support
- Accessibility features
- Consistent cross-platform behavior

```tsx
import { Button, Card, TextInput } from "react-native-paper";

// ✅ Good: Use RNP components
<Button mode="contained" onPress={handlePress}>
  Submit
</Button>

// ❌ Bad: Creating custom button when RNP suffices
<TouchableOpacity onPress={handlePress}>
  <Text>Submit</Text>
</TouchableOpacity>
```

**Custom components**: Only create custom components when React Native Paper fundamentally cannot achieve the required functionality (not just for minor styling differences).

Examples justifying custom components:
- Complex animations not supported by RNP
- Custom gesture handling
- Platform-specific native behavior
- Specialized layouts not possible with RNP primitives

### 3. Component Location Rules

**Feature-specific components**: Place components in `screens/{feature}/components/` when they're only used within that feature.

```
screens/home/
└── components/
    ├── VideoCard.tsx        # Only used in home feature
    ├── VideoList.tsx        # Only used in home feature
    └── SubtitleDisplay.tsx  # Only used in home feature
```

**Global components**: Place in `@components/` only when genuinely reusable across multiple features.

```
components/
└── BottomSheet/
    └── GlobalBottomSheet.tsx  # ✅ Used app-wide
```

**Decision criteria**: If a component is used in 2+ unrelated features and doesn't belong to any specific domain, it's a good candidate for `@components/`.

### 4. Translation Implementation

**No hardcoded text**: All user-facing text must use the `useTranslation()` hook from `@hooks/useTranslation.ts`.

```tsx
import { useTranslation } from "@hooks/useTranslation";

export const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("home.welcome")}</Text>
      <Button>{t("home.getStarted")}</Button>
    </View>
  );
};
```

**Translation key structure**: Use feature-prefixed keys for organization.

```json
// localization/translations/en.json
{
  "home": {
    "title": "Welcome to Nikki",
    "addVideoButton": "Add Video",
    "recentVideos": "Recent Videos"
  },
  "flashcard": {
    "title": "Flashcards",
    "flipCard": "Tap to flip",
    "nextCard": "Next Card"
  }
}
```

**Add translations**: Always add new keys to all translation files (`en.json`, `id.json`) when implementing features.

**Exceptions - when hardcoding is acceptable**:
- Dummy data for development/testing
- Content fetched from API
- Technical identifiers, debug logs, or keys
- Proper nouns (names, brands, etc.)

### 5. Working with Design References

**Images as layout guides**: When provided with an image/mockup, use it as a structural reference only.

```tsx
// ✅ Good: Translate design to RNP components
<Card>
  <Card.Cover source={{ uri: video.thumbnail }} />
  <Card.Title title={video.title} />
  <Card.Actions>
    <Button mode="contained">{t("home.watch")}</Button>
  </Card.Actions>
</Card>

// ❌ Bad: Recreating design pixel-perfect with custom components
<View style={customCardStyles}>
  <Image source={video.thumbnail} style={customImageStyles} />
  <Text style={customTitleStyles}>{video.title}</Text>
  <TouchableOpacity style={customButtonStyles}>
    <Text>Watch</Text>
  </TouchableOpacity>
</View>
```

**Rules for design implementation**:
1. Use the image to understand layout structure and component hierarchy
2. Implement using React Native Paper components
3. Apply RNP theming for colors and typography
4. Add translations for all text content
5. Focus on functionality and accessibility over exact visual replication

### 6. Unit Testing Requirements

**Every component must have a happy path unit test**. Tests ensure components render correctly and handle basic interactions.

**Test file location**: Mirror the component structure in `__tests__/` directories:

```
screens/home/components/
├── Card.tsx
└── __tests__/
    └── Card.test.tsx

components/BottomSheet/
├── GlobalBottomSheet.tsx
└── __tests__/
    └── GlobalBottomSheet.test.tsx
```

**What to test in the happy path**:
1. **Render without crashing**: Component mounts with required props
2. **Display props correctly**: Text, images, and data appear as expected
3. **Basic user interactions**: Presses, inputs, and taps work

**Example test for Card component**:

```tsx
// screens/home/components/__tests__/Card.test.tsx
import { renderWithProviders } from "@/tests/test-utils";
import { Card } from "../Card";

describe("Card", () => {
  const mockData = {
    id: "1",
    image: "https://example.com/video.jpg",
    duration: "10:30",
    title: "Japanese Lesson 1",
    testID: "video-card-1",
  };

  it("renders correctly with required props", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <Card data={mockData} />
    );

    // Check title is displayed
    expect(getByText("Japanese Lesson 1")).toBeTruthy();

    // Check testID is present
    expect(getByTestId("video-card-1")).toBeTruthy();

    // Check duration is displayed
    expect(getByText("10:30")).toBeTruthy();
  });

  it("displays icon badge when icon prop is provided", () => {
    const dataWithIcon = { ...mockData, icon: "play-circle" };
    const { getByTestId } = renderWithProviders(<Card data={dataWithIcon} />);

    expect(getByTestId("video-card-1")).toBeTruthy();
  });
});
```

**Running tests**:
```bash
# Run all tests once
yarn test

# Run tests in watch mode (re-run on file changes)
yarn test:watch

# Run tests with coverage report
yarn test:coverage
```

**Test utilities**: Use `renderWithProviders` from `@/tests/test-utils` which wraps components with:
- React Native Paper ThemeProvider
- BottomSheetContext
- Translation provider (mocked)

**Requirements**:
- ✅ Test every component (both feature-specific and global)
- ✅ At minimum, test the happy path (success case)
- ✅ Use `testID` props for querying elements when needed
- ✅ Mock external dependencies (API calls, navigation, etc.)
- ⚠️ Edge cases and error states are optional but encouraged

## Code Organization Patterns

1. **Separation of concerns**: Route files handle routing only, business logic lives in screens
2. **Feature-based structure**: Each screen is self-contained with its own api, hooks, and components (types are either inline or in shared-types.ts)
3. **Component location**: Feature-specific components in `screens/{feature}/components/`, global components in `@components/`
4. **Context providers**: Global state and services managed via React Context (e.g., BottomSheetContext)
5. **TypeScript strict mode**: All code must pass strict type checking
6. **No native folders**: iOS and Android are generated (excluded from git)
7. **Translation-first**: All user-facing text uses `useTranslation()` hook with feature-prefixed keys
8. **RNP-default**: UI components built with React Native Paper unless custom components are necessary
9. **Test-first**: Every component has a happy path unit test in `__tests__/` directory alongside the component
