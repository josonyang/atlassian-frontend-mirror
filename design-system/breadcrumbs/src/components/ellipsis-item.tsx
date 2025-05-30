/**
 * @jsxRuntime classic
 * @jsx jsx
 */

import { memo } from 'react';

import { css, jsx } from '@compiled/react';

import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';
import { token } from '@atlaskit/tokens';

import { type EllipsisItemProps } from '../types';

const noop = __noop;

const itemWrapperStyles = css({
	display: 'flex',
	boxSizing: 'border-box',
	maxWidth: '100%',
	height: `${24 / 14}em`,
	flexDirection: 'row',
	marginBlockEnd: token('space.0', '0px'),
	marginBlockStart: token('space.0', '0px'),
	marginInlineEnd: token('space.0', '0px'),
	marginInlineStart: token('space.0', '0px'),
	paddingBlockEnd: token('space.0', '0px'),
	paddingBlockStart: token('space.0', '0px'),
	paddingInlineEnd: token('space.0', '0px'),
	paddingInlineStart: token('space.0', '0px'),
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	'&:not(:last-child)::after': {
		width: token('space.100', '8px'),
		flexShrink: 0,
		content: '"/"',
		paddingBlock: token('space.025'),
		paddingInline: token('space.100'),
		textAlign: 'center',
	},
});

const staticItemStyles = css({
	// TODO: Replace fontWeight and lineHeight with "font: token('font.body')" and remove all the !important once Button is migrated to compiled
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-important-styles
	fontWeight: `${token('font.weight.regular')} !important`,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-important-styles, @atlaskit/design-system/use-tokens-typography
	lineHeight: `20px !important`,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-important-styles
	paddingBlock: `${token('space.025')} !important`,
});

const EllipsisItem = memo(({ label, onClick = noop, testId }: EllipsisItemProps) => (
	<li css={itemWrapperStyles}>
		<Button
			appearance="subtle-link"
			aria-label={label}
			css={staticItemStyles}
			onClick={onClick}
			spacing="none"
			testId={testId}
		>
			&hellip;
		</Button>
	</li>
));

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default EllipsisItem;
