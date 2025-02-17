import React from 'react';

import Icon from '@atlaskit/icon';
import type { CustomGlyphProps, IconProps } from '@atlaskit/icon/types';

const ManualTriggerGlyph = (props: CustomGlyphProps) => (
	<svg
		width="24"
		viewBox="0 0 24 24"
		data-testid={props['data-testid']}
		aria-label={props['aria-label']}
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
		className={props.className}
	>
		<path
			d="m21.192 19.778-4.9498-4.9498c-0.3905-0.3905-1.0237-0.3905-1.4142 0-0.3905 0.3906-0.3905 1.0237 0 1.4143l4.9498 4.9497c0.3905 0.3905 1.0237 0.3905 1.4142 0s0.3905-1.0237 0-1.4142z"
			fill="currentColor"
		/>
		<path
			d="m8.7738 8.1319 11.685 4.305c0.2591 0.0955 0.3917 0.3829 0.2963 0.6421-0.025 0.0679-0.0645 0.1295-0.1156 0.1807l-7.3802 7.3801c-0.1952 0.1953-0.5118 0.1953-0.7071 0-0.0511-0.0512-0.0906-0.1128-0.1156-0.1807l-4.3051-11.685c-0.09546-0.25911 0.03721-0.54656 0.29632-0.64202 0.11157-0.0411 0.23414-0.0411 0.34571 0z"
			clipRule="evenodd"
			fill="currentColor"
			fillRule="evenodd"
		/>
		<path
			d="m4.2218 4.2218c1.9526-1.9526 5.1184-1.9526 7.0711 0 0.5977 0.59776 1.0125 1.3092 1.2443 2.0648 0.1974 0.6437-0.4389 1.1502-1.0873 0.96899l-0.2172-0.06069c-0.3475-0.09709-0.6037-0.38008-0.7563-0.70702-0.1439-0.30836-0.3432-0.59728-0.59773-0.85184-1.1716-1.1716-3.0711-1.1716-4.2426 0-1.1716 1.1716-1.1716 3.0711 0 4.2426 0.2547 0.25469 0.54381 0.45399 0.85236 0.59799 0.32725 0.1527 0.61051 0.4091 0.70752 0.7569l0.06045 0.2168c0.18082 0.6483-0.32561 1.2843-0.96914 1.087-0.75578-0.2317-1.4675-0.6466-2.0654-1.2445-1.9526-1.9526-1.9526-5.1184 0-7.071z"
			clipRule="evenodd"
			fill="currentColor"
			fillRule="evenodd"
		/>
	</svg>
);

/**
 * __ManualTriggerIcon__
 */
const ManualTriggerIcon = ({ label, primaryColor, secondaryColor, size, testId }: IconProps) => (
	<Icon
		label={label}
		primaryColor={primaryColor}
		secondaryColor={secondaryColor}
		size={size}
		testId={testId}
		glyph={ManualTriggerGlyph}
	/>
);

export default ManualTriggerIcon;
