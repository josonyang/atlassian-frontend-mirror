/**
 * @jsxRuntime classic
 * @jsx jsx
 */
/**
 * Shared utilities for TagNew and AvatarTag components.
 * Note: CSS styles cannot be shared due to Compiled CSS static analysis requirements.
 */

// CSS variable names for dynamic color values
export const iconColorVar = '--ds-tag-icon';

export const borderTokenVar = '--tag-border-token';

export const iconTokenVar = '--tag-icon-token';

/**
 * Stable key so ExitingPersistence can match this child across the remove transition
 * (see ShrinkOut + ExitingPersistence docs in @atlaskit/motion).
 */
export const removableShrinkOutChildKey = 'atlaskit-tag-removable-shrink-out';
