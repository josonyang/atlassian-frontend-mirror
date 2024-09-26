import React from 'react';

import Heading from '@atlaskit/heading';
import { Flex, Text, xcss } from '@atlaskit/primitives';
import { token } from '@atlaskit/tokens';

import {
	MockLinkPickerPromisePlugin,
	UnstableMockLinkPickerPlugin,
} from '../__tests__/__helpers/mock-plugins';

import { default as LinkPicker } from './index';

const NOOP = () => {};

const plugins = [
	new MockLinkPickerPromisePlugin({
		tabKey: 'confluence',
		tabTitle: 'Confluence',
	}),
	new MockLinkPickerPromisePlugin({
		tabKey: 'jira',
		tabTitle: 'Jira',
	}),
];

const createExample = (props?: Partial<React.ComponentProps<typeof LinkPicker>>) => {
	return () => (
		<div
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				border: '1px solid red',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				boxSizing: 'border-box',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				display: 'inline-block',
			}}
		>
			<LinkPicker onSubmit={NOOP} {...props} />
		</div>
	);
};

const createWidthExample = (props?: Partial<React.ComponentProps<typeof LinkPicker>>) => {
	return () => (
		<div
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				border: '1px solid red',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				boxSizing: 'border-box',
			}}
		>
			<LinkPicker onSubmit={NOOP} onCancel={NOOP} {...props} />
		</div>
	);
};

export const DefaultExample = createExample();
export const WithCancelExample = createExample({
	onCancel: NOOP,
});

export const DisableWidthExample = createWidthExample({
	plugins: undefined,
	disableWidth: true,
});

export const DisableWidthWithPluginsExample = createWidthExample({
	plugins,
	disableWidth: true,
});

export const DisableWidth500Example = () => {
	return (
		// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
		<div style={{ width: 500 }}>
			<h1>Width: 500</h1>
			<h2>Without plugins</h2>
			<DisableWidthExample />
			<h2>With plugins</h2>
			<DisableWidthWithPluginsExample />
		</div>
	);
};

export const DisableWidth300Example = () => {
	return (
		// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
		<div style={{ width: 300 }}>
			<h1>Width: 300</h1>
			<h2>Without plugins</h2>
			<DisableWidthExample />
			<h2>With plugins</h2>
			<DisableWidthWithPluginsExample />
		</div>
	);
};

export const ZeroPaddingExample = createExample({
	plugins,
	paddingLeft: '0',
	paddingRight: '0',
	paddingBottom: '0',
	paddingTop: '0',
});

export const LargePaddingUsingTokensExample = createExample({
	plugins,
	paddingLeft: token('space.400', '24px'),
	paddingRight: token('space.800', '48px'),
	paddingTop: token('space.200', '12px'),
	paddingBottom: token('space.300', '18px'),
});

export const VaryingPaddingsExample = createExample({
	plugins,
	paddingLeft: '5rem',
	paddingRight: '2rem',
	paddingTop: '3rem',
	paddingBottom: '4rem',
});

export const ErrorBoundaryExample = createExample({
	url: 112323 as any, // typecast to trigger an error
});

export const PluginErrorExample = createExample({
	plugins: [
		new UnstableMockLinkPickerPlugin({
			tabKey: 'tab2',
			tabTitle: 'Unstable',
		}),
	],
});

export const UnauthenticatedErrorExample = createExample({
	plugins: [
		new UnstableMockLinkPickerPlugin({
			tabKey: 'tab3',
			tabTitle: 'Unauth',
			errorFallback: (_, __) => null,
		}),
	],
});

const containerStyles = xcss({
	marginBlockStart: 'space.600',
	marginBlockEnd: 'space.600',
	textAlign: 'center',
});

const mockImageStyles = xcss({
	borderRadius: '50%',
	height: '120px',
	width: '120px',
	backgroundColor: 'color.background.information',
});

export const CustomEmptyStateExample = createExample({
	plugins: [
		{
			resolve: () =>
				Promise.resolve({
					data: [],
				}),
			emptyStateNoResults: () => (
				<Flex xcss={containerStyles} direction="column" alignItems="center" gap="space.300">
					<Flex direction="column" alignItems="center" gap="space.200">
						<Flex justifyContent="center">
							<Flex justifyContent="center" alignItems="center" xcss={mockImageStyles}>
								<Text>:)</Text>
							</Flex>
						</Flex>
						<Heading size="medium">Custom empty state</Heading>
						<Text as="p" color="color.text">
							Looks like you're new here
						</Text>
					</Flex>
				</Flex>
			),
		},
	],
});
export const CustomEmptyStateWithAdaptiveHeightExample = createExample({
	adaptiveHeight: true,
	plugins: [
		{
			resolve: () =>
				Promise.resolve({
					data: [],
				}),
			emptyStateNoResults: () => (
				<Flex xcss={containerStyles} direction="column" alignItems="center" gap="space.300">
					<Flex direction="column" alignItems="center" gap="space.200">
						<Flex justifyContent="center">
							<Flex justifyContent="center" alignItems="center" xcss={mockImageStyles}>
								<Text>:)</Text>
							</Flex>
						</Flex>
						<Heading size="medium">Custom empty state</Heading>
						<Text as="p" color="color.text">
							Looks like you're new here
						</Text>
					</Flex>
				</Flex>
			),
		},
	],
});
