export default {
	meta: {
		access: 'granted',
		visibility: 'restricted',
		auth: [
			{
				key: 'figma',
				displayName: 'Atlassian Links - Figma',
				url: 'https://auth-url',
			},
		],
		definitionId: '19ec1155-f5d8-45d3-ab2a-3f4a3d9d060e',
		key: 'figma-object-provider',
		objectId: 'figma-id',
		resourceType: 'file',
		tenantId: 'figma-tenant',
		version: '1.1.4',
	},
	data: {
		url: 'https://figma-url/Flexible-Links?node-id=node-id',
		'@context': {
			'@vocab': 'https://www.w3.org/ns/activitystreams#',
			atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
			schema: 'http://schema.org/',
		},
		'@type': 'Document',
		name: 'Flexible Links',
		updated: '2021-12-14T05:07:13Z',
		image: {
			'@type': 'Image',
			url: 'https://image-url',
		},
		generator: {
			'@type': 'Application',
			name: 'Figma',
			icon: {
				'@type': 'Image',
				url: 'https://icon-url',
			},
		},
		preview: {
			'@type': 'Link',
			href: 'https://preview-url',
		},
	},
	entityData: {
		id: 'Figma',
		displayName: 'Flexible Links',
		url: 'https://figma-url/Flexible-Links?node-id=node-id',
		lastUpdatedAt: '2025-01-08T22:26:52.501Z',
		thumbnail: {
			externalUrl: 'https://image-url',
		},
		liveEmbedUrl: 'https://preview-url',
		type: 'FILE',
		inspectUrl: 'https://preview-url',
		iconUrl: 'https://icon-url',
	},
};
