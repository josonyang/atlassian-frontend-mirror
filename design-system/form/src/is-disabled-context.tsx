import React, { createContext } from 'react';

/**
 * __Is disabled context__
 *
 * An is disabled context creates the context for when a value is disabled.
 */
export const IsDisabledContext: React.Context<boolean> = createContext(false);
