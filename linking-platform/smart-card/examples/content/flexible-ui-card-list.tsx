import React from 'react';

import { type JsonLd } from 'json-ld-types';

import { CardClient as Client, SmartCardProvider as Provider } from '@atlaskit/link-provider';
import { Grid } from '@atlaskit/primitives';

import { Card, ElementName, MetadataBlock, SmartLinkSize, TitleBlock } from '../../src';

import { response1, response2, response3 } from './example-responses';

const examples = {
	'https://examples/01': response2,
	'https://examples/02': response1,
	'https://examples/03': response3,
};

class CustomClient extends Client {
	fetchData(url: string) {
		return Promise.resolve(examples[url as keyof typeof examples] as JsonLd.Response);
	}
}

export default () => (
	<Provider client={new CustomClient('stg')}>
		<Grid columnGap="space.100" templateColumns="1fr 1fr 1fr">
			{Object.keys(examples).map((url: string, idx: number) => (
				<Card
					appearance="block"
					key={idx}
					url={url}
					ui={{
						clickableContainer: true,
						size: SmartLinkSize.Small,
					}}
				>
					<TitleBlock maxLines={1} />
					<MetadataBlock
						primary={[{ name: ElementName.AuthorGroup }]}
						secondary={[{ name: ElementName.ReactCount }, { name: ElementName.CommentCount }]}
					/>
					<MetadataBlock primary={[{ name: ElementName.CreatedOn }]} />
				</Card>
			))}
		</Grid>
	</Provider>
);
