export const createDocumentWithParagraphs = (pCount: number = 2) => {
	const p = {
		type: 'paragraph',
		content: [
			{
				type: 'text',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi nisl, venenatis eget auctor vitae, venenatis quis lorem. Suspendisse maximus tortor vel dui tincidunt cursus. Vestibulum magna nibh, auctor non auctor id, finibus vitae orci. Nulla viverra ipsum et nunc fringilla ultricies. Pellentesque vitae felis molestie justo finibus accumsan. Suspendisse potenti. Nulla facilisi. Integer dignissim quis velit quis elementum. Sed sit amet varius ante. Duis vestibulum porta augue eu laoreet. Morbi id risus et augue sollicitudin aliquam. In et ligula dolor. Nam ac aliquet diam.',
			},
		],
	};

	const pRepeat = new Array(pCount).fill(p);
	return {
		version: 1,
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: {
					level: 1,
				},
				content: [
					{
						type: 'text',
						text: 'Lorem ipsum dolor',
					},
				],
			},
			...pRepeat,
		],
	};
};
