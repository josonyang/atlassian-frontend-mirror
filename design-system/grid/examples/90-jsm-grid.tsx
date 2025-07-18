/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, jsx } from '@compiled/react';

import Grid, { GridItem } from '@atlaskit/grid';
import Heading, { HeadingContextProvider } from '@atlaskit/heading';
import { JiraServiceManagementLogo } from '@atlaskit/logo';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, Inline, Stack } from '@atlaskit/primitives';
import Textfield from '@atlaskit/textfield';
import { token, useThemeObserver } from '@atlaskit/tokens';

import JSMCard from './91-jsm-card';
import JSMConfigCard from './92-jsm-config-card';
import SecondaryCard from './93-jsm-secondary-card';
import IconLink from './95-icon-link';

const responsiveWidthSearchStyles = css({
	minWidth: '100%',
});

const dynamicSizedVerticalPaddingStyles = css({
	justifyContent: 'center',
	paddingBlock: `calc(${token('space.200', '16px')} * 2)`,
	// eslint-disable-next-line @atlaskit/design-system/no-nested-styles
	'@media (min-width: 30rem)': {
		paddingBlock: `calc(${token('space.300', '24px')} * 2)`,
	},
	// eslint-disable-next-line @atlaskit/design-system/no-nested-styles
	'@media (min-width: 48rem)': {
		paddingBlock: `calc(${token('space.400', '32px')} * 2)`,
	},
	// eslint-disable-next-line @atlaskit/design-system/no-nested-styles
	'@media (min-width: 64rem)': {
		paddingBlock: `calc(${token('space.400', '32px')} * 2)`,
	},
	// eslint-disable-next-line @atlaskit/design-system/no-nested-styles
	'@media (min-width: 90rem)': {
		paddingBlock: `calc(${token('space.500', '40px')} * 2)`,
	},
});

const JSMGrid = () => {
	const { colorMode: theme } = useThemeObserver();
	return (
		<HeadingContextProvider>
			<Box
				style={{
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					background:
						'linear-gradient(180deg, #0C2759 0%, rgba(12, 39, 89, 0) 77.57%), url(./img/jsm.png)',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					backgroundSize: 'cover, 1440px',
				}}
			>
				{/* Nav */}
				<Box paddingBlock="space.300" paddingInline="space.400">
					<JiraServiceManagementLogo appearance={theme === 'dark' ? 'brand' : 'inverse'} />
				</Box>
				{/* Search */}
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
				<Box paddingBlock="space.1000" style={{ paddingBlockEnd: 144 }}>
					<Grid maxWidth="wide">
						<GridItem start={{ md: 3 }} span={{ md: 8 }}>
							<Stack space="space.200" alignInline="center">
								<Heading size="large" color="color.text.inverse">
									Welcome to the Internal Help Center
								</Heading>
								<Textfield
									css={responsiveWidthSearchStyles}
									placeholder="Find help and services"
									type="search"
								/>
							</Stack>
						</GridItem>
					</Grid>
				</Box>
			</Box>
			<div css={dynamicSizedVerticalPaddingStyles}>
				<Stack space="space.800">
					<Grid maxWidth="wide">
						<GridItem span={{ sm: 6, md: 4 }}>
							<Stack space="space.300">
								<JSMConfigCard title="Design Collection">
									<IconLink>Join Figma support slack channel</IconLink>
									<IconLink>Join Figma support slack channel</IconLink>
								</JSMConfigCard>
								<JSMConfigCard title="Covid Updates" />
							</Stack>
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<Stack space="space.300">
								<JSMConfigCard title="New hire basics" />
								<JSMConfigCard title="Payroll">
									<IconLink>Join Figma support slack channel</IconLink>
									<IconLink>Request for laptop exchange</IconLink>
								</JSMConfigCard>
							</Stack>
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMConfigCard title="Infra Management" />
						</GridItem>
					</Grid>
					<Grid maxWidth="wide">
						<GridItem>
							<Inline spread="space-between" space="space.0">
								<Heading size="xlarge" as="h2">
									Featured service desks
								</Heading>
							</Inline>
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard iconColor="color.background.information.bold" title="Onboarding" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard iconColor="color.background.brand.bold" title="HR Service Desk" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard title="Travel Service desk" iconColor="color.background.information" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard iconColor="color.background.danger.bold" title="SWAGs" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard iconColor="color.background.warning.bold" title="IT Support" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard title="IT Operations" iconColor="color.background.discovery" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard iconColor="color.background.discovery.bold" title="Sales Ops" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard title="Customer Support" iconColor="color.background.neutral.bold" />
						</GridItem>
						<GridItem span={{ sm: 6, md: 4 }}>
							<JSMCard title="Financial Month End" iconColor="color.background.danger" />
						</GridItem>
					</Grid>
					<Grid maxWidth="wide">
						<GridItem>
							<Inline spread="space-between" space="space.0">
								<Heading size="xlarge" as="h2">
									Recently used forms
								</Heading>
							</Inline>
						</GridItem>
						<GridItem span={{ sm: 4 }}>
							<SecondaryCard />
						</GridItem>
						<GridItem span={{ sm: 4 }}>
							<SecondaryCard />
						</GridItem>
						<GridItem span={{ sm: 4 }}>
							<SecondaryCard />
						</GridItem>
					</Grid>
				</Stack>
			</div>
		</HeadingContextProvider>
	);
};

export default JSMGrid;
