/** @jsx jsx */

import { css, jsx } from '@emotion/react';

import { token } from '@atlaskit/tokens';

import {
	buttonWidthUnitless,
	cssVar,
	defaultTextPadding,
	maxTextWidth,
	maxTextWidthUnitless,
	textMarginLeft,
	textPaddingRight,
} from '../../../constants';

import type { SimpleTagProps } from './types';

interface ContentProps extends SimpleTagProps {
	isRemovable?: boolean;
}

const baseStyles = css({
	maxWidth: maxTextWidth,
	font: token('font.body'),
	overflow: 'hidden',
	paddingInlineEnd: defaultTextPadding,
	paddingInlineStart: defaultTextPadding,
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

const linkStyles = css({
	color: `var(${cssVar.color.text.link})`,
	pointerEvents: 'auto',
	textDecoration: 'none',

	'&:hover': {
		color: `var(${cssVar.color.text.hover})`,
		textDecoration: 'underline',
	},

	'&:active': {
		color: `var(${cssVar.color.text.active})`,
		textDecoration: 'underline',
	},

	'&:focus': {
		outline: 'none',
	},
});

const hasAfterStyles = css({
	maxWidth: `${maxTextWidthUnitless - buttonWidthUnitless}px`,
	// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
	paddingInlineEnd: textPaddingRight,
});

const hasBeforeStyles = css({
	// eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
	marginInlineStart: textMarginLeft,
});

const Content = ({
	elemBefore = null,
	isRemovable = true,
	text = '',
	color = 'standard',
	href,
	linkComponent,
}: ContentProps) => {
	const Link = linkComponent ?? 'a';

	if (href) {
		return (
			<Link
				href={href}
				data-color={color}
				css={[baseStyles, linkStyles, elemBefore && hasBeforeStyles, isRemovable && hasAfterStyles]}
			>
				{text}
			</Link>
		);
	} else {
		return (
			<span css={[baseStyles, elemBefore && hasBeforeStyles, isRemovable && hasAfterStyles]}>
				{text}
			</span>
		);
	}
};

// eslint-disable-next-line @repo/internal/react/require-jsdoc
export default Content;
