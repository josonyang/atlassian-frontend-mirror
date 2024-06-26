import type { ADFEntity } from '@atlaskit/adf-utils/types';

export const trailingSpacesWithInlineCard: ADFEntity = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{ type: 'text', text: ' ' },
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{ type: 'text', text: ' ' },
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{ type: 'text', text: ' ' },
			],
		},
	],
};

export const noTrailingSpacesWithInlineCard: ADFEntity = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
			],
		},
	],
};

export const multipleNodesAcrossLinesWithInlineCard: ADFEntity = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [],
		},
		{
			type: 'paragraph',
			content: [
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
			],
		},
		{
			type: 'paragraph',
			content: [
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
			],
		},
		{
			type: 'paragraph',
			content: [
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
				{
					type: 'inlineCard',
					attrs: {
						url: 'https://inlineCardTestUrl',
					},
				},
			],
		},
		{
			type: 'paragraph',
			content: [],
		},
	],
};

export const multilineWithInlineCard: ADFEntity = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'table',
			attrs: {
				isNumberColumnEnabled: false,
				layout: 'default',
				localId: '704b4aa7-f9a6-49e0-9b14-3c2e010bd4ca',
			},
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							attrs: {
								colwidth: [56],
							},
							content: [
								{
									type: 'paragraph',
									content: [
										{
											type: 'inlineCard',
											attrs: {
												url: 'https://inlineCardTestUrl',
											},
										},
										{
											type: 'inlineCard',
											attrs: {
												url: 'https://inlineCardTestUrl',
											},
										},
										{
											type: 'inlineCard',
											attrs: {
												url: 'https://inlineCardTestUrl',
											},
										},
									],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {
								colwidth: [346],
							},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {
								colwidth: [276],
							},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
					],
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: {
								colwidth: [56],
							},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {
								colwidth: [346],
							},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {
								colwidth: [276],
							},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
					],
				},
			],
		},
	],
};
