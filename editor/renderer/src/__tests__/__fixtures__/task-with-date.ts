// To match mocked date
const mockedDate = new Date(Date.UTC(2017, 7, 16));

export const taskWithDateAdf: {
	version: number;
	type: string;
	content: (
		| {
				type: string;
				content: {
					type: string;
					content: {
						type: string;
						attrs: {
							timestamp: Date;
						};
					}[];
					attrs: {
						localId: string;
						state: string;
					};
				}[];
				attrs: {
					localId: string;
				};
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
			type: 'taskList',
			content: [
				{
					type: 'taskItem',
					content: [
						{
							type: 'date',
							attrs: {
								timestamp: mockedDate,
							},
						},
					],
					attrs: {
						localId: 'test-list-id',
						state: 'TODO',
					},
				},
			],
			attrs: {
				localId: 'test-id',
			},
		},
		{
			type: 'paragraph',
			content: [],
		},
	],
};
