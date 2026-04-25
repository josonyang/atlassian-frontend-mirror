export const adf: {
	version: number;
	type: string;
	content: {
		type: string;
		content: {
			type: string;
			text: string;
		}[];
	}[];
} = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'Hello, World!',
				},
			],
		},
	],
};
