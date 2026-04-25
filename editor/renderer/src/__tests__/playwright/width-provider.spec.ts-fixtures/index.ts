export const tableADF: {
	version: number;
	type: string;
	content: (
		| {
				type: string;
				attrs: {
					isNumberColumnEnabled: boolean;
					layout: string;
				};
				content: {
					type: string;
					content: {
						type: string;
						attrs: {
							background: string;
						};
						content: {
							type: string;
							content: never[];
						}[];
					}[];
				}[];
		  }
		| {
				type: string;
				content: never[];
				attrs?: undefined;
		  }
	)[];
} = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'table',
			attrs: {
				isNumberColumnEnabled: false,
				layout: 'wide',
			},
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: {
								background: '#ffc400',
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
		{
			type: 'paragraph',
			content: [],
		},
	],
};

export const tableWithCustomWidthADF: {
	version: number;
	type: string;
	content: {
		type: string;
		attrs: {
			isNumberColumnEnabled: boolean;
			layout: string;
			localId: string;
			width: number;
			displayMode: string;
		};
		content: {
			type: string;
			content: {
				type: string;
				attrs: {};
				content: {
					type: string;
					content: never[];
				}[];
			}[];
		}[];
	}[];
} = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'table',
			attrs: {
				isNumberColumnEnabled: false,
				layout: 'default',
				localId: '20a635f1-0716-44cf-a23f-03a7d5a119a2',
				width: 880,
				displayMode: 'default',
			},
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
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
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
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
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
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
