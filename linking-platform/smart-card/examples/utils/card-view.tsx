/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { Fragment } from 'react';

import { css, jsx } from '@compiled/react';

import { type ProviderProps, SmartCardProvider } from '@atlaskit/link-provider';
import { Card, type CardProps } from '@atlaskit/smart-card';

export type CardViewProps = CardProps & Pick<ProviderProps, 'client'>;
// 	{
// 	appearance: CardProps['appearance'];
// 	client: ProviderProps['client'];
// 	frameStyle?: CardProps['frameStyle'];
// 	isSelected?: CardProps['isSelected'];
// 	url?: CardProps['url'];
// 	/**
// 	 * If this isn't specified, the card will only inherit the width of the parent and the height will be determined by the content.
// 	 * Enabling this is required to test card content overflow issues.
// 	 */
// 	inheritDimensions?: boolean;
// 	truncateInline?: boolean;
// };

const embedCardWrapperStyles = css({
	width: '100%',
	height: '100%',
	// .loader-wrapper override is required for inheritDimensions smart card prop (see docstring)
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors
	'.loader-wrapper': {
		height: '100%',
	},
});

/**
 * Wrapper that wraps the embed in a smaller container div when `inheritDimensions` enabled
 */
const EmbedCardWrapper = ({
	children,
	inheritDimensions,
}: {
	children: React.ReactNode;
	inheritDimensions: boolean | undefined;
}): JSX.Element =>
	inheritDimensions ? (
		<div css={embedCardWrapperStyles}>{children}</div>
	) : (
		<Fragment>{children}</Fragment>
	);

const CardView = ({
	appearance,
	client,
	frameStyle,
	isSelected,
	url = 'https://some.url',
	inheritDimensions,
	truncateInline,
	showHoverPreview,
	CompetitorPrompt,
}: CardViewProps) => (
	<SmartCardProvider client={client}>
		<EmbedCardWrapper inheritDimensions={inheritDimensions}>
			<Card
				appearance={appearance}
				url={url}
				/* Embed-specific props */
				frameStyle={frameStyle}
				isSelected={isSelected}
				inheritDimensions={inheritDimensions}
				truncateInline={truncateInline}
				showHoverPreview={showHoverPreview}
				CompetitorPrompt={CompetitorPrompt}
			/>
		</EmbedCardWrapper>
	</SmartCardProvider>
);

export default CardView;
