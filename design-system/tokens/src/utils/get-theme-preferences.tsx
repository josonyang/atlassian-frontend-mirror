import { getBooleanFF } from '@atlaskit/platform-feature-flags';

import { ThemeIdsWithOverrides, ThemeState } from '../theme-config';

export const getThemePreferences = (
  themeState: ThemeState,
): ThemeIdsWithOverrides[] => {
  const { colorMode, dark, light, shape, spacing, typography } = themeState;

  const themePreferences: ThemeIdsWithOverrides[] =
    colorMode === 'auto' ? [light, dark] : [themeState[colorMode]];

  // Replace light/dark theme with new palette if feature flag is on
  if (
    getBooleanFF('platform.design-system-team.saturated-palette-changes_asoro')
  ) {
    // Iterate over themePreferences and swap out light/dark with new palette
    themePreferences.forEach((themeId, index) => {
      if (themeId === 'light') {
        themePreferences[index] = 'light-saturated-palette-changes';
      }
      if (themeId === 'dark') {
        themePreferences[index] = 'dark-saturated-palette-changes';
      }
    });
  }

  [shape, spacing, typography].forEach((themeId) => {
    if (themeId) {
      themePreferences.push(themeId);
    }
  });

  return [...new Set(themePreferences)];
};

export const getThemeOverridePreferences = (
  themeState: ThemeState,
): ThemeIdsWithOverrides[] => {
  const { colorMode, dark, light } = themeState;

  const themeOverridePreferences: ThemeIdsWithOverrides[] = [];

  const themePreferences: ThemeIdsWithOverrides[] =
    colorMode === 'auto' ? [light, dark] : [themeState[colorMode]];

  if (getBooleanFF('platform.design-system-team.border-checkbox_nyoiu')) {
    themePreferences.includes('light') &&
      themeOverridePreferences.push('light-new-input-border');
    themePreferences.includes('dark') &&
      themeOverridePreferences.push('dark-new-input-border');
  }

  return [...new Set(themeOverridePreferences)];
};
