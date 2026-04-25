export const mediaInlineWithAnnotation: {
	type: string;
	content: {
		type: string;
		content: (
			| {
					type: string;
					attrs: {
						width: number;
						alt: string;
						id: string;
						collection: string;
						type: string;
						height: number;
					};
					marks: {
						type: string;
						attrs: {
							annotationType: string;
							id: string;
						};
					}[];
					text?: undefined;
			  }
			| {
					text: string;
					type: string;
					attrs?: undefined;
					marks?: undefined;
			  }
		)[];
	}[];
} = {
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'mediaInline',
					attrs: {
						width: 2121,
						alt: 'catt.jpeg',
						id: '88a893ca-a226-4125-9647-33e7f6f7bc5f',
						collection: 'contentId-453345476873',
						type: 'image',
						height: 1194,
					},
					marks: [
						{
							type: 'annotation',
							attrs: {
								annotationType: 'inlineComment',
								id: 'fde624ce-7528-4100-a3e8-0bf15e2577c9',
							},
						},
					],
				},
				{
					text: 'some random text',
					type: 'text',
				},
			],
		},
	],
};
