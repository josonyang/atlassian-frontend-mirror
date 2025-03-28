import React from 'react';

import Grid, { GridItem } from '@atlaskit/grid';

import { SkeletonBox } from './shared/skeleton-box';

export default () => (
	<Grid>
		<GridItem span={{ sm: 6, md: 4 }}>
			<SkeletonBox>sm=6 md=4</SkeletonBox>
		</GridItem>
		<GridItem span={{ sm: 6, md: 4 }}>
			<SkeletonBox>sm=6 md=4</SkeletonBox>
		</GridItem>
		<GridItem span={{ md: 4 }}>
			<SkeletonBox>sm=12 md=4</SkeletonBox>
		</GridItem>
		<GridItem span={{ md: 6 }}>
			<SkeletonBox>sm=12 md=6</SkeletonBox>
		</GridItem>
		<GridItem span={{ md: 6 }}>
			<SkeletonBox>sm=12 md=6</SkeletonBox>
		</GridItem>
	</Grid>
);
