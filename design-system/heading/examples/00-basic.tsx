import React from 'react';

import { Grid, Stack } from '@atlaskit/primitives';

import Heading from '../src';

export default () => {
	return (
		<Grid templateColumns="1fr 1fr" gap="space.100">
			<Stack testId="headings" space="space.100">
				<Heading level="h900">h900</Heading>
				<Heading level="h800">h800</Heading>
				<Heading level="h700">h700</Heading>
				<Heading level="h600">h600</Heading>
				<Heading level="h500">h500</Heading>
				<Heading level="h400">h400</Heading>
				<Heading level="h300">h300</Heading>
				<Heading level="h200">h200</Heading>
				<Heading level="h100">h100</Heading>
			</Stack>
			<Stack testId="headings" space="space.100">
				<Heading size="xxlarge">xxlarge</Heading>
				<Heading size="xlarge">xlarge</Heading>
				<Heading size="large">large</Heading>
				<Heading size="medium">medium</Heading>
				<Heading size="small">small</Heading>
				<Heading size="xsmall">xsmall</Heading>
				<Heading size="xxsmall">xxsmall</Heading>
			</Stack>
		</Grid>
	);
};
