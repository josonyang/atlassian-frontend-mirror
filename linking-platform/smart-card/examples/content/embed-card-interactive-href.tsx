import React, { useState } from 'react';

import Button from '@atlaskit/button/new';
import { SmartCardProvider } from '@atlaskit/link-provider';
import { Box, Inline, Stack } from '@atlaskit/primitives/compiled';

import {
	ResolvedClient,
	ResolvedClientEmbedInteractiveUrl,
} from '../../examples/utils/custom-client';
import { Card } from '../../src';

export default () => {
	const [embedIframeUrlType, setEmbedIframeUrlType] =
		useState<React.ComponentProps<typeof Card>['embedIframeUrlType']>('href');

	return (
		<SmartCardProvider client={new ResolvedClient('stg')}>
			<Box padding="space.100">
				<Stack space="space.100">
					<Inline space="space.100">
						<Button
							isDisabled={embedIframeUrlType === 'href'}
							onClick={() => setEmbedIframeUrlType('href')}
						>
							Default
						</Button>
						<Button
							isDisabled={embedIframeUrlType === 'interactiveHref'}
							onClick={() => setEmbedIframeUrlType('interactiveHref')}
						>
							Interactive
						</Button>
					</Inline>
					<Card
						appearance="embed"
						frameStyle="show"
						embedIframeUrlType={embedIframeUrlType}
						platform="web"
						url={ResolvedClientEmbedInteractiveUrl}
					/>
				</Stack>
			</Box>
		</SmartCardProvider>
	);
};
