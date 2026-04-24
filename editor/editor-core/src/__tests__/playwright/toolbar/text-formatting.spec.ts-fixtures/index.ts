export const blockQuoteAdf: {
    version: number; type: string; content: ({
        type: string;
        content: {
            type: string;
            text: string;
        }[];
    } | {
        type: string;
        content: {
            type: string;
            content: {
                type: string;
                text: string;
            }[];
        }[];
    } | {
        type: string;
        content: {
            type: string;
            text: string;
            marks: {
                type: string;
            }[];
        }[];
    })[];
} = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'hello',
				},
			],
		},
		{
			type: 'blockquote',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'inside block quote',
						},
					],
				},
			],
		},
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'world',
					marks: [
						{
							type: 'strong',
						},
					],
				},
			],
		},
	],
};
