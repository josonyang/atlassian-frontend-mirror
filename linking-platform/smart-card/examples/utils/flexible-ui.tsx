import React from 'react';

import LikeIcon from '@atlaskit/icon/core/migration/thumbs-up--like';
import { type JsonLd } from '@atlaskit/json-ld-types';
import { type DatasourceResolveResponse } from '@atlaskit/link-client-extension';
import { type CardState, type CardType } from '@atlaskit/linking-common';

import { ActionName, ElementName } from '../../src';
import { SmartLinkStatus } from '../../src/constants';
import extractFlexibleUiContext from '../../src/extractors/flexible';
import { type FlexibleUiDataContext } from '../../src/state/flexible-ui-context/types';
import {
	type CustomActionItem,
	type NamedActionItem,
	type NamedDataActionItem,
} from '../../src/view/FlexibleCard/components/blocks/types';
import { ElementDisplaySchema } from '../../src/view/FlexibleCard/components/blocks/utils';

export const getJsonLdResponse = (url: string, meta = {}, data = {}) =>
	({
		meta: {
			visibility: 'public',
			access: 'granted',
			auth: [],
			definitionId: 'd1',
			key: 'object-provider',
			...meta,
		},

		data: {
			'@context': {
				'@vocab': 'https://www.w3.org/ns/activitystreams#',
				atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
				schema: 'http://schema.org/',
			},
			'@type': 'Object',
			name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			...data,
			url,
			'atlassian:ari': 'ari:cloud:platform:example',
		},
	}) as JsonLd.Response;

export interface GetCardStateProps {
	data?: any;
	meta?: Partial<JsonLd.Meta.BaseMeta>;
	datasources?: DatasourceResolveResponse[];
	status?: CardType;
}

export const getCardState = ({
	data = {},
	meta = {},
	datasources = undefined,
	status = 'resolved' as CardType,
}: GetCardStateProps = {}): CardState => ({
	status,
	details: {
		...getJsonLdResponse(data.url ? data.url : 'link-url', meta, {
			'@type': 'Object',
			generator: {
				'@type': 'Object',
				'@id': 'https://www.atlassian.com/#Confluence',
				name: 'Confluence',
			},
			url: 'link-url',
			name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non elementum augue. Donec porttitor purus ut lacus blandit, quis hendrerit turpis pharetra. Etiam commodo lorem metus, eu eleifend tellus mattis sed. Suspendisse potenti. Duis metus quam, lacinia dapibus faucibus quis, laoreet quis turpis. Curabitur iaculis suscipit ligula ac commodo. Cras in metus enim. Duis sit amet turpis suscipit, ultricies odio sit amet, bibendum sem. Nunc consectetur diam vel elit pulvinar posuere. Maecenas neque mauris, tempor nec dolor nec, mollis laoreet nibh. Fusce mauris ante, scelerisque in tristique ut, ultrices sed eros. Cras imperdiet tellus nisl, in efficitur nibh rhoncus eget.',
			...data,
		}),
		...(datasources ? { datasources } : {}),
	},
});

export const getContext = (
	override: Partial<FlexibleUiDataContext> = {},
): FlexibleUiDataContext => {
	const cardState = getCardState();
	const context = extractFlexibleUiContext({
		response: cardState.details,
		status: SmartLinkStatus.Resolved,
	});
	return {
		...context,
		...override,
	};
};

export const makeDeleteActionItem = (
	options: Pick<NamedActionItem, 'hideContent' | 'hideIcon' | 'testId'> = {},
): NamedActionItem => ({
	name: ActionName.DeleteAction,
	onClick: () => console.log('Delete action!'),
	...options,
});

export const makePreviewActionItem = (
	options: Pick<NamedActionItem, 'hideContent' | 'hideIcon' | 'testId'> = {},
): NamedDataActionItem => ({
	name: ActionName.PreviewAction,
	onClick: () => console.log('Preview action!'),
	...options,
});

export const makeDownloadActionItem = (
	options: Pick<NamedActionItem, 'hideContent' | 'hideIcon' | 'testId'> = {},
): NamedDataActionItem => ({
	name: ActionName.DownloadAction,
	onClick: () => console.log('Download action!'),
	...options,
});

export const makeEditActionItem = (
	options: Pick<NamedActionItem, 'hideContent' | 'hideIcon' | 'testId'> = {},
): NamedActionItem => ({
	name: ActionName.EditAction,
	onClick: () => console.log('Edit action!'),
	...options,
});

export const makeCustomActionItem = (
	options: Pick<CustomActionItem, 'icon' | 'content' | 'testId' | 'href' | 'ariaLabel'> = {},
): CustomActionItem => ({
	name: ActionName.CustomAction,
	onClick: () => console.log('Custom action!'),
	icon: <LikeIcon label="like" spacing="spacious" color="currentColor" />,
	iconPosition: 'before',
	content: 'Like',
	...options,
});

export const metadataElements = Object.values(ElementName).filter(
	(name) =>
		name !== ElementName.Title &&
		name !== ElementName.LinkIcon &&
		ElementDisplaySchema[name].includes('inline'),
);

export const actionNames: Exclude<ActionName, ActionName.CustomAction>[] = Object.values(
	ActionName,
).filter((name): name is Exclude<ActionName, ActionName.CustomAction> => {
	return name !== ActionName.CustomAction;
});
