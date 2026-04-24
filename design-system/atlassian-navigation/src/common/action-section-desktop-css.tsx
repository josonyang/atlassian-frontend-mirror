import { CREATE_BREAKPOINT } from './constants';

export const actionSectionDesktopCSS: {
	'@media (max-width: 1129px)': {
		display: string;
	};
} = {
	[`@media (max-width: ${CREATE_BREAKPOINT - 1}px)`]: {
		display: 'none !important',
	},
};
