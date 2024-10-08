/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Inline, Stack } from '@atlaskit/primitives';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import { token } from '@atlaskit/tokens';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import DocQuickLinks from './doc-quick-links';
import ExampleQuickLinks from './example-quick-links';

const styles = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	"> div > [role='tablist']": {
		flexWrap: 'wrap',
		marginBlockEnd: '1rem',
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
	"> div > [role='tablist'] > [role='tab']": {
		color: token('color.link'),
	},
});

const LinkTabs = ({ tabs = [] }: { tabs: { name: string; content: any }[] }) => {
	return (
		<Stack space="space.100">
			<Inline alignInline="end" space="space.100">
				<DocQuickLinks />
				<ExampleQuickLinks />
			</Inline>
			<div css={styles}>
				<Tabs id="default">
					<TabList>
						{tabs.map(({ name }, idx: number) => (
							<Tab key={idx}>{name}</Tab>
						))}
					</TabList>
					{tabs.map(({ content }, idx: number) => (
						<TabPanel key={idx}>{content}</TabPanel>
					))}
				</Tabs>
			</div>
		</Stack>
	);
};

export default LinkTabs;
