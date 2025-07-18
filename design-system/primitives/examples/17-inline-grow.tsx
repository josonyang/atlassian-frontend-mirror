/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, Inline, Stack, xcss } from '@atlaskit/primitives';

const growItems = ['hug', 'fill'] as const;

const truncateStyles = css({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

const blockStyles = xcss({ borderRadius: 'border.radius.050' });

export default () => (
	<Stack testId="inline-example" space="space.100" alignInline="start">
		<Stack space="space.100">
			{growItems.map((grow) => (
				<Stack alignInline="center">
					{grow}
					<Box
						backgroundColor="color.background.neutral"
						style={{
							// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
							width: '200px',
						}}
					>
						<Inline grow={grow}>
							<Stack space="space.100" grow={grow}>
								<Box
									xcss={blockStyles}
									backgroundColor="color.background.discovery.bold"
									padding="space.200"
								/>
								<Box
									xcss={blockStyles}
									backgroundColor="color.background.discovery.bold"
									padding="space.200"
								/>
								<Box
									xcss={blockStyles}
									backgroundColor="color.background.discovery.bold"
									padding="space.200"
								/>
							</Stack>
						</Inline>
					</Box>
				</Stack>
			))}
		</Stack>

		<Stack space="space.100">
			width=100% enables truncation
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
			<Box backgroundColor="color.background.neutral" style={{ maxWidth: 200 }}>
				<Inline grow="fill">
					<Stack space="space.100" grow="fill">
						<span css={truncateStyles}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum
						</span>
					</Stack>
				</Inline>
			</Box>
		</Stack>
	</Stack>
);
