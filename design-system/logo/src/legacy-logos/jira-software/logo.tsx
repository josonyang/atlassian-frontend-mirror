import React from 'react';

import { useId } from '@atlaskit/ds-lib/use-id';
import { useThemeObserver } from '@atlaskit/tokens';

import { defaultLogoParams, legacyDefaultLogoParams } from '../../constants';
import type { LogoProps } from '../../types';
import Wrapper from '../../wrapper';
import { getColorsFromAppearanceOldLogos } from '../utils';

const svg = (
	{ appearance, iconColor, textColor }: LogoProps,
	colorMode: string | undefined,
	id: string,
) => {
	let colors: Partial<ReturnType<typeof getColorsFromAppearanceOldLogos>> = {
		iconGradientStart: legacyDefaultLogoParams.iconGradientStart,
		iconGradientStop: legacyDefaultLogoParams.iconGradientStart,
		iconColor,
		textColor,
	};

	if (appearance) {
		colors = getColorsFromAppearanceOldLogos(appearance, colorMode);
	}

	return `
  <svg viewBox="0 0 179 32" height="32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
    <defs>
      <linearGradient x1="97.6553341%" y1="35.6591143%" x2="37.202032%" y2="75.4891864%" id="${id}-1">
        <stop stop-color="${colors.iconGradientStart}" ${
					colors.iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : ''
				} offset="7%"></stop>
        <stop stop-color="${colors.iconGradientStop}" offset="100%"></stop>
      </linearGradient>
      <linearGradient x1="8.43371138%" y1="60.1495759%" x2="64.1161517%" y2="23.5790285%" id="${id}-2">
        <stop stop-color="${colors.iconGradientStart}" ${
					colors.iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : ''
				} offset="0%"></stop>
        <stop stop-color="${colors.iconGradientStop}" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g stroke="none" stroke-width="1" fill-rule="nonzero">
      <path fill="${
				colors.iconColor
			}" d="M11.3881081,27.9242105 C12.4881804,26.8071817 13.1062496,25.2917664 13.1062496,23.7115789 C13.1062496,22.1313915 12.4881804,20.6159762 11.3881081,19.4989474 L11.3881081,19.4989474 L3.74837838,11.7621053 L0.273513514,15.2926316 C-0.0900771727,15.6625064 -0.0900771727,16.2617042 0.273513514,16.6315789 L11.3881081,27.9242105 L11.3881081,27.9242105 Z" fill-rule="nonzero"></path>
      <path fill="${
				colors.iconColor
			}" d="M22.5027027,15.2926316 L11.3881081,4 L11.3881081,4 L11.3539189,4.03473684 L11.3539189,4.03473684 C9.08852466,6.36456187 9.09963243,10.1156459 11.3787838,12.4315789 L19.0247297,20.1652632 L22.5027027,16.6315789 C22.8662934,16.2617042 22.8662934,15.6625064 22.5027027,15.2926316 Z" fill-rule="nonzero"></path>
      <path d="M11.3881081,12.4252632 C9.10895676,10.1093301 9.09784899,6.35824608 11.3632432,4.02842105 L3.43445946,12.0810526 L7.58067568,16.2936842 L11.3881081,12.4252632 Z" fill="url(#${id}-1)" fill-rule="nonzero"></path>
      <path fill="url(#${id}-2)" d="M15.1893243,15.6368421 L11.3881081,19.4989474 C12.4881804,20.6159762 13.1062496,22.1313915 13.1062496,23.7115789 C13.1062496,25.2917664 12.4881804,26.8071817 11.3881081,27.9242105 L19.3355405,19.8494737 L15.1893243,15.6368421 Z" fill-rule="nonzero"></path>
      <path fill="${
				colors.textColor
			}" d="M36.07,18.956 C36.07,20.646 35.394,21.842 33.418,21.842 C32.56,21.842 31.702,21.686 31,21.4 L31,23.662 C31.65,23.896 32.586,24.104 33.808,24.104 C37.032,24.104 38.41,21.946 38.41,18.8 L38.41,6.918 L36.07,6.918 L36.07,18.956 Z M41.894,7.568 C41.894,8.556 42.544,9.128 43.454,9.128 C44.364,9.128 45.014,8.556 45.014,7.568 C45.014,6.58 44.364,6.008 43.454,6.008 C42.544,6.008 41.894,6.58 41.894,7.568 Z M42.31,24 L44.546,24 L44.546,11 L42.31,11 L42.31,24 Z M47.926,24 L50.11,24 L50.11,16.33 C50.11,13.574 51.852,12.716 54.712,13.002 L54.712,10.818 C52.164,10.662 50.864,11.754 50.11,13.288 L50.11,11 L47.926,11 L47.926,24 Z M65.45,24 L65.45,21.66 C64.618,23.376 63.058,24.26 61.056,24.26 C57.598,24.26 55.856,21.322 55.856,17.5 C55.856,13.834 57.676,10.74 61.316,10.74 C63.214,10.74 64.67,11.598 65.45,13.288 L65.45,11 L67.686,11 L67.686,24 L65.45,24 Z M58.092,17.5 C58.092,20.62 59.34,22.18 61.654,22.18 C63.656,22.18 65.45,20.906 65.45,18.02 L65.45,16.98 C65.45,14.094 63.812,12.82 61.914,12.82 C59.392,12.82 58.092,14.484 58.092,17.5 Z M86.926,19.294 C86.926,16.226 84.898,15.056 81.284,14.146 C78.268,13.392 77.176,12.69 77.176,11.286 C77.176,9.726 78.502,8.946 80.738,8.946 C82.506,8.946 84.352,9.258 86.068,10.246 L86.068,7.906 C84.898,7.256 83.312,6.658 80.842,6.658 C76.864,6.658 74.836,8.634 74.836,11.286 C74.836,14.094 76.552,15.42 80.4,16.356 C83.65,17.136 84.586,17.942 84.586,19.45 C84.586,20.958 83.624,21.972 81.05,21.972 C78.788,21.972 76.344,21.374 74.758,20.542 L74.758,22.934 C76.084,23.61 77.618,24.26 80.92,24.26 C85.158,24.26 86.926,22.258 86.926,19.294 Z M95.09,24.26 C91.19,24.26 88.902,21.374 88.902,17.474 C88.902,13.574 91.19,10.74 95.09,10.74 C98.964,10.74 101.226,13.574 101.226,17.474 C101.226,21.374 98.964,24.26 95.09,24.26 Z M95.09,12.82 C92.308,12.82 91.086,15.004 91.086,17.474 C91.086,19.944 92.308,22.18 95.09,22.18 C97.846,22.18 99.042,19.944 99.042,17.474 C99.042,15.004 97.846,12.82 95.09,12.82 Z M106.92,9.622 C106.92,8.452 107.596,7.646 108.974,7.646 C109.494,7.646 109.988,7.698 110.378,7.776 L110.378,5.722 C109.988,5.618 109.546,5.514 108.87,5.514 C106.088,5.514 104.736,7.152 104.736,9.57 L104.736,11 L102.63,11 L102.63,13.08 L104.736,13.08 L104.736,24 L106.92,24 L106.92,13.08 L110.274,13.08 L110.274,11 L106.92,11 L106.92,9.622 Z M115.786,19.892 L115.786,13.08 L119.244,13.08 L119.244,11 L115.786,11 L115.786,8.244 L113.602,8.244 L113.602,11 L111.496,11 L111.496,13.08 L113.602,13.08 L113.602,19.944 C113.602,22.362 114.954,24 117.736,24 C118.412,24 118.854,23.896 119.244,23.792 L119.244,21.634 C118.854,21.712 118.36,21.816 117.84,21.816 C116.462,21.816 115.786,21.036 115.786,19.892 Z M125.432,24 L128.292,24 L130.528,17.708 L131.724,13.704 L132.92,17.708 L135.156,24 L138.016,24 L142.8,11 L140.33,11 L136.586,22.024 L132.79,11 L130.658,11 L126.862,22.024 L123.118,11 L120.648,11 L125.432,24 Z M153.538,24 L153.538,21.66 C152.706,23.376 151.146,24.26 149.144,24.26 C145.686,24.26 143.944,21.322 143.944,17.5 C143.944,13.834 145.764,10.74 149.404,10.74 C151.302,10.74 152.758,11.598 153.538,13.288 L153.538,11 L155.774,11 L155.774,24 L153.538,24 Z M146.18,17.5 C146.18,20.62 147.428,22.18 149.742,22.18 C151.744,22.18 153.538,20.906 153.538,18.02 L153.538,16.98 C153.538,14.094 151.9,12.82 150.002,12.82 C147.48,12.82 146.18,14.484 146.18,17.5 Z M159.154,24 L161.338,24 L161.338,16.33 C161.338,13.574 163.08,12.716 165.94,13.002 L165.94,10.818 C163.392,10.662 162.092,11.754 161.338,13.288 L161.338,11 L159.154,11 L159.154,24 Z M178.108,23.48 C177.042,24.052 175.404,24.26 174.078,24.26 C169.216,24.26 167.084,21.452 167.084,17.474 C167.084,13.548 169.268,10.74 173.22,10.74 C177.224,10.74 178.836,13.522 178.836,17.474 L178.836,18.488 L169.346,18.488 C169.658,20.698 171.088,22.128 174.156,22.128 C175.664,22.128 176.938,21.842 178.108,21.426 L178.108,23.48 Z M173.116,12.768 C170.75,12.768 169.554,14.302 169.32,16.564 L176.574,16.564 C176.444,14.146 175.352,12.768 173.116,12.768 Z" fill-rule="evenodd"></path>
    </g>
  </svg>`;
};

// eslint-disable-next-line @repo/internal/deprecations/deprecation-ticket-required
/**
 * __Jira Software logo__
 *
 * The Jira Software logo with both the wordmark and the icon combined.
 *
 * - [Examples](https://atlassian.design/components/logo/examples)
 * - [Code](https://atlassian.design/components/logo/code)
 * - [Usage](https://atlassian.design/components/logo/usage)
 *
 * @deprecated JiraSoftwareLogo is deprecated and will be removed from atlaskit/logo in the next major release. Please use JiraLogo.
 */
export const JiraSoftwareLogo = ({
	appearance,
	label = 'Jira Software',
	size = defaultLogoParams.size,
	testId,
	iconColor = defaultLogoParams.iconColor,
	textColor = defaultLogoParams.textColor,
}: LogoProps) => {
	const { colorMode } = useThemeObserver();
	const id = useId();
	return (
		<Wrapper
			appearance={appearance}
			label={label}
			iconColor={iconColor}
			size={size}
			svg={svg(
				{
					appearance,
					iconColor,
					textColor,
				},
				colorMode,
				id,
			)}
			testId={testId}
			textColor={textColor}
		/>
	);
};
