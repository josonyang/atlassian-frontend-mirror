export const tableLayout: {
	type: string;
	version: number;
	content: (
		| {
				type: string;
				content: {
					type: string;
					content: {
						type: string;
						content: {
							type: string;
							content: {
								type: string;
								text: string;
							}[];
						}[];
					}[];
				}[];
				attrs?: undefined;
		  }
		| {
				type: string;
				attrs: {
					layout: string;
					isNumberColumnEnabled?: undefined;
					extensionType?: undefined;
					extensionKey?: undefined;
					parameters?: undefined;
				};
				content: {
					type: string;
					content: (
						| {
								type: string;
								content: {
									type: string;
									content: {
										type: string;
										text: string;
									}[];
								}[];
						  }
						| {
								type: string;
								content: {
									type: string;
									attrs: {
										layout: string;
									};
									content: {
										type: string;
										attrs: {
											type: string;
											url: string;
										};
									}[];
								}[];
						  }
					)[];
				}[];
		  }
		| {
				type: string;
				attrs: {
					isNumberColumnEnabled: boolean;
					layout?: undefined;
					extensionType?: undefined;
					extensionKey?: undefined;
					parameters?: undefined;
				};
				content: {
					type: string;
					content: {
						type: string;
						content: {
							type: string;
							content: {
								type: string;
								text: string;
							}[];
						}[];
					}[];
				}[];
		  }
		| {
				type: string;
				attrs: {
					extensionType: string;
					extensionKey: string;
					parameters: {
						macroParams: {};
						macroMetadata: {
							macroId: {
								value: number;
							};
							placeholder: {
								'0': {
									data: {
										url: string;
									};
									type: string;
								};
							};
						};
					};
					layout: string;
					isNumberColumnEnabled?: undefined;
				};
				content: {
					type: string;
					attrs: {
						layout: string;
					};
					content: {
						type: string;
						content: {
							type: string;
							content: {
								type: string;
								content: {
									type: string;
									text: string;
								}[];
							}[];
						}[];
					}[];
				}[];
		  }
		| {
				type: string;
				attrs: {
					isNumberColumnEnabled: boolean;
					layout: string;
					extensionType?: undefined;
					extensionKey?: undefined;
					parameters?: undefined;
				};
				content: {
					type: string;
					content: {
						type: string;
						attrs: {};
						content: {
							type: string;
							content: {
								type: string;
								text: string;
							}[];
						}[];
					}[];
				}[];
		  }
	)[];
} = {
	type: 'doc',
	version: 1,
	content: [
		{
			type: 'table',
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
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
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 4' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 5' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 6' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 7' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
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
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 4' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 5' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 6' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 7' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 8' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { layout: 'full-width' },
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
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
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { layout: 'wide' },
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
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
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'mediaSingle',
									attrs: { layout: 'center' },
									content: [
										{
											type: 'media',
											attrs: {
												type: 'external',
												url: 'https://images.rapgenius.com/de451d5df22cb6e71e5a06101c1f979e.460x460x1.jpg',
											},
										},
									],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { isNumberColumnEnabled: true },
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
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
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { isNumberColumnEnabled: true },
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
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
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'bodiedExtension',
			attrs: {
				extensionType: 'com.atlassian.confluence.macro.core',
				extensionKey: 'bodied-eh',
				parameters: {
					macroParams: {},
					macroMetadata: {
						macroId: { value: 1532948101320 },
						placeholder: { '0': { data: { url: '' }, type: 'icon' } },
					},
				},
				layout: 'wide',
			},
			content: [
				{
					type: 'table',
					attrs: { layout: 'full-width' },
					content: [
						{
							type: 'tableRow',
							content: [
								{
									type: 'tableHeader',
									content: [
										{
											type: 'paragraph',
											content: [{ type: 'text', text: 'Header content 1' }],
										},
									],
								},
								{
									type: 'tableHeader',
									content: [
										{
											type: 'paragraph',
											content: [{ type: 'text', text: 'Header content 2' }],
										},
									],
								},
								{
									type: 'tableHeader',
									content: [
										{
											type: 'paragraph',
											content: [{ type: 'text', text: 'Header content 3' }],
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
									content: [
										{
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'This table is inside a bodied extension.',
												},
											],
										},
									],
								},
								{
									type: 'tableCell',
									content: [
										{
											type: 'paragraph',
											content: [{ type: 'text', text: 'Body content 2' }],
										},
									],
								},
								{
									type: 'tableCell',
									content: [
										{
											type: 'paragraph',
											content: [{ type: 'text', text: 'Body content 3' }],
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
			type: 'table',
			attrs: { isNumberColumnEnabled: true, layout: 'default' },
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { isNumberColumnEnabled: true, layout: 'default' },
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
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { isNumberColumnEnabled: true, layout: 'default' },
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
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { isNumberColumnEnabled: false, layout: 'default' },
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
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
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
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 3' }],
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'table',
			attrs: { isNumberColumnEnabled: false, layout: 'default' },
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
									content: [{ type: 'text', text: 'Header content 1' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
								},
							],
						},
					],
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 2' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
					],
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableHeader',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Header content 3' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 1' }],
								},
							],
						},
						{
							type: 'tableCell',
							attrs: {},
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Body content 2' }],
								},
							],
						},
					],
				},
			],
		},
	],
};
