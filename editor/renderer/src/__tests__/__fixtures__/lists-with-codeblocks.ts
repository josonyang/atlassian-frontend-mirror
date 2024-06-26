import type { DocNode } from '@atlaskit/adf-schema';

export const listWithCodeblock: DocNode = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'bulletList',
			content: [
				{
					type: 'listItem',
					content: [
						{
							type: 'codeBlock',
							attrs: {},
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			content: [],
		},
		{
			type: 'orderedList',
			content: [
				{
					type: 'listItem',
					content: [
						{
							type: 'codeBlock',
							attrs: {},
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			content: [],
		},
		{
			type: 'bulletList',
			content: [
				{
					type: 'listItem',
					content: [
						{
							type: 'codeBlock',
							attrs: {},
						},
						{
							type: 'bulletList',
							content: [
								{
									type: 'listItem',
									content: [
										{
											type: 'codeBlock',
											attrs: {},
										},
										{
											type: 'bulletList',
											content: [
												{
													type: 'listItem',
													content: [
														{
															type: 'codeBlock',
															attrs: {},
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			content: [],
		},
		{
			type: 'orderedList',
			content: [
				{
					type: 'listItem',
					content: [
						{
							type: 'codeBlock',
							attrs: {},
						},
						{
							type: 'orderedList',
							content: [
								{
									type: 'listItem',
									content: [
										{
											type: 'codeBlock',
											attrs: {},
										},
										{
											type: 'orderedList',
											content: [
												{
													type: 'listItem',
													content: [
														{
															type: 'codeBlock',
															attrs: {},
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			content: [],
		},
		{
			type: 'bulletList',
			content: [
				{
					type: 'listItem',
					content: [
						{
							type: 'codeBlock',
							attrs: {},
						},
						{
							type: 'codeBlock',
							attrs: {},
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			content: [],
		},
		{
			type: 'orderedList',
			content: [
				{
					type: 'listItem',
					content: [
						{
							type: 'codeBlock',
							attrs: {},
						},
						{
							type: 'codeBlock',
							attrs: {},
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			content: [],
		},
	],
};
