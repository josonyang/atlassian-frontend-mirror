import React from 'react';

import Icon from '@atlaskit/icon';
import type { CustomGlyphProps, IconProps } from '@atlaskit/icon/types';

const DeleteIconGlyph = (props: CustomGlyphProps) => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		data-testid={props['data-testid']}
		aria-label={props['aria-label']}
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
		className={props.className}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.5 2.5C2.36739 2.5 2.24021 2.55268 2.14645 2.64645C2.05268 2.74021 2 2.86739 2 3V3.5H10V3C10 2.86739 9.94732 2.74021 9.85355 2.64645C9.75979 2.55268 9.63261 2.5 9.5 2.5H2.5ZM8.075 10H3.9225C3.80422 9.99997 3.68978 9.958 3.59952 9.88156C3.50926 9.80512 3.44902 9.69916 3.4295 9.5825L2.5 4H9.5L8.568 9.583C8.54847 9.69961 8.48821 9.80551 8.39794 9.88187C8.30767 9.95823 8.19323 10.0001 8.075 10V10ZM4.5 2.25C4.49999 2.18447 4.52571 2.12155 4.57163 2.0748C4.61754 2.02804 4.67998 2.00118 4.7455 2H7.2545C7.32002 2.00118 7.38246 2.02804 7.42837 2.0748C7.47429 2.12155 7.50001 2.18447 7.5 2.25V2.5H4.5V2.25Z"
			fill="currentColor"
		/>
	</svg>
);

/**
 * __DeleteIcon__
 */
const DeleteIcon = ({ label, primaryColor, secondaryColor, size, testId }: IconProps) => (
	<Icon
		label={label}
		primaryColor={primaryColor}
		secondaryColor={secondaryColor}
		size={size}
		testId={testId}
		glyph={DeleteIconGlyph}
	/>
);

export default DeleteIcon;
