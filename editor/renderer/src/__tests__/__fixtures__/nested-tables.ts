export const adfNestedTableData: {
	type: string;
	version: number;
	content: {
		type: string;
		attrs: {};
		content: (
			| {
					type: string;
					content: {
						type: string;
						attrs: {};
						content: {
							type: string;
							content: never[];
						}[];
					}[];
			  }
			| {
					type: string;
					content: {
						type: string;
						attrs: {};
						content: {
							type: string;
							attrs: {
								isNumberColumnEnabled: boolean;
								layout: string;
								localId: string;
							};
							content: {
								type: string;
								content: (
									| {
											type: string;
											attrs: {};
											content: {
												type: string;
												content: never[];
											}[];
									  }
									| {
											type: string;
											attrs: {};
											content: {
												type: string;
												attrs: {
													localId: null;
												};
												content: {
													type: string;
													text: string;
												}[];
											}[];
									  }
								)[];
							}[];
						}[];
					}[];
			  }
		)[];
	}[];
} = {
	type: 'doc',
	version: 1,
	content: [
		{
			type: 'table',
			attrs: {},
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
									type: 'table',
									attrs: {
										isNumberColumnEnabled: false,
										layout: 'default',
										localId: '4e503abf-13f9-484e-bc74-f439c17665ef',
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
															attrs: {
																localId: null,
															},
															content: [
																{
																	type: 'text',
																	text: 'inside first nested table',
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
			],
		},
	],
};
