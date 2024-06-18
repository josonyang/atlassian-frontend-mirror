/**
 * @jsxRuntime classic
 */
/** @jsx jsx */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import Heading from '@atlaskit/heading';
import { token } from '@atlaskit/tokens';

import { Box, Inline, Stack, xcss } from '../src';

const spaceItems = [
	'space.0',
	'space.025',
	'space.050',
	'space.075',
	'space.100',
	'space.150',
	'space.200',
	'space.250',
	'space.300',
	'space.400',
	'space.500',
	'space.600',
	'space.800',
	'space.1000',
] as const;

const spaceValueStyles = css({ minWidth: token('space.1000', '80px') });
const blockStyles = xcss({ borderRadius: 'border.radius.050' });
const containerStyles = xcss({ width: 'size.300' });

export default () => (
	<Box testId="inline-example" padding="space.100">
		<Inline space="space.1000">
			<Stack space="space.100" testId="inline-space">
				<Heading level="h700">space</Heading>
				{spaceItems.map((space) => (
					<Inline>
						<span css={spaceValueStyles}>{space}</span>
						<Inline space={space}>
							<Box
								xcss={blockStyles}
								padding="space.200"
								backgroundColor="color.background.discovery.bold"
							/>
							<Box
								xcss={blockStyles}
								padding="space.200"
								backgroundColor="color.background.discovery.bold"
							/>
						</Inline>
					</Inline>
				))}
			</Stack>

			<Stack space="space.100" testId="inline-rowSpace">
				<Heading level="h700">rowSpace</Heading>
				{spaceItems.map((space) => (
					<Box xcss={containerStyles}>
						<Inline>
							<span css={spaceValueStyles}>{space}</span>
							<Inline rowSpace={space} shouldWrap>
								<Box
									xcss={blockStyles}
									padding="space.200"
									backgroundColor="color.background.discovery.bold"
								/>
								<Box
									xcss={blockStyles}
									padding="space.200"
									backgroundColor="color.background.discovery.bold"
								/>
							</Inline>
						</Inline>
					</Box>
				))}
			</Stack>
		</Inline>
	</Box>
);
