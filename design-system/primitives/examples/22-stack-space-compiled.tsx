/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';

import { cssMap } from '@atlaskit/css';
import { Box, Inline, Stack } from '@atlaskit/primitives/compiled';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
	container: { padding: token('space.100') },
	box: { borderRadius: token('border.radius.050'), padding: token('space.200') },
});

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

export default () => (
	<div data-testid="stack-example" css={styles.container}>
		<Inline space="space.100">
			{spaceItems.map((space) => (
				<Stack alignInline="center">
					{space}
					<Stack space={space}>
						<Box xcss={styles.box} backgroundColor="color.background.discovery.bold" />
						<Box xcss={styles.box} backgroundColor="color.background.discovery.bold" />
					</Stack>
				</Stack>
			))}
		</Inline>
	</div>
);
