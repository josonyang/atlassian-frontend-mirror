import React, { useState } from 'react';

import {
	AtlassianNavigation,
	Create,
	PrimaryButton,
	type PrimaryButtonProps,
	useOverflowStatus,
} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button/new';
import { ButtonItem } from '@atlaskit/menu';
import { token } from '@atlaskit/tokens';

const ResponsivePrimaryButton = (props: PrimaryButtonProps) => {
	const overflowStatus = useOverflowStatus();

	return overflowStatus.isVisible ? (
		<PrimaryButton>{props.children}</PrimaryButton>
	) : (
		<ButtonItem>{props.children}</ButtonItem>
	);
};

export default () => {
	const [items, setItems] = useState<JSX.Element[]>([]);

	const insertItems = () =>
		setItems([
			<ResponsivePrimaryButton>Explore</ResponsivePrimaryButton>,
			<ResponsivePrimaryButton>Projects</ResponsivePrimaryButton>,
			<ResponsivePrimaryButton>Dashboards</ResponsivePrimaryButton>,
			<ResponsivePrimaryButton>Apps</ResponsivePrimaryButton>,
			<ResponsivePrimaryButton>Plans</ResponsivePrimaryButton>,
		]);

	const insertSingleItem = () =>
		setItems([...items, <ResponsivePrimaryButton>Foo</ResponsivePrimaryButton>]);
	const clearItems = () => setItems([]);

	return (
		<>
			<AtlassianNavigation
				label="site"
				renderProductHome={() => null}
				renderCreate={() => <Create onClick={console.log} text="Create" />}
				primaryItems={items}
				moreLabel="More"
			/>
			<div
				style={{
					// TODO Delete this comment after verifying space token -> previous value `'20px'`
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					marginTop: token('space.250', '20px'),
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					textAlign: 'center',
				}}
			>
				<Button onClick={insertItems}>Insert 5</Button>
				<Button onClick={insertSingleItem}>Insert 1</Button>
				<Button onClick={clearItems}>Clear</Button>
			</div>
		</>
	);
};
