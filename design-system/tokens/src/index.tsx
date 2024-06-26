export { default as themeConfig } from './theme-config';

export { default as token } from './get-token';
export { default as getTokenValue } from './get-token-value';
export { default as setGlobalTheme } from './set-global-theme';
export { default as enableGlobalTheme } from './enable-global-theme';
export { default as getThemeStyles } from './get-theme-styles';
export { default as getThemeHtmlAttrs } from './get-theme-html-attrs';
export { default as getSSRAutoScript } from './get-ssr-auto-script';
export { default as useThemeObserver } from './use-theme-observer';
export { default as ThemeMutationObserver } from './theme-mutation-observer';
export { default as getGlobalTheme } from './get-global-theme';
export { themeStringToObject, themeObjectToString } from './theme-state-transformer';

export type { CSSToken } from './artifacts/token-names';
export type { ActiveTokens } from './artifacts/types';
export type {
	ThemeColorModes,
	Themes,
	ThemeFileNames,
	ThemeIds,
	ThemeOptionsSchema,
	ThemeState,
	ActiveThemeState,
} from './theme-config';
export type {
	FontFamilyToken,
	FontWeightToken,
	Groups,
	OpacityToken,
	PaintToken,
	RawToken,
	ShadowToken,
	SpacingToken,
	ShapeToken,
	TypographyToken,
} from './types';
export { CURRENT_SURFACE_CSS_VAR } from './constants';
