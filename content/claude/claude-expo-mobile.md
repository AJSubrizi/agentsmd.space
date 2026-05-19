---
title: "CLAUDE.md for an Expo Mobile App"
slug: "claude-expo-mobile"
type: "CLAUDE.md"
description: "React Native + Expo Router app with TypeScript, EAS Build, and over-the-air updates."
agents: ["Claude Code"]
stack: ["Expo", "React Native", "TypeScript", "Expo Router"]
tags: ["mobile", "ios", "android", "react-native"]
useCase: "Mobile"
author: "community"
---

# CLAUDE.md

## Project

An Expo Router app targeting iOS and Android. TypeScript strict. EAS Build for native builds. EAS Update for OTA updates. State via Zustand for UI, TanStack Query for server data.

## Commands

- `pnpm install`
- `pnpm start` — Expo dev server
- `pnpm ios` — open iOS simulator
- `pnpm android` — open Android emulator
- `pnpm test` — Jest with `jest-expo`
- `pnpm typecheck`
- `eas build --profile development --platform ios` — make a dev client build
- `eas update --branch <name>` — ship an OTA update

## Code style

- TypeScript strict.
- Components use function declarations, not arrow expressions, for top-level exports.
- Always import from `react-native` or `expo-*` — never from `react-native-web` directly.
- File-system routing via Expo Router. Routes live in `app/`. File names match route names (`(tabs)`, `[id].tsx`, etc.).
- StyleSheet via `react-native` `StyleSheet.create` or `nativewind` (if installed). No inline style objects in hot paths.

## Stack rules

### Navigation

- Use `expo-router` exclusively. Don't import from `@react-navigation/native` directly.
- Stack, tab, and modal layouts go in `_layout.tsx` files.
- Use typed routes (`expo-router`'s `typedRoutes` experimental flag is on).

### Native modules

- Prefer Expo SDK modules over community packages where one exists.
- If adding a native module not in Expo, it must be supported by Expo's prebuild / config plugins. No "bare" workflow ejection.

### Data

- TanStack Query for all network state. Query keys centralized in `src/queries/keys.ts`.
- Persist auth tokens with `expo-secure-store`. Never `AsyncStorage` for secrets.

### Updates

- OTA updates ship JS/asset changes. Native changes require a new EAS Build.
- Use update channels matching environments: `production`, `staging`, `preview`.

## Before editing

1. Identify whether the change needs a new native build (Info.plist, AndroidManifest, native deps) or can ship as OTA.
2. Test on both iOS and Android — platform-specific issues are common.
3. Check `app.json` / `app.config.ts` before changing any config-plugin-touched setting.

## Constraints

- Do not eject. Stay on Expo's managed workflow.
- Do not commit native folders (`ios/`, `android/`) — they are generated.
- Do not use `Dimensions.get('window')` in render paths — use `useWindowDimensions()` for orientation-safe values.
- Avoid heavy animations on the JS thread. Use Reanimated worklets.
