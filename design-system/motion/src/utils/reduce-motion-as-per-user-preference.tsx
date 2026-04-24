/**
 * Use for any CSS based motion (animation or transition).
 * Always put at the end of your declaration for correct use of the cascade.
 * Reduced motion preference is generally set through OS preferences/settings.
 *
 * @deprecated This is not fully compatible with Compiled CSS and will be removed in the future.
 * You should hardcode the `prefers-reduced-motion` media query in your file instead.
 */
export const reduceMotionAsPerUserPreference = {
	'@media (prefers-reduced-motion: reduce)': {
		animation: 'none',
		transition: 'none',
	},
} as const;
