import { token } from '@atlaskit/tokens';

export const flagTextColorToken: {
	error: 'var(--ds-text-inverse)';
	info: 'var(--ds-text-inverse)';
	normal: 'var(--ds-text)';
	success: 'var(--ds-text-inverse)';
	warning: 'var(--ds-text-warning-inverse)';
} = {
	error: token('color.text.inverse'),
	info: token('color.text.inverse'),
	normal: token('color.text'),
	success: token('color.text.inverse'),
	warning: token('color.text.warning.inverse'),
};
