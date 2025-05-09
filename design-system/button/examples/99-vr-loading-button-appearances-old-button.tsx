/* eslint-disable @atlaskit/design-system/consistent-css-prop-usage */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { type Appearance, LoadingButton as Button } from '@atlaskit/button';
import { token } from '@atlaskit/tokens';

const appearances: Appearance[] = [
	'default',
	'primary',
	'link',
	'subtle',
	'subtle-link',
	'warning',
	'danger',
];

/**
 * For VR testing purposes we are overriding the animation timing
 * for both the fade-in and the rotating animations. This will
 * freeze the spinner, avoiding potential for VR test flakiness.
 */
const animationStyles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'svg, span': {
		animationDuration: '0s',
		animationTimingFunction: 'step-end',
	},
});

const Table = (props: React.HTMLProps<HTMLDivElement>) => (
	<div css={{ display: 'table' }}>{props.children}</div>
);
const Row = (props: React.HTMLProps<HTMLDivElement>) => (
	<div css={{ display: 'flex', flexWrap: 'wrap' }}>{props.children}</div>
);
const Cell = (props: React.HTMLProps<HTMLDivElement>) => (
	<div css={{ width: '100px', padding: `${token('space.050', '4px')} 0` }}>{props.children}</div>
);

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Example() {
	return (
		<div css={animationStyles}>
			<Table>
				{appearances.map((a) => (
					<Row key={a}>
						<Cell>
							<Button isLoading={true} appearance={a}>
								{capitalize(a)}
							</Button>
						</Cell>
						<Cell>
							<Button isLoading={true} appearance={a} isDisabled={true}>
								Disabled
							</Button>
						</Cell>
						<Cell>
							<Button isLoading={true} appearance={a} isSelected={true}>
								Selected
							</Button>
						</Cell>
					</Row>
				))}
			</Table>
		</div>
	);
}
