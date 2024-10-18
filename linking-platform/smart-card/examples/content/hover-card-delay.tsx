import { SmartCardProvider } from '@atlaskit/link-provider';
import { Grid } from '@atlaskit/primitives';
import React from 'react';
import { IntlProvider } from 'react-intl-next';
import { ResolvedClient, ResolvedClientEmbedUrl } from '../../examples/utils/custom-client';
import { HoverCard } from '../../src/hoverCard';
import HoverOverMe from '../utils/hover-card-box';

export default () => (
	<IntlProvider locale="en">
		<SmartCardProvider client={new ResolvedClient('stg')}>
			<Grid gap="space.100" templateColumns="1fr 1fr 1fr">
				<HoverCard hoverPreviewOptions={{ fadeInDelay: 0 }} url={ResolvedClientEmbedUrl}>
					<HoverOverMe content="Immediate" />
				</HoverCard>
				<HoverCard url={ResolvedClientEmbedUrl}>
					<HoverOverMe content="Default" />
				</HoverCard>
				<HoverCard hoverPreviewOptions={{ fadeInDelay: 1000 }} url={ResolvedClientEmbedUrl}>
					<HoverOverMe content="1,000 ms delay" />
				</HoverCard>
			</Grid>
		</SmartCardProvider>
	</IntlProvider>
);
