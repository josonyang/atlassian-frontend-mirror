/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { forwardRef } from 'react';

import { css, jsx } from '@compiled/react';

import NestIcon from '@atlaskit/icon/glyph/editor/number-list';
import { type CustomItemComponentProps } from '@atlaskit/menu';
import { G400 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import {
	ButtonItem,
	GoBackItem,
	NavigationHeader,
	NestableNavigationContent,
	NestingItem,
	SideNavigation,
} from '../src';

import AppFrame from './common/app-frame';
import SampleHeader from './common/sample-header';

const btnStyles = css({
	position: 'relative',
	overflow: 'hidden',
	userSelect: 'none',
	'&::before': {
		width: 3,
		position: 'absolute',
		backgroundColor: G400,
		content: '""',
		insetBlockEnd: 0,
		insetBlockStart: 0,
		insetInlineStart: 0,
		transform: 'translateX(-1px)',
		transition: 'transform 70ms ease-in-out',
	},

	'&:hover::before': {
		transform: 'translateX(0)',
	},
});

const containerStyles = css({
	width: '100%',
	color: G400,
	fontWeight: token('font.weight.bold'),
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

const customNestingItemStyles = css({
	// Need to increase specificity here until @atlaskit/menu has been migrated to @compiled/react
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors
	'&&': {
		color: token('color.text.success'),
		'&:hover': {
			backgroundColor: token('color.background.accent.green.subtle'),
			color: token('color.text.success'),
		},
		'&:active': {
			backgroundColor: token('color.background.accent.green.bolder'),
		},
	},
});

const CustomComponent = forwardRef((props: CustomItemComponentProps, ref) => {
	const { children, ...rest } = props;
	return (
		<button type="button" ref={ref} css={btnStyles} {...rest}>
			{children}
		</button>
	);
});

const CustomisedExample = () => {
	const innerLayer = (
		<NestingItem
			id="1-1"
			title={<div css={containerStyles}>Custom Title Component</div>}
			css={customNestingItemStyles}
			iconBefore={<NestIcon label="" />}
			// eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
			overrides={{
				GoBackItem: {
					render: (props) => <GoBackItem {...props}>Exit NestingItem 1-1</GoBackItem>,
				},
			}}
		>
			<ButtonItem>Initially Rendered</ButtonItem>
		</NestingItem>
	);

	const topLayer = (
		<NestingItem
			id="1"
			title="Styled using className"
			iconBefore={<NestIcon label="" />}
			css={customNestingItemStyles}
			// eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
			overrides={{
				GoBackItem: {
					render: (props) => <GoBackItem {...props}>Exit NestingItem 1</GoBackItem>,
				},
			}}
		>
			{innerLayer}
			<ButtonItem>Normal Button</ButtonItem>
		</NestingItem>
	);

	return (
		<AppFrame>
			<SideNavigation label="project" testId="side-navigation">
				<NavigationHeader>
					<SampleHeader />
				</NavigationHeader>
				<NestableNavigationContent
					// eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
					overrides={{
						GoBackItem: {
							render: (props) => <GoBackItem {...props}>Default Go Back</GoBackItem>,
						},
					}}
				>
					{topLayer}
					<NestingItem
						id="2"
						title="NestingItem 2"
						component={CustomComponent}
						iconBefore={<NestIcon label="" />}
					>
						<NestingItem id="2-1" title="NestingItem 2-1" iconBefore={<NestIcon label="" />}>
							<ButtonItem>2-1-Leaf</ButtonItem>
						</NestingItem>
						<NestingItem id="2-2" title="NestingItem 2-2" iconBefore={<NestIcon label="" />}>
							<ButtonItem>2-2-Leaf</ButtonItem>
						</NestingItem>
					</NestingItem>
				</NestableNavigationContent>
			</SideNavigation>
		</AppFrame>
	);
};

export default CustomisedExample;
