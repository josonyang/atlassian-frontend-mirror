import React from 'react';

import Icon from '@atlaskit/icon';
import type { CustomGlyphProps, IconProps } from '@atlaskit/icon/types';

const ComponentIconGlyph = (props: CustomGlyphProps) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
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
			d="M5 17.991c0 .007 14.005.009 14.005.009-.006 0-.005-7.991-.005-7.991C19 10.002 4.995 10 4.995 10 5.001 10 5 17.991 5 17.991ZM3 10.01C3 8.899 3.893 8 4.995 8h14.01C20.107 8 21 8.902 21 10.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 0 1 3 17.991V10.01Z"
			fill="currentColor"
		/>
		<path
			d="M7 8.335c0-.002 2.002-.002 2.002-.002C9 8.333 9 6.665 9 6.665c0 .002-2.002.002-2.002.002C7 6.667 7 8.335 7 8.335Zm-2-1.67C5 5.745 5.898 5 6.998 5h2.004C10.106 5 11 5.749 11 6.665v1.67C11 9.255 10.102 10 9.002 10H6.998C5.894 10 5 9.251 5 8.335v-1.67Zm10 1.67c0-.002 2.002-.002 2.002-.002C17 8.333 17 6.665 17 6.665c0 .002-2.002.002-2.002.002.002 0 .002 1.668.002 1.668Zm-2-1.67C13 5.745 13.898 5 14.998 5h2.004C18.106 5 19 5.749 19 6.665v1.67c0 .92-.898 1.665-1.998 1.665h-2.004C13.894 10 13 9.251 13 8.335v-1.67Z"
			fill="currentColor"
		/>
	</svg>
);

/**
 * __ComponentIcon__
 */
const ComponentIcon = ({ label, primaryColor, secondaryColor, size, testId }: IconProps) => (
	<Icon
		label={label}
		primaryColor={primaryColor}
		secondaryColor={secondaryColor}
		size={size}
		testId={testId}
		glyph={ComponentIconGlyph}
	/>
);

export default ComponentIcon;
