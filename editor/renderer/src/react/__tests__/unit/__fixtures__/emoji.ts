export const emojiList: {
	type: string;
	content: {
		type: string;
		attrs: {
			shortName: string;
			id: string;
			text: string;
		};
	}[];
} = {
	type: 'doc',
	content: [
		{
			type: 'emoji',
			attrs: { shortName: ':slight_smile:', id: '1f642', text: '🙂' },
		},
		{
			type: 'emoji',
			attrs: { shortName: ':dash:', id: '1f4a8', text: '💨' },
		},
		{
			type: 'emoji',
			attrs: { shortName: ':trident:', id: '1f531', text: '🔱' },
		},
	],
};
