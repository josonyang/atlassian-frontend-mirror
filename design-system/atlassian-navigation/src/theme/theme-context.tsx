import { type Context, createContext } from 'react';

import { defaultTheme } from './themes';
import type { NavigationTheme } from './types';

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export const ThemeContext: Context<NavigationTheme> = createContext(defaultTheme);
