// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { type CSSObject } from '@emotion/react';

import { type ThemeModes } from '@atlaskit/theme/types';

import { type BaseProps } from '../types';

export type ThemeTokens = {
	buttonStyles: CSSObject;
	spinnerStyles: CSSObject;
};

export type InteractionState =
	| 'disabled'
	| 'focusSelected'
	| 'selected'
	| 'active'
	| 'hover'
	| 'focus'
	| 'default';

export type CustomThemeButtonOwnProps = {
	/* Conditionally show a spinner over the top of a button */
	isLoading?: boolean;
	/**
	 * Slow + discouraged custom theme API
	 * See custom theme guide for usage details
	 */
	// eslint-disable-next-line @repo/internal/react/consistent-props-definitions
	theme?: (current: (props: ThemeProps) => ThemeTokens, props: ThemeProps) => ThemeTokens;
};

export type CustomThemeButtonProps = Omit<BaseProps, 'overlay'> & CustomThemeButtonOwnProps;

export type ThemeProps = Partial<CustomThemeButtonProps> & {
	state: InteractionState;
	// eslint-disable-next-line @repo/internal/react/boolean-prop-naming-convention
	iconIsOnlyChild?: boolean;
	mode?: ThemeModes;
};
