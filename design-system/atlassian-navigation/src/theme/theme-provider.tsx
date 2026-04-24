import { type Provider } from 'react';

import { ThemeContext } from './theme-context';
import type { NavigationTheme } from './types';

/**
 * __Theme provider__
 *
 * A provider for the theme context used by all navigation components.
 */
export const ThemeProvider: Provider<NavigationTheme> = ThemeContext.Provider;

export { ThemeContext } from './theme-context';
