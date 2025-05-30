import React from 'react';

import Heading, { HeadingContextProvider } from '@atlaskit/heading';
import { Box, Stack, Text } from '@atlaskit/primitives/compiled';

const Section = ({ size, children }: any) => (
	<HeadingContextProvider>
		<Box paddingInlineStart="space.100">
			<Stack space="space.100">
				<Heading size={size}>{size}</Heading>
				<Text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic adipisci, fuga perferendis
					nam neque doloribus velit eveniet? Distinctio explicabo autem est. Temporibus sunt non
					beatae quis minus rem deleniti repellat consequuntur laboriosam eius mollitia repudiandae.
				</Text>
				{children}
			</Stack>
		</Box>
	</HeadingContextProvider>
);

export default () => {
	return (
		<HeadingContextProvider>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<Box style={{ maxWidth: 850, margin: 'auto' }}>
				<Stack testId="headings" space="space.100">
					<Heading size="xxlarge">Heading xxlarge as H1</Heading>
					<Section size="xlarge">
						<Section size="large">
							<Section size="medium" />
						</Section>
						<Section size="large" />
					</Section>
					<Section size="medium">
						<Section size="large">
							<Section size="xlarge" />
						</Section>
					</Section>
				</Stack>
			</Box>
		</HeadingContextProvider>
	);
};
