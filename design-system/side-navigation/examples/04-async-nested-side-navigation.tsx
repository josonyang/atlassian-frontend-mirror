/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type FC, useEffect, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import AsyncIcon from '@atlaskit/icon/glyph/emoji/frequent';
import VidBackwardIcon from '@atlaskit/icon/glyph/vid-backward';

import {
	Footer,
	NavigationFooter,
	NavigationHeader,
	NestableNavigationContent,
	NestingItem,
	Section,
	SideNavigation,
	SkeletonItem,
} from '../src';

import AppFrame from './common/app-frame';
import { CustomItemFooter } from './common/sample-footer';
import SampleHeader from './common/sample-header';

let isLoaded: Record<string, boolean> = {};

const DelayedComponent: FC<{ id: number }> = ({ id }) => {
	// Because everything is always rendered we need to make sure async components
	// only load themselves once - else we will get a waterfall load which isn't great!
	const [showLoading, setShowLoading] = useState(!isLoaded[id]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoading(false);
			isLoaded[id] = true;
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [id]);

	return showLoading ? (
		<SkeletonItem hasIcon isShimmering />
	) : (
		<NestingItem title="Async Item" id={`${id}`} iconBefore={<AsyncIcon label="" />}>
			<Section title="Heading">
				<DelayedComponent id={id + 1} />
			</Section>
		</NestingItem>
	);
};

const BasicExample = () => {
	const [key, setKey] = useState(0);
	const reset = () => {
		isLoaded = {};
		setKey((prev) => prev + 1);
	};

	return (
		<AppFrame>
			<SideNavigation key={key} label="project" testId="side-navigation">
				<NavigationHeader>
					<SampleHeader />
				</NavigationHeader>
				<NestableNavigationContent>
					<Section>
						<DelayedComponent id={1} />
					</Section>
				</NestableNavigationContent>
				<NavigationFooter>
					<Footer
						iconBefore={<VidBackwardIcon label="" />}
						description="Will load everything again"
						component={CustomItemFooter}
						onClick={reset}
					>
						Reset
					</Footer>
				</NavigationFooter>
			</SideNavigation>
		</AppFrame>
	);
};

export default BasicExample;
