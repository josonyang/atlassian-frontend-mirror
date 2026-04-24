import { useContext } from 'react';

import { ThemeContext } from './theme-context';
import type { NavigationTheme } from './types';

export const useTheme = (): NavigationTheme => useContext(ThemeContext);
