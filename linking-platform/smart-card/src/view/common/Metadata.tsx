/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { N300 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

export interface MetadataProps {
	/* Text to be displayed at the bottom of a card - most often the provider name. */
	text: string;
	/* Icon to be displayed at the bottom of a card - most often the provider's logo. */
	icon?: React.ReactNode;
	iconUrl?: string;
	tooltip?: string;
}

const wrapperStyles = css({
	display: 'flex',
	alignItems: 'center',
	marginRight: token('space.050', '4px'),
});

const imgStyles = css({
	width: token('space.100', '8px'),
	height: token('space.100', '8px'),
});

const textStyles = css({
	font: token('font.body.UNSAFE_small'),
	color: `${token('color.text.subtlest', N300)}`,
	marginRight: token('space.050', '4px'),
	marginLeft: token('space.025', '2px'),
});

export const Metadata = ({ text, icon, iconUrl, tooltip }: MetadataProps) => {
	let metadataIcon = icon || null;

	if (!metadataIcon && iconUrl) {
		// eslint-disable-next-line jsx-a11y/alt-text
		metadataIcon = <img src={iconUrl} css={imgStyles} />;
	}

	const metadata = (
		<div css={wrapperStyles}>
			{metadataIcon}
			<span css={textStyles}>{text}</span>
		</div>
	);
	if (tooltip) {
		return <Tooltip content={tooltip}>{metadata}</Tooltip>;
	}

	return metadata;
};
