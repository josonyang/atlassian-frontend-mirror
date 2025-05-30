import React from 'react';

import { useThemeObserver } from '@atlaskit/tokens';

import { defaultLogoParams } from '../../constants';
import type { LogoProps } from '../../types';
import Wrapper from '../../wrapper';
import { getColorsFromAppearance } from '../utils';

const svg = ({ appearance, iconColor, textColor }: LogoProps, colorMode: string | undefined) => {
	let colors = {
		iconColor,
		textColor,
	};

	if (appearance) {
		colors = getColorsFromAppearance(appearance, colorMode);
	}
	return `<svg fill="none" height="32" viewBox="0 0 154 32" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="${colors.iconColor}" d="M11.78 28.127c-.785.578-1.198.537-1.983-.041-3.801-2.727-7.313-5.826-9.668-9.049-.248-.33-.124-.785.248-.991l4.297-2.686q.558-.372.991.124c1.653 1.9 3.264 3.76 5.124 5.082 1.859-1.322 3.47-3.181 5.123-5.082q.435-.495.992-.124l4.297 2.686c.371.206.495.66.247.991-2.355 3.223-5.867 6.322-9.668 9.09m-.99-11.857c3.388 0 6.197-2.768 6.197-6.156s-2.81-6.239-6.197-6.239-6.198 2.81-6.198 6.239c0 3.43 2.727 6.156 6.198 6.156"/>
      <path fill="${colors.textColor}" d="M146.689 12.293c-2.79 0-4.201 1.81-4.477 4.477h8.556c-.153-2.852-1.441-4.477-4.079-4.477m5.888 12.635c-1.257.674-3.189.92-4.753.92-5.735 0-8.249-3.312-8.249-8.004 0-4.631 2.576-7.943 7.237-7.943 4.723 0 6.624 3.281 6.624 7.943v1.196h-11.193c.368 2.606 2.054 4.293 5.673 4.293 1.779 0 3.281-.337 4.661-.828zM133.385 6.16c0-1.166.767-1.84 1.841-1.84s1.84.674 1.84 1.84-.767 1.84-1.84 1.84c-1.074 0-1.841-.675-1.841-1.84m.491 19.38V10.208h2.638v15.334zm-3.677-8.984v8.985h-2.638V16.28c0-2.76-1.104-3.987-3.618-3.987-2.454 0-4.14 1.625-4.14 4.723v8.525h-2.638V10.208h2.638v2.514c.981-1.81 2.79-2.821 4.845-2.821 3.527 0 5.551 2.423 5.551 6.655m-22.921-4.263c-2.791 0-4.201 1.81-4.477 4.477h8.556c-.154-2.852-1.442-4.477-4.079-4.477m5.888 12.635c-1.257.674-3.189.92-4.753.92-5.735 0-8.25-3.312-8.25-8.004 0-4.631 2.576-7.943 7.238-7.943 4.722 0 6.624 3.281 6.624 7.943v1.196h-11.194c.368 2.606 2.055 4.293 5.674 4.293 1.778 0 3.281-.337 4.661-.828zm-18.639-.614v-1.533c-.981 2.024-2.821 3.067-5.182 3.067-4.048 0-6.072-3.466-6.072-7.974 0-4.324 2.116-7.973 6.378-7.973 2.239 0 3.956 1.012 4.876 3.005v-2.698h2.576V24.16c0 4.508-2.116 7.544-7.605 7.544-2.576 0-3.987-.337-5.459-.828V28.3c1.687.552 3.435.92 5.336.92 3.834 0 5.152-2.055 5.152-4.907m-8.678-6.44c0 3.68 1.472 5.52 4.2 5.52 2.362 0 4.478-1.503 4.478-4.906V17.26c0-3.404-1.932-4.907-4.17-4.907-2.975 0-4.508 1.963-4.508 5.52m-4.703 3.497c0 2.545-1.656 4.477-5.765 4.477-2.3 0-4.17-.52-5.336-1.134v-2.79c1.319.766 3.527 1.502 5.459 1.502 2.024 0 3.066-.828 3.066-2.024 0-1.165-.89-1.84-3.802-2.545-3.404-.829-4.846-2.147-4.846-4.662 0-2.668 2.055-4.293 5.55-4.293 1.994 0 3.804.49 4.938 1.104v2.73c-1.84-.92-3.342-1.411-4.968-1.411-1.932 0-2.974.674-2.974 1.87 0 1.073.736 1.748 3.557 2.423 3.404.828 5.121 2.085 5.121 4.753m-16.274-3.496c0-3.68-1.472-5.52-4.202-5.52-2.36 0-4.477 1.503-4.477 4.907v1.227c0 3.404 1.932 4.906 4.17 4.906 2.975 0 4.509-1.962 4.509-5.52m-3.803 7.974c-2.239 0-3.956-1.013-4.876-3.006v8.679h-2.637V10.207h2.637v2.76c.981-2.024 2.821-3.066 5.183-3.066 4.079 0 6.133 3.465 6.133 7.973 0 4.324-2.147 7.973-6.44 7.973m-20.121 0c-6.225 0-9.721-4.293-9.721-10.426 0-6.072 3.496-10.335 9.721-10.335 6.195 0 9.69 4.263 9.69 10.335 0 6.133-3.495 10.426-9.69 10.426m0-18.124c-4.968 0-6.961 3.527-6.961 7.698 0 4.262 1.993 7.789 6.961 7.789 4.937 0 6.93-3.527 6.93-7.79 0-4.17-1.993-7.697-6.93-7.697" />
    </svg>`;
};

/**
 * __Opsgenie logo__
 *
 * The Opsgenie logo with both the wordmark and the icon combined.
 *
 * - [Examples](https://atlassian.design/components/logo/examples)
 * - [Code](https://atlassian.design/components/logo/code)
 * - [Usage](https://atlassian.design/components/logo/usage)
 *
 */
export const OpsgenieLogo = ({
	appearance,
	label = 'Opsgenie',
	size = defaultLogoParams.size,
	testId,
	textColor = defaultLogoParams.textColor,
	iconColor = defaultLogoParams.iconColor,
}: LogoProps) => {
	const { colorMode } = useThemeObserver();
	return (
		<Wrapper
			appearance={appearance}
			iconColor={iconColor}
			label={label}
			size={size}
			svg={svg(
				{
					appearance,
					iconColor,
					textColor,
				},
				colorMode,
			)}
			testId={testId}
			textColor={textColor}
		/>
	);
};
