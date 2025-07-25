/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, cssMap, jsx } from '@compiled/react';
import type { MessageDescriptor } from 'react-intl-next';

import type { Prettify } from '@atlaskit/linking-common';
import { fg } from '@atlaskit/platform-feature-flags';
import { token } from '@atlaskit/tokens';

import type { MessageProps } from '../../../types';
import { getFormattedMessage } from '../../../utils';
import { type ElementProps } from '../../index';

const baseStyle = css({
	color: token('color.text.subtle'),
	font: token('font.body.small'),
	whiteSpace: 'normal',
	display: '-webkit-box',
	minWidth: 0,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	wordBreak: 'break-word',
	WebkitBoxOrient: 'vertical',
});

const fontOverrideStyleMap = cssMap({
	'font.body': {
		font: token('font.body'),
	},
	'font.body.large': {
		font: token('font.body.large'),
	},
	'font.body.small': {
		font: token('font.body.small'),
	},
	'font.body.UNSAFE_small': {
		font: token('font.body.UNSAFE_small'),
	},
});

export type BaseTextElementProps = ElementProps & {
	/**
	 * Determines the formatted message (i18n) to display.
	 * If this is provided and hideFormat is false, the content prop will not be displayed.
	 */
	message?: MessageProps;
	/**
	 * The raw text content to display.
	 */
	content?: string;
	/**
	 * The maximum number of lines the text should span over. Maximum is 2 unless its an error message.
	 */
	maxLines?: number;
	/**
	 * Determines whether the text formatting should be hidden when both message and content are provided.
	 * If true, content will be displayed instead of the formatted message.
	 */
	hideFormat?: boolean;
	/**
	 * Text color to override the default text color.
	 */
	color?: string;
	/**
	 * Override the default font size.
	 */
	fontSize?: Prettify<
		Extract<
			Parameters<typeof token>[0],
			'font.body' | 'font.body.large' | 'font.body.small' | 'font.body.UNSAFE_small'
		>
	>;
};

/**
 * A base element that displays some Text.
 * @internal
 * @param {TextProps} TextProps - The props necessary for the Text element.
 * @see Title
 */
export const BaseTextElement = ({
	content,
	maxLines = 1,
	message,
	name,
	className,
	testId = 'smart-element-text',
	hideFormat = false,
	color,
	fontSize,
}: BaseTextElementProps): JSX.Element | null => {
	if (!message && !content) {
		return null;
	}

	const dynamicCss = css({
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values
		WebkitLineClamp: maxLines,
		'@supports not (-webkit-line-clamp: 1)': {
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
			maxHeight: `calc(${maxLines} * 1rem)`,
		},
	});

	const formattedContent =
		hideFormat && content ? content : getFormattedMessage(message) || content;

	return (
		<span
			css={[
				baseStyle,
				fontSize !== undefined &&
					fg('bandicoots-smart-card-teamwork-context') &&
					fontOverrideStyleMap[fontSize],
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
				dynamicCss,
			]}
			style={{
				color,
			}}
			data-separator
			data-smart-element={name}
			data-smart-element-text
			data-testid={testId}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
			className={className}
		>
			{formattedContent}
		</span>
	);
};

export default BaseTextElement;

export const toFormattedTextProps = (
	descriptor: MessageDescriptor,
	context?: string,
): Partial<BaseTextElementProps> | undefined => {
	return context ? { message: { descriptor, values: { context } }, content: context } : undefined;
};

export const toTextProps = (content?: string): Partial<BaseTextElementProps> | undefined => {
	return content ? { content } : undefined;
};
