import React from 'react';

import { useThemeObserver } from '@atlaskit/tokens';

import { defaultLogoParams } from '../../constants';
import type { LogoProps } from '../../types';
import Wrapper from '../../wrapper';
import { getColorsFromAppearance } from '../utils';

const svg = ({ appearance, iconColor }: LogoProps, colorMode: string | undefined) => {
	let colors = {
		iconColor,
	};

	if (appearance) {
		colors = getColorsFromAppearance(appearance, colorMode);
	}
	return `<svg fill="none" height="32" viewBox="0 0 32 32" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill=${colors.iconColor} d="m25.586 15.819-1.618 9.885c-.106.598-.528.95-1.126.95H9.122c-.598 0-1.02-.352-1.126-.95L5.146 8.08c-.105-.598.212-.985.775-.985h20.123c.562 0 .88.387.773.985l-.773 4.644c-.106.668-.493.95-1.126.95H12.816c-.176 0-.282.105-.246.316l.95 5.84c.035.14.14.246.281.246h4.362c.141 0 .246-.105.282-.246l.668-4.222c.07-.527.422-.738.915-.738h4.75c.703 0 .914.351.808.95"/>
    </svg>`;
};

/**
 * __Bitbucket icon__
 *
 * The Bitbucket icon without an accompanying wordmark.
 *
 * - [Examples](https://atlassian.design/components/logo/examples)
 * - [Code](https://atlassian.design/components/logo/code)
 * - [Usage](https://atlassian.design/components/logo/usage)
 */
export const BitbucketIcon = ({
	appearance,
	label = 'Bitbucket',
	size = defaultLogoParams.size,
	testId,
	iconColor = defaultLogoParams.iconColor,
	textColor = defaultLogoParams.textColor,
}: LogoProps) => {
	const { colorMode } = useThemeObserver();
	return (
		<Wrapper
			appearance={appearance}
			label={label}
			svg={svg(
				{
					appearance,
					iconColor,
				},
				colorMode,
			)}
			iconColor={iconColor}
			size={size}
			testId={testId}
			textColor={textColor}
		/>
	);
};
