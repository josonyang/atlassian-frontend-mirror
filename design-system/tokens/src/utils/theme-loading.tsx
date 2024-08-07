import { fg } from '@atlaskit/platform-feature-flags';

import themeImportMap from '../artifacts/theme-import-map';
import { CUSTOM_THEME_ATTRIBUTE, THEME_DATA_ATTRIBUTE } from '../constants';
import { type ThemeIdsWithOverrides } from '../theme-config';

export const loadAndAppendThemeCss = async (themeId: ThemeIdsWithOverrides) => {
	if (
		document.head.querySelector(
			`style[${THEME_DATA_ATTRIBUTE}="${themeId}"]:not([${CUSTOM_THEME_ATTRIBUTE}])`,
		)
	) {
		return;
	}

	// Gracefully handles falsy values like `null` and `undefined` when maker ignore TS
	// to avoid loading default themes.
	if (!themeId) {
		return;
	}

	const themeCss = await loadThemeCss(themeId);

	const style = document.createElement('style');
	style.textContent = themeCss;
	style.dataset.theme = themeId;
	document.head.appendChild(style);
};

export const loadThemeCss = async (themeId: ThemeIdsWithOverrides) => {
	if ((themeId === 'light' || themeId === 'dark') && fg('platform-component-visual-refresh')) {
		themeId += '-brand-refresh';
	}
	const { default: themeCss } = await themeImportMap[themeId]();

	return themeCss;
};

export const darkModeMediaQuery = '(prefers-color-scheme: dark)';
export const moreContrastMediaQuery = '(prefers-contrast: more)';
