/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Fragment, type ReactNode } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { Y75 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import VisuallyHidden from '@atlaskit/visually-hidden';

const decoration = css({
	// Required as otherwise the following bidi characters cause the span
	// to not receive hover events.
	//
	// U+2066 LEFT-TO-RIGHT ISOLATE (when using pseudo element before)
	// U+202E RIGHT-TO-LEFT OVERRIDE' (when using pseudo element after)
	position: 'relative',

	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	':before': {
		display: 'inline-flex',
		padding: `${token('space.0', '0px')} ${token('space.050', '4px')}`,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		background: token('color.background.warning', Y75),
		color: token('color.text.warning', '#7F5F01'),
		content: '"<"attr(data-bidi-character-code)">"',
		font: token('font.body'),
		fontFamily: token('font.family.code'),
		fontStyle: 'normal',
		// eslint-disable-next-line @atlaskit/design-system/use-tokens-typography
		lineHeight: '18px',
		/**
		 * Ensures the decoration receives pointer events when it occurs with
		 * an ancestor that disables them.
		 */
		pointerEvents: 'auto',
	},

	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	':hover:before': {
		background: token('color.background.warning.hovered', Y75),
		color: token('color.text.warning', '#533F04'),
	},
});

export function Decorator({
	bidiCharacter,
	children,
	testId,
}: {
	bidiCharacter: string;
	children: ReactNode;
	testId?: string;
}) {
	const bidiCharacterCode = getBidiCharacterCode(bidiCharacter);
	return (
		<Fragment>
			<span
				css={decoration}
				data-testid={testId}
				data-bidi-character-code={bidiCharacterCode}
				// This is set to true so that the content is not read out by
				// screen readers as the content includes angle brackets for
				// visual decoration purposes.
				// We use a visually hidden `mark` element below for screen readers
				aria-hidden="true"
			>
				{children}
			</span>
			<VisuallyHidden testId={testId && `${testId}--visually-hidden`}>
				<mark>{bidiCharacterCode}</mark>
			</VisuallyHidden>
		</Fragment>
	);
}

function getBidiCharacterCode(bidiCharacter: string) {
	const bidiCharacterCode = bidiCharacter.codePointAt(0)?.toString(16);

	return `U+${bidiCharacterCode}`;
}
