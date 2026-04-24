import { CREATE_BREAKPOINT } from './constants';

export const actionSectionMobileCSS: {
	'@media (min-width: 1130px)': {
		display: string;
	};
} = {
	[`@media (min-width: ${CREATE_BREAKPOINT}px)`]: {
		display: 'none !important',
	},
};
