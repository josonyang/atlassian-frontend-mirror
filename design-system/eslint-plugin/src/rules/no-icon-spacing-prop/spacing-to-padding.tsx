/**
 * Padding token mapping based on icon size and spacing value.
 * Same mapping as the codemod `icon-spacing-to-box-primitive`.
 */
export const SPACING_TO_PADDING: Record<string, Record<string, string>> = {
	medium: { compact: 'space.050', spacious: 'space.050' },
	small: { compact: 'space.025', spacious: 'space.075' },
};
