import React from 'react';

import type { FlagAPI } from './flag-provider';

/**
 * Context holding the flag API. Extracted into its own leaf module so that
 * `flag-provider`, `flags-provider` and `use-flags` can all depend on it
 * without creating an import cycle.
 */
export const FlagContext: React.Context<FlagAPI | null> = React.createContext<FlagAPI | null>(null);
