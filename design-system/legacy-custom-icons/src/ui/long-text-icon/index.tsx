import React from 'react';

import Icon from '@atlaskit/icon';
import type { CustomGlyphProps, IconProps } from '@atlaskit/icon/types';

const LongTextIconGlyph = (props: CustomGlyphProps) => (
	<svg
		width="24"
		height="24"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		data-testid={props['data-testid']}
		aria-label={props['aria-label']}
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
		className={props.className}
	>
		<rect fill="currentColor" x="3" y="11" width="18" height="2" rx="1" />
	</svg>
);

/**
 * __LongTextIcon__
 */
const LongTextIcon = ({ label, primaryColor, secondaryColor, size, testId }: IconProps) => (
	<Icon
		label={label}
		primaryColor={primaryColor}
		secondaryColor={secondaryColor}
		size={size}
		testId={testId}
		glyph={LongTextIconGlyph}
	/>
);

export default LongTextIcon;
