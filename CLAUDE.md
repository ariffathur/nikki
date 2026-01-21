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

## Code Organization Patterns

1. **Separation of concerns**: Route files handle routing only, business logic lives in screens
2. **Feature-based structure**: Each screen is self-contained with its own api, types, hooks, and components
3. **Shared components**: Keep reusable UI components in the root `components/` directory
4. **Context providers**: Global state and services managed via React Context (e.g., BottomSheetContext)
5. **TypeScript strict mode**: All code must pass strict type checking
6. **No native folders**: iOS and Android are generated (excluded from git)
