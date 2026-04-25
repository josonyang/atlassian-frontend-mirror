export const providerUrl = 'http://provider';
export const docId = '123';
export const objectId = 'ari:cloud:demo::document/1';

export const validContent: {
	type: string;
	version: number;
	content: {
		type: string;
		content: {
			type: string;
			text: string;
		}[];
	}[];
} = {
	type: 'doc',
	version: 1,
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'Hello World',
				},
			],
		},
	],
};

export const updatedContent: {
	type: string;
	version: number;
	content: {
		type: string;
		content: {
			type: string;
			text: string;
		}[];
	}[];
} = {
	type: 'doc',
	version: 1,
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'Hello World!!!',
				},
			],
		},
	],
};

export const validGetResponse: {
	id: string;
	objectId: string;
	createdBy: {};
	body: {
		type: string;
		version: number;
		content: {
			type: string;
			content: {
				type: string;
				text: string;
			}[];
		}[];
	};
} = {
	id: docId,
	objectId,
	createdBy: {},
	body: validContent,
};

export const validBatchGetResponse: {
	id: string;
	language: {
		default: {
			versions: {
				id: string;
				objectId: string;
				createdBy: {};
				body: {
					type: string;
					version: number;
					content: {
						type: string;
						content: {
							type: string;
							text: string;
						}[];
					}[];
				};
			}[];
		};
	};
}[] = [
	{
		id: docId,
		language: {
			default: {
				versions: [validGetResponse],
			},
		},
	},
];

export const validPutResponse: {
	id: string;
	objectId: string;
	createdBy: {};
	body: {
		type: string;
		version: number;
		content: {
			type: string;
			content: {
				type: string;
				text: string;
			}[];
		}[];
	};
} = {
	id: docId,
	objectId,
	createdBy: {},
	body: updatedContent,
};
