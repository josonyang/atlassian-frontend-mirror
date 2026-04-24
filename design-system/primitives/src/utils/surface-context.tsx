import { type Context, createContext } from 'react';

import type { BackgroundColorToken } from './types';

/**
 * __Surface context__
 *
 * A surface context provides context information on the current background (if set).
 */
export const SurfaceContext: Context<BackgroundColorToken> =
	createContext<BackgroundColorToken>('elevation.surface');
