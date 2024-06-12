import React, { forwardRef } from 'react';

import Heading from '@atlaskit/heading';
import { Box, Inline, Stack, Text, xcss } from '@atlaskit/primitives';

import { getAppearanceIconStyles } from './internal/appearance-icon';
import type { SectionMessageProps } from './types';

const sectionMessageStyles = xcss({
	wordBreak: 'break-word',
	borderRadius: 'border.radius',
});

const bleedStyles = xcss({
	display: 'flex',
	marginBlock: 'space.negative.025',
});

/**
 * __Section message__
 *
 * A section message is used to alert users to a particular section of the screen.
 *
 * - [Examples](https://atlassian.design/components/section-message/examples)
 * - [Code](https://atlassian.design/components/section-message/code)
 * - [Usage](https://atlassian.design/components/section-message/usage)
 */
const SectionMessage = forwardRef<HTMLElement, SectionMessageProps>(function SectionMessage(
	{ children, appearance = 'information', actions, title, icon, testId },
	ref,
) {
	const {
		primaryIconColor: primaryColor,
		backgroundColor: secondaryColor,
		Icon,
	} = getAppearanceIconStyles(appearance, icon);

	const actionElements =
		actions && (actions as React.ReactElement).type === React.Fragment
			? (actions as React.ReactElement).props.children
			: actions;
	const actionsArray = React.Children.toArray(actionElements);

	return (
		<Box
			as="section"
			backgroundColor={appearanceMap[appearance]}
			padding="space.200"
			testId={testId}
			ref={ref}
			xcss={sectionMessageStyles}
		>
			<Inline space="space.200" alignBlock="stretch">
				<Box xcss={bleedStyles}>
					<Icon size="medium" primaryColor={primaryColor} secondaryColor={secondaryColor} />
				</Box>
				<Stack space="space.100" testId={testId && `${testId}--content`}>
					{!!title && (
						<Heading as="h2" level="h500">
							{title}
						</Heading>
					)}
					<Text>{children}</Text>
					{actionsArray.length > 0 && (
						<Inline
							shouldWrap
							testId={testId && `${testId}--actions`}
							separator="·"
							space="space.100"
							rowSpace="space.0"
						>
							{actionsArray}
						</Inline>
					)}
				</Stack>
			</Inline>
		</Box>
	);
});

const appearanceMap = {
	information: 'color.background.information',
	warning: 'color.background.warning',
	error: 'color.background.danger',
	success: 'color.background.success',
	discovery: 'color.background.discovery',
} as const;

SectionMessage.displayName = 'SectionMessage';

export default SectionMessage;
