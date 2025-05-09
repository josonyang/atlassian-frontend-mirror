import { PanelType } from '@atlaskit/adf-schema';
import type { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '@atlaskit/editor-common/analytics';
import {
	processRawFragmentValue,
	processRawValue,
} from '@atlaskit/editor-common/process-raw-value';
import {
	hasVisibleContent,
	isEmptyDocument,
	isEmptyParagraph,
	isNodeEmpty,
} from '@atlaskit/editor-common/utils';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
	date,
	decisionItem,
	decisionList,
	doc,
	hardBreak,
	hr,
	li,
	media,
	mediaSingle,
	mention,
	p,
	panel,
	text,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import schema from '@atlaskit/editor-test-helpers/schema';

import { name } from '../../../version-wrapper';

describe(name, () => {
	describe('Utils -> Document', () => {
		describe('isEmptyParagraph', () => {
			it('should return true if paragraph is empty', () => {
				expect(isEmptyParagraph(p('')(schema))).toBe(true);
			});

			it('should return false if paragraph is not empty', () => {
				expect(isEmptyParagraph(p('some text')(schema))).toBe(false);
			});
		});

		describe('isNodeEmpty', () => {
			it('should return true if node is empty', () => {
				expect(isNodeEmpty(p('')(schema))).toBe(true);
			});

			it('should return true if the only child of a node is an empty paragraph', () => {
				expect(isNodeEmpty(doc(p(''))(schema))).toBe(true);
			});

			it('should return true if node only contains empty block nodes', () => {
				expect(isNodeEmpty(doc(p(''), p(''), p(''))(schema))).toBe(true);
			});

			it('should return false if the only child of a node is not an empty paragraph', () => {
				expect(isNodeEmpty(doc(p('some text'))(schema))).toBe(false);
			});

			it('should return false if node contains non-empty block nodes', () => {
				expect(isNodeEmpty(doc(p(''), p('some text'), p(''))(schema))).toBe(false);
			});
		});

		describe('hasVisibleContent', () => {
			const nodesWithVisibleContent = [
				p('', hardBreak(), date({ timestamp: Date.now() })),
				p(mention({ id: '123' })()),
				date({ timestamp: Date.now() }),
				mention({ id: '123' })(),
				mediaSingle({ layout: 'center' })(
					media({ id: 'id', type: 'file', collection: 'collection' })(),
				),
			];
			const nodesWithoutVisibleContent = [
				p(''),
				li(p('')),
				p('', hardBreak()),
				p(' ', hardBreak(), ' '),
				hardBreak(),
			];

			nodesWithVisibleContent.forEach((nodeBuilder) => {
				const node = nodeBuilder(schema);
				it(`should return true for none empty node: ${JSON.stringify(node.toJSON())}`, () => {
					expect(hasVisibleContent(node)).toBe(true);
				});
			});

			nodesWithoutVisibleContent.forEach((nodeBuilder) => {
				const node = nodeBuilder(schema);
				it(`should return false for empty node: ${JSON.stringify(node.toJSON())}`, () => {
					expect(hasVisibleContent(node)).toBe(false);
				});
			});
		});

		describe('isEmptyDocument', () => {
			it('should return true if node looks like an empty document', () => {
				const node = doc(p(''))(schema);
				expect(isEmptyDocument(node)).toBe(true);
			});

			it('should return false if node has text content', () => {
				const node = doc(p('hello world'))(schema);
				expect(isEmptyDocument(node)).toBe(false);
			});

			it('should return false if node has multiple empty children', () => {
				const node = doc(p(''), p(''))(schema);
				expect(isEmptyDocument(node)).toBe(false);
			});

			it('should return false if node has block content', () => {
				const node = doc(decisionList({})(decisionItem({})()))(schema);
				expect(isEmptyDocument(node)).toBe(false);
			});

			it('should return false if node has hr', () => {
				expect(isEmptyDocument(doc(p(), hr())(schema))).toBe(false);
			});
		});
	});

	describe('processRawFragmentValue', () => {
		it('should accept an array of nodes in json or stringified format and insert them as a fragment', () => {
			const nodes = [
				{
					attrs: {
						localId: null,
					},
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Hello World',
						},
					],
				},
				JSON.stringify({
					type: 'panel',
					attrs: {
						panelType: 'info',
					},
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Hello World',
								},
							],
						},
					],
				}),
			];

			const result = processRawFragmentValue(schema, nodes);

			expect(result).toBeDefined();
			expect(result!.childCount).toBe(2);
			expect(result!.child(0)).toEqualDocument(p('Hello World'));
			expect(result!.child(1)).toEqualDocument(
				panel({ panelType: PanelType.INFO })(p('Hello World')),
			);
		});

		it('should filter out invalid items', () => {
			const nodes = [
				{
					attrs: {
						localId: null,
					},
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Hello World',
						},
					],
				},
				[1, 2, 3],
				' { invalid } ',
			];

			const result = processRawFragmentValue(schema, nodes);

			expect(result).toBeDefined();
			expect(result!.childCount).toBe(1);
			expect(result!.child(0)).toEqualDocument(p('Hello World'));
		});
	});

	describe('processRawValue', () => {
		const successCases = [
			{ name: 'doc', node: doc(p('some new content'))(schema) as any },
			{ name: 'text', node: text('text', schema) as any },
			{
				name: 'block',
				node: panel({ panelType: PanelType.INFO })(p('tcontent'))(schema) as any,
			},
			{
				name: 'inline',
				node: mention({ id: 'id', text: '@mention' })()(schema) as any,
			},
		];

		successCases.forEach(({ name, node }) => {
			it(`Case: ${name} – should accept JSON version of a prosemirror node`, () => {
				const result = processRawValue(schema, node.toJSON());
				expect(result).toEqualDocument(node);
			});

			it(`Case: ${name} – should accept stringified JSON version of a prosemirror node`, () => {
				const result = processRawValue(schema, JSON.stringify(node.toJSON()));
				expect(result).toEqualDocument(node);
			});
		});

		describe('failure cases', () => {
			// Silence console.error
			// eslint-disable-next-line no-console
			const oldConsole = console.error;
			// eslint-disable-next-line no-console
			console.error = jest.fn();
			let createAnalyticsEvent = jest.fn(
				() =>
					({
						fire() {},
					}) as UIAnalyticsEvent,
			);

			afterAll(() => {
				// eslint-disable-next-line no-console
				console.error = oldConsole;
			});

			it('should return undefined if value is empty', () => {
				expect(processRawValue(schema, '')).toBeUndefined();
			});

			it('should return undefined if value is not a valid json', () => {
				expect(processRawValue(schema, '{ broken }')).toBeUndefined();
			});

			it('should return undefined if value is an array', () => {
				expect(processRawValue(schema, [1, 2, 3, 4])).toBeUndefined();
			});

			it('should return undefined if json represents not valid PM Node', () => {
				expect(
					processRawValue(
						schema,
						{
							type: 'blockqoute',
							content: [{ type: 'text', text: 'text' }],
						},
						undefined,
						undefined,
						undefined,
						createAnalyticsEvent,
					),
				).toBeUndefined();
				expect(createAnalyticsEvent).toHaveBeenCalled();
				expect(createAnalyticsEvent).toHaveBeenCalledWith({
					action: ACTION.DOCUMENT_PROCESSING_ERROR,
					actionSubject: ACTION_SUBJECT.EDITOR,
					eventType: EVENT_TYPE.OPERATIONAL,
				});
				expect(createAnalyticsEvent).not.toHaveBeenCalledWith(
					expect.objectContaining({
						nonPrivacySafeAttributes: expect.any(Object),
					}),
				);
			});
		});

		describe('Unsupported', () => {
			it('should wrap unsupported block nodes and preserve contents', () => {
				const unsupportedBlockWithContents = {
					type: 'x',
					text: 'hello',
					attrs: { id: '4' },
					content: [
						{
							type: 'text',
							text: 'task',
							marks: [{ type: 'strong' }],
						},
					],
				};

				const result = processRawValue(schema, {
					type: 'doc',
					content: [unsupportedBlockWithContents],
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual({
					type: 'doc',
					content: [
						{
							type: 'unsupportedBlock',
							attrs: {
								originalValue: unsupportedBlockWithContents,
							},
						},
					],
				});
			});

			it('should wrap unsupported inline nodes and preserve contents', () => {
				const unsupportedInlineWithContents: any = {
					type: 'x',
					attrs: { id: '4', text: '@hey' },
				};
				const result = processRawValue(schema, {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [{ type: 'text', text: 'hello' }, unsupportedInlineWithContents],
						},
					],
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual({
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{ type: 'text', text: 'hello' },
								{
									type: 'unsupportedInline',
									attrs: { originalValue: unsupportedInlineWithContents },
								},
							],
						},
					],
				});
			});

			it('should wrap unsupported mark for inline node', () => {
				const unsupportedMark = {
					type: 'dasdsad',
				};
				const expected = {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Hello',
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: unsupportedMark,
											},
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Hello',
									marks: [unsupportedMark],
								},
							],
						},
					],
				});

				expect(result).toBeDefined();

				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap in unsupportedBlock for nestedExpand node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'table',
							attrs: {
								__autoSize: false,
								displayMode: null,
								isNumberColumnEnabled: false,
								layout: 'default',
								localId: 'a4ffec03-04b5-4243-aebc-0f6dc934c96e',
								width: null,
							},
							content: [
								{
									type: 'tableRow',
									content: [
										{
											type: 'tableHeader',
											attrs: {
												background: null,
												colspan: 1,
												colwidth: null,
												rowspan: 1,
											},
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
												},
											],
										},
										{
											type: 'tableHeader',
											attrs: {
												background: null,
												colspan: 1,
												colwidth: null,
												rowspan: 1,
											},
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
												},
											],
										},
										{
											type: 'tableHeader',
											attrs: {
												background: null,
												colspan: 1,
												colwidth: null,
												rowspan: 1,
											},
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
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
											attrs: {
												background: null,
												colspan: 1,
												colwidth: null,
												rowspan: 1,
											},
											content: [
												{
													type: 'nestedExpand',
													attrs: {
														__expanded: true,
														title: '',
													},
													content: [
														{
															type: 'unsupportedBlock',
															attrs: {
																originalValue: {
																	type: 'invalidChildComponent',
																	content: [
																		{
																			type: 'text',
																			text: 'This is an item',
																		},
																	],
																},
															},
														},
													],
												},
											],
										},
										{
											type: 'tableCell',
											attrs: {
												background: null,
												colspan: 1,
												colwidth: null,
												rowspan: 1,
											},
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
												},
											],
										},
										{
											type: 'tableCell',
											attrs: {
												background: null,
												colspan: 1,
												colwidth: null,
												rowspan: 1,
											},
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
												},
											],
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					type: 'doc',
					content: [
						{
							type: 'table',
							attrs: {
								isNumberColumnEnabled: false,
								layout: 'default',
								localId: 'a4ffec03-04b5-4243-aebc-0f6dc934c96e',
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
													attrs: {
														localId: null,
													},
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
													attrs: {
														localId: null,
													},
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
													attrs: {
														localId: null,
													},
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
													type: 'nestedExpand',
													attrs: {
														title: '',
													},
													content: [
														{
															type: 'invalidChildComponent',
															content: [
																{
																	type: 'text',
																	text: 'This is an item',
																},
															],
														},
													],
												},
											],
										},
										{
											type: 'tableCell',
											attrs: {},
											content: [
												{
													attrs: {
														localId: null,
													},
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
													attrs: {
														localId: null,
													},
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
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap in unsupportedBlock for blockquote node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'blockquote',
							content: [
								{
									type: 'unsupportedBlock',
									attrs: {
										originalValue: {
											type: 'paragraph1',
											content: [{ type: 'text', text: 'foo' }],
										},
									},
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					type: 'doc',
					content: [
						{
							type: 'blockquote',
							content: [
								{
									type: 'paragraph1',
									content: [
										{
											type: 'text',
											text: 'foo',
										},
									],
								},
							],
						},
					],
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap in unsupportedBlock for panel node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'panel',
							attrs: {
								panelType: 'info',
								panelColor: null,
								panelIcon: null,
								panelIconId: null,
								panelIconText: null,
							},
							content: [
								{
									type: 'unsupportedBlock',
									attrs: {
										originalValue: {
											type: 'paragraph1',
											content: [{ type: 'text', text: 'foo' }],
										},
									},
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'panel',
							attrs: {
								panelType: 'info',
							},
							content: [
								{
									type: 'paragraph1',
									content: [
										{
											type: 'text',
											text: 'foo',
										},
									],
								},
							],
						},
					],
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap unsupported children in unsupportedBlock for layoutSection node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							attrs: {
								columnRuleStyle: null,
							},
							content: [
								{
									type: 'unsupportedBlock',
									attrs: {
										originalValue: {
											type: 'layoutCol',
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
													content: [{ type: 'text', text: 'hello' }],
												},
											],
											attrs: { width: 50 },
										},
									},
								},
								{
									type: 'layoutColumn',
									attrs: { width: 50 },
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [{ type: 'text', text: 'world' }],
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							content: [
								{
									type: 'layoutCol',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'hello',
												},
											],
										},
									],
									attrs: {
										width: 50,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'world',
												},
											],
										},
									],
									attrs: {
										width: 50,
									},
								},
							],
						},
					],
				});
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap layoutColumn children in unsupportedBlock for LayoutSection node when passing more than the maximum allowed children', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							attrs: {
								columnRuleStyle: null,
							},
							content: [
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'first',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'second',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'third',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'forth',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'fifth',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'unsupportedBlock',
									attrs: {
										originalValue: {
											type: 'layoutColumn',
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
													content: [
														{
															type: 'text',
															text: 'sixth and false',
														},
													],
												},
											],
											attrs: {
												width: 33.33,
											},
										},
									},
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							content: [
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'first',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'second',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'third',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'forth',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'fifth',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'sixth and false',
												},
											],
										},
									],
									attrs: {
										width: 33.33,
									},
								},
							],
						},
					],
				});
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap unsupported children in unsupportedBlock for layoutColumn node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							attrs: { columnRuleStyle: null },
							content: [
								{
									type: 'layoutColumn',
									attrs: { width: 50 },
									content: [
										{
											type: 'unsupportedBlock',
											attrs: {
												originalValue: {
													type: 'para',
													content: [{ type: 'text', text: 'hello' }],
												},
											},
										},
									],
								},
								{
									type: 'layoutColumn',
									attrs: { width: 50 },
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [{ type: 'text', text: 'world' }],
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							content: [
								{
									type: 'layoutColumn',
									content: [
										{
											type: 'para',
											content: [
												{
													type: 'text',
													text: 'hello',
												},
											],
										},
									],
									attrs: {
										width: 50,
									},
								},
								{
									type: 'layoutColumn',
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'world',
												},
											],
										},
									],
									attrs: {
										width: 50,
									},
								},
							],
						},
					],
				});
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap in unsupportedInline node for code block', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'codeBlock',
							attrs: {
								language: 'none',
								uniqueId: null,
							},
							content: [
								{
									type: 'unsupportedInline',
									attrs: {
										originalValue: {
											type: 'unknownText',
											text: 'asd asdsfa safsasaf',
										},
									},
								},
								{
									type: 'text',
									text: ' some other text',
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'codeBlock',
							attrs: {
								language: 'none',
							},
							content: [
								{
									type: 'unknownText',
									text: 'asd asdsfa safsasaf',
								},
								{
									type: 'text',
									text: ' some other text',
								},
							],
						},
					],
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap in unsupportedBlock node for taskList node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'taskList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'unsupportedBlock',
									attrs: {
										originalValue: {
											type: 'NotAtaskItem',
											attrs: {
												localId: '456',
												state: 'TODO',
											},
											content: [
												{
													type: 'text',
													text: 'This is a task',
												},
											],
										},
									},
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'taskList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'NotAtaskItem',
									attrs: {
										localId: '456',
										state: 'TODO',
									},
									content: [
										{
											type: 'text',
											text: 'This is a task',
										},
									],
								},
							],
						},
					],
				});
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap in unsupportedInline node for taskItem node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'taskList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'taskItem',
									attrs: {
										localId: '456',
										state: 'TODO',
									},
									content: [
										{
											type: 'unsupportedInline',
											attrs: {
												originalValue: {
													type: 'notAValidChild',
													content: [
														{
															type: 'text',
															text: 'this is the first task',
														},
													],
												},
											},
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'taskList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'taskItem',
									attrs: {
										localId: '456',
										state: 'TODO',
									},
									content: [
										{
											type: 'notAValidChild',
											content: [
												{
													type: 'text',
													text: 'this is the first task',
												},
											],
										},
									],
								},
							],
						},
					],
				});
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap in unsupportedBlock node for decisionList node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'decisionList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'unsupportedBlock',
									attrs: {
										originalValue: {
											type: 'NotADecisionItem',

											attrs: {
												localId: '456',
												state: 'DECIDED',
											},
											content: [
												{
													type: 'text',
													text: 'This is the first decision',
												},
											],
										},
									},
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'decisionList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'NotADecisionItem',
									attrs: {
										localId: '456',
										state: 'DECIDED',
									},
									content: [
										{
											type: 'text',
											text: 'This is the first decision',
										},
									],
								},
							],
						},
					],
				});
				expect(result!.toJSON()).toEqual(expected);
			});

			['bulletList', 'orderedList'].forEach((listType) => {
				it(`should wrap in unsupportedBlock node for listItem node inside ${listType}`, () => {
					const orderedListAttributes = listType === 'orderedList' ? { attrs: { order: 1 } } : {};
					const expected = {
						type: 'doc',
						content: [
							{
								type: listType,
								...orderedListAttributes,
								content: [
									{
										type: 'listItem',
										content: [
											{
												type: 'unsupportedBlock',
												attrs: {
													originalValue: {
														type: 'invalidChildComponent',
														content: [
															{
																type: 'text',
																text: 'This is the first item',
															},
														],
													},
												},
											},
										],
									},
								],
							},
						],
					};

					const result = processRawValue(schema, {
						version: 1,
						type: 'doc',
						content: [
							{
								type: listType,
								content: [
									{
										type: 'listItem',
										content: [
											{
												type: 'invalidChildComponent',
												content: [
													{
														type: 'text',
														text: 'This is the first item',
													},
												],
											},
										],
									},
								],
							},
						],
					});
					expect(result!.toJSON()).toEqual(expected);
				});
			});

			it('should wrap in unsupportedInline node for decisionItem node', () => {
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'decisionList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'decisionItem',
									attrs: {
										localId: '456',
										state: 'DECIDED',
									},
									content: [
										{
											type: 'unsupportedInline',
											attrs: {
												originalValue: {
													type: 'invalidChildComponent',

													content: [
														{
															type: 'text',

															text: 'This is the first decision',
														},
													],
												},
											},
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'decisionList',
							attrs: {
								localId: '123',
							},
							content: [
								{
									type: 'decisionItem',
									attrs: {
										localId: '456',
										state: 'DECIDED',
									},
									content: [
										{
											type: 'invalidChildComponent',
											content: [
												{
													type: 'text',
													text: 'This is the first decision',
												},
											],
										},
									],
								},
							],
						},
					],
				});
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap unsupported mark for inline node where no marks specified in spec', () => {
				const unsupportedMark = {
					type: 'dasdsad',
				};
				const expected = {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'placeholder',
									attrs: {
										text: 'text',
									},
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: unsupportedMark,
											},
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'placeholder',
									attrs: {
										text: 'text',
									},
									marks: [unsupportedMark],
								},
							],
						},
					],
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap a known mark not supported by the node', () => {
				const unsupportedMark = {
					type: 'textColor',
					attrs: {
						color: '#6554c0',
					},
				};
				const expected = {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'placeholder',
									attrs: {
										text: 'text',
									},
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: unsupportedMark,
											},
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'placeholder',
									attrs: {
										text: 'text',
									},
									marks: [unsupportedMark],
								},
							],
						},
					],
				});

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('should wrap the node with an invalid mark and property as unsupported', () => {
				const result = processRawValue(schema, {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'panel',
							attrs: {
								panelType: 'success',
							},
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'text',
											text: 'Hello',
										},
									],
								},
							],
							marks: [
								{
									type: 'unknown',
								},
							],
							unknownProp: true,
						},
					],
				});
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'unsupportedBlock',
							attrs: {
								originalValue: {
									type: 'panel',
									attrs: { panelType: 'success' },
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [{ type: 'text', text: 'Hello' }],
										},
									],
									marks: [{ type: 'unknown' }],
									unknownProp: true,
								},
							},
						},
					],
				};
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it(`should wrap mark with unsupportedMark, when a known not supported mark
          is applied to a node with single spec`, () => {
				const intialEntity = {
					version: 1,
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							content: [
								{
									type: 'layoutColumn',
									attrs: {
										width: 50,
									},
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [],
										},
									],
								},
								{
									type: 'layoutColumn',
									attrs: {
										width: 50,
									},
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [],
										},
									],
								},
							],
							marks: [
								{
									type: 'alignment',
								},
							],
						},
					],
				};
				const expected = {
					type: 'doc',
					content: [
						{
							type: 'layoutSection',
							attrs: { columnRuleStyle: null },
							content: [
								{
									type: 'layoutColumn',
									attrs: { width: 50 },
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
										},
									],
								},
								{
									type: 'layoutColumn',
									attrs: { width: 50 },
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
										},
									],
								},
							],
							marks: [
								{
									type: 'unsupportedMark',
									attrs: { originalValue: { type: 'alignment' } },
								},
							],
						},
					],
				};

				const result = processRawValue(schema, intialEntity);
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it(
				'should wrap mark with unsupportedMark and retain valid mark' +
					', when a known not supported mark and a valid mark is applied to a node with single spec',
				() => {
					const intialEntity = {
						version: 1,
						type: 'doc',
						content: [
							{
								type: 'layoutSection',
								content: [
									{
										type: 'layoutColumn',
										attrs: {
											width: 50,
										},
										content: [
											{
												attrs: {
													localId: null,
												},
												type: 'paragraph',
												content: [],
											},
										],
									},
									{
										type: 'layoutColumn',
										attrs: {
											width: 50,
										},
										content: [
											{
												attrs: {
													localId: null,
												},
												type: 'paragraph',
												content: [],
											},
										],
									},
								],
								marks: [
									{
										type: 'alignment',
									},
									{
										type: 'breakout',
										attrs: {
											mode: 'wide',
											width: null,
										},
									},
								],
							},
						],
					};
					const expected = {
						type: 'doc',
						content: [
							{
								type: 'layoutSection',
								attrs: { columnRuleStyle: null },
								content: [
									{
										type: 'layoutColumn',
										attrs: { width: 50 },
										content: [
											{
												attrs: {
													localId: null,
												},
												type: 'paragraph',
											},
										],
									},
									{
										type: 'layoutColumn',
										attrs: { width: 50 },
										content: [
											{
												attrs: {
													localId: null,
												},
												type: 'paragraph',
											},
										],
									},
								],
								marks: [
									{ type: 'breakout', attrs: { mode: 'wide', width: null } },
									{
										type: 'unsupportedMark',
										attrs: { originalValue: { type: 'alignment' } },
									},
								],
							},
						],
					};

					const result = processRawValue(schema, intialEntity);
					expect(result).toBeDefined();
					expect(result!.toJSON()).toEqual(expected);
				},
			);

			describe('unsupportedNodeAttribute', () => {
				it.each<[string, object, object]>([
					[
						`should wrap a node's child attributes into unsupportedNodeAttribute mark when the node is missing a required attr
             but is supplied other unsupported attr, and its child does not support attrs but attrs are passed `,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'layoutSection',
									content: [
										{
											type: 'layoutColumn',
											attrs: {
												newAttribute1: 'someVal',
											},
											content: [
												{
													type: 'paragraph',
													content: [
														{
															type: 'text',
															text: 'safasfsafsa',
														},
													],
													attrs: {
														localId: null,
														newAttribute1: 'someVal',
													},
												},
											],
										},
										{
											type: 'layoutColumn',
											attrs: {
												width: 50,
											},
											content: [
												{
													type: 'paragraph',
													content: [],
													attrs: {
														localId: null,
														newAttribute2: 'someVal',
													},
												},
											],
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'layoutSection',
									attrs: { columnRuleStyle: null },
									content: [
										{
											type: 'layoutColumn',
											attrs: {},
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
													content: [{ type: 'text', text: 'safasfsafsa' }],
													marks: [
														{
															type: 'unsupportedNodeAttribute',
															attrs: {
																type: { nodeType: 'paragraph' },
																unsupported: { newAttribute1: 'someVal' },
															},
														},
													],
												},
											],
											marks: [
												{
													type: 'unsupportedNodeAttribute',
													attrs: {
														type: { nodeType: 'layoutColumn' },
														unsupported: { newAttribute1: 'someVal' },
													},
												},
											],
										},
										{
											type: 'layoutColumn',
											attrs: { width: 50 },
											content: [
												{
													attrs: {
														localId: null,
													},
													type: 'paragraph',
													marks: [
														{
															type: 'unsupportedNodeAttribute',
															attrs: {
																type: { nodeType: 'paragraph' },
																unsupported: { newAttribute2: 'someVal' },
															},
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
					[
						'should wrap a node attribute into unsupportedNodeAttribute mark when the node does not support any attributes',
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'paragraph',
									content: [
										{
											type: 'text',
											text: 'No Attrs supported by text and paragraph',
											attrs: {
												some: 'value',
											},
										},
									],
									attrs: {
										localId: null,
										someOther: 'valueOther',
									},
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'text',
											marks: [
												{
													type: 'unsupportedNodeAttribute',
													attrs: {
														type: { nodeType: 'text' },
														unsupported: { some: 'value' },
													},
												},
											],
											text: 'No Attrs supported by text and paragraph',
										},
									],
									marks: [
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: { nodeType: 'paragraph' },
												unsupported: { someOther: 'valueOther' },
											},
										},
									],
								},
							],
						},
					],
					[
						'should wrap a redundant node attribute into unsupportedNodeAttribute mark',
						{
							version: 1,
							type: 'doc',
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'status',
											attrs: {
												text: 'Hello',
												color: 'neutral',
												localId: '156a150d-f02c-4223-a7a2-0592e830be6f',
												style: '',
												invalid: 'invalidValue',
											},
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'status',
											attrs: {
												text: 'Hello',
												color: 'neutral',
												localId: '156a150d-f02c-4223-a7a2-0592e830be6f',
												style: '',
											},
											marks: [
												{
													type: 'unsupportedNodeAttribute',
													attrs: {
														type: {
															nodeType: 'status',
														},
														unsupported: {
															invalid: 'invalidValue',
														},
													},
												},
											],
										},
									],
								},
							],
						},
					],
					[
						'should wrap a node attribute with invalid value into unsupportedNodeAttribute mark',
						{
							version: 1,
							type: 'doc',
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'mention',
											attrs: {
												id: '0',
												text: '@Carolyn',
												accessLevel: 123,
												userType: 'DEFAULT',
											},
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'mention',
											attrs: {
												id: '0',
												localId: null,
												text: '@Carolyn',
												accessLevel: '',
												userType: 'DEFAULT',
											},
											marks: [
												{
													type: 'unsupportedNodeAttribute',
													attrs: {
														type: {
															nodeType: 'mention',
														},
														unsupported: {
															accessLevel: 123,
														},
													},
												},
											],
										},
									],
								},
							],
						},
					],
					[
						`should wrap the invalid value into unsupportedNodeAttribute mark for a required attribute
          and replace the required with the default value`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'panel',
									attrs: {
										panelType: 'abc',
									},
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'abc',
												},
											],
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'panel',
									attrs: {
										panelType: PanelType.INFO,
										panelColor: null,
										panelIcon: null,
										panelIconId: null,
										panelIconText: null,
									},
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'abc',
												},
											],
										},
									],
									marks: [
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: {
													nodeType: 'panel',
												},
												unsupported: {
													panelType: 'abc',
												},
											},
										},
									],
								},
							],
						},
					],
					[
						`should wrap the redundant node attribute type into unsupportedNodeAttribute mark
        and redundant mark type to unsupportedMark`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'panel',
									attrs: {
										panelType: PanelType.INFO,
										invalid: 'invalidValue',
									},
									marks: [
										{
											type: 'someMark',
										},
									],
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'abc',
												},
											],
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'panel',
									attrs: {
										panelType: PanelType.INFO,
										panelColor: null,
										panelIcon: null,
										panelIconId: null,
										panelIconText: null,
									},
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'abc',
												},
											],
										},
									],
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: {
													type: 'someMark',
												},
											},
										},
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: {
													nodeType: 'panel',
												},
												unsupported: {
													invalid: 'invalidValue',
												},
											},
										},
									],
								},
							],
						},
					],
					[
						`should wrap the invalid node attribute value into unsupportedNodeAttribute mark
        and redundant mark type to unsupportedMark`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'panel',
									attrs: {
										panelType: 'abc',
									},
									marks: [
										{
											type: 'someMark',
										},
									],
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'abc',
												},
											],
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'panel',
									attrs: {
										panelType: PanelType.INFO,
										panelColor: null,
										panelIcon: null,
										panelIconId: null,
										panelIconText: null,
									},
									content: [
										{
											attrs: {
												localId: null,
											},
											type: 'paragraph',
											content: [
												{
													type: 'text',
													text: 'abc',
												},
											],
										},
									],
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: {
													type: 'someMark',
												},
											},
										},
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: {
													nodeType: 'panel',
												},
												unsupported: {
													panelType: 'abc',
												},
											},
										},
									],
								},
							],
						},
					],
					[
						`should wrap an invalid and redundant node attribute into unsupportedNodeAttribute mark`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'status',
											attrs: {
												text: 'Hello',
												color: 'neutral',
												localId: '156a150d-f02c-4223-a7a2-0592e830be6f',
												style: 1234,
												invalid: 'invalidValue',
											},
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									attrs: {
										localId: null,
									},
									type: 'paragraph',
									content: [
										{
											type: 'status',
											attrs: {
												text: 'Hello',
												color: 'neutral',
												localId: '156a150d-f02c-4223-a7a2-0592e830be6f',
												style: '',
											},
											marks: [
												{
													type: 'unsupportedNodeAttribute',
													attrs: {
														type: {
															nodeType: 'status',
														},
														unsupported: {
															invalid: 'invalidValue',
															style: 1234,
														},
													},
												},
											],
										},
									],
								},
							],
						},
					],
					[
						`should wrap a redundant node attribute into unsupportedNodeAttribute mark
        for CodeBlock with breakout mark`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: 'javascript',
										invalid: 'invalidValue',
									},
									marks: [
										{
											type: 'breakout',
											attrs: {
												mode: 'wide',
												width: null,
											},
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: 'javascript',
										uniqueId: null,
									},
									marks: [
										{
											type: 'breakout',
											attrs: {
												mode: 'wide',
												width: null,
											},
										},
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: {
													nodeType: 'codeBlock',
												},
												unsupported: {
													invalid: 'invalidValue',
												},
											},
										},
									],
								},
							],
						},
					],
					[
						`should wrap a redundant node attribute into unsupportedNodeAttribute mark
        for CodeBlock with an invalid mark`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: 'javascript',
										invalid: 'invalidValue',
									},
									marks: [
										{
											type: 'breakout123',
											attrs: {
												mode: 'wide',
												width: null,
											},
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: 'javascript',
										uniqueId: null,
									},
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: {
													type: 'breakout123',
													attrs: {
														mode: 'wide',
														width: null,
													},
												},
											},
										},
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: {
													nodeType: 'codeBlock',
												},
												unsupported: {
													invalid: 'invalidValue',
												},
											},
										},
									],
								},
							],
						},
					],
					[
						`should wrap redundant and invalid node attributes into unsupportedNodeAttribute mark
        for CodeBlock with breakout mark`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: 123,
										invalid: 'invalidValue',
									},
									marks: [
										{
											type: 'breakout',
											attrs: {
												mode: 'wide',
												width: null,
											},
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: null,
										uniqueId: null,
									},
									marks: [
										{
											type: 'breakout',
											attrs: {
												width: null,
												mode: 'wide',
											},
										},
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: { nodeType: 'codeBlock' },
												unsupported: {
													invalid: 'invalidValue',
													language: 123,
												},
											},
										},
									],
								},
							],
						},
					],
					[
						`should wrap redundant and invalid node attributes into unsupportedNodeAttribute mark
        for CodeBlock with breakout mark`,
						{
							version: 1,
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: 123,
										invalid: 'invalidValue',
									},
									marks: [
										{
											type: 'breakoutInvalid',
											attrs: {
												width: null,
												mode: 'wide',
											},
										},
									],
								},
							],
						},
						{
							type: 'doc',
							content: [
								{
									type: 'codeBlock',
									attrs: {
										language: null,
										uniqueId: null,
									},
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: {
													type: 'breakoutInvalid',
													attrs: {
														mode: 'wide',
														width: null,
													},
												},
											},
										},
										{
											type: 'unsupportedNodeAttribute',
											attrs: {
												type: {
													nodeType: 'codeBlock',
												},
												unsupported: {
													invalid: 'invalidValue',
													language: 123,
												},
											},
										},
									],
								},
							],
						},
					],
				])('%s', (_, entity, expected) => {
					const result = processRawValue(schema, entity);
					expect(result).toBeDefined();
					expect(result!.toJSON()).toEqual(expected);
				});
			});
		});

		describe('Nodes with Multiple Validator Specs', () => {
			it(`should invoke error callback with  erorr code as "REDUNDANT_ATTRIBUTES"
        when we apply attribute to a mark which does not support any attributes
        and the node has multiple specs with multiple marks`, () => {
				const strongMarkWithAttribute = {
					type: 'strong',
					attrs: {
						bgStrong: 'red',
					},
				};
				const strikeMarkWithAttribute = {
					type: 'strike',
					attrs: {
						bg: 'red',
					},
				};
				const entity = {
					version: 1,
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Hello',
									marks: [strongMarkWithAttribute, strikeMarkWithAttribute],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, entity);

				const expected = {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Hello',
									marks: [
										{
											attrs: {
												originalValue: {
													attrs: {
														bgStrong: 'red',
													},
													type: 'strong',
												},
											},
											type: 'unsupportedMark',
										},
										{
											attrs: {
												originalValue: {
													attrs: {
														bg: 'red',
													},
													type: 'strike',
												},
											},
											type: 'unsupportedMark',
										},
									],
								},
							],
						},
					],
				};

				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it(`should wrap mark with unsupportedMark when we apply known and valid marks, and that marks
          does not support any attributes and the node has multiple validation specs`, () => {
				const strongMarkWithAttribute = {
					type: 'strong',
					attrs: {
						bgStrong: 'red',
					},
				};
				const strikeMarkWithAttribute = {
					type: 'strike',
					attrs: {
						bg: 'red',
					},
				};
				const initialEntity = {
					version: 1,
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Hello',
									marks: [strongMarkWithAttribute, strikeMarkWithAttribute],
								},
							],
						},
					],
				};
				const expected = {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Hello',
									marks: [
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: strongMarkWithAttribute,
											},
										},
										{
											type: 'unsupportedMark',
											attrs: {
												originalValue: strikeMarkWithAttribute,
											},
										},
									],
								},
							],
						},
					],
				};

				const result = processRawValue(schema, initialEntity);
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it(`should wrap unknown mark(s) with unsupportedMark's when a known and valid mark(s) are applied along
      with unknown mark(s) to a node(s) with multple specs.`, () => {
				const unknownFontSize = {
					type: 'fontSize',
					attrs: {
						mode: 'wide',
					},
				};
				const unknownBackground = {
					type: 'background',
					attrs: {
						mode: 'wide',
					},
				};
				const alignment = {
					type: 'alignment',
					attrs: {
						align: 'center',
					},
				};

				const code = {
					type: 'code',
				};
				const unknownTextBackground = {
					type: 'textBackground',
				};
				const unknownTextForeground = {
					type: 'textForeground',
				};

				const initialEntity = {
					version: 1,
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Some Text',
									marks: [code, unknownTextBackground, unknownTextForeground],
								},
							],
							marks: [alignment, unknownBackground, unknownFontSize],
						},
					],
				};
				/**
				 * Valid marks are also wrapped in unsupportedMark because
				 * For a node if none of the spec is valid we return the first Spec.
				 */
				const expected = {
					type: 'doc',
					content: [
						{
							attrs: {
								localId: null,
							},
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'Some Text',
									marks: [
										{
											type: 'unsupportedMark',
											attrs: { originalValue: code },
										},
										{
											type: 'unsupportedMark',
											attrs: { originalValue: unknownTextBackground },
										},
										{
											type: 'unsupportedMark',
											attrs: { originalValue: unknownTextForeground },
										},
									],
								},
							],
							marks: [
								{
									type: 'unsupportedMark',
									attrs: { originalValue: alignment },
								},
								{
									type: 'unsupportedMark',
									attrs: { originalValue: unknownBackground },
								},
								{
									type: 'unsupportedMark',
									attrs: { originalValue: unknownFontSize },
								},
							],
						},
					],
				};

				const result = processRawValue(schema, initialEntity);
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expected);
			});

			it('Inline comment on a Inline code when resolved should not wrap inline code in unsupportedMark', () => {
				const content = {
					attrs: {
						localId: null,
					},
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'This is ',
						},
						{
							type: 'text',
							text: 'some ',
							marks: [
								{
									type: 'code',
								},
							],
						},
						{
							type: 'text',
							text: 'inline',
							marks: [
								{
									type: 'code',
								},
								{
									type: 'annotation',
									attrs: {
										id: '80f91695-4e24-433d-93e1-6458b8bb12476',
										annotationType: 'inlineComment',
									},
								},
							],
						},
						{
							type: 'text',
							text: ' code',
							marks: [
								{
									type: 'code',
								},
							],
						},
					],
				};
				const initialEntity = {
					version: 1,
					type: 'doc',
					content: [content],
				};
				const expectedEntity = {
					type: 'doc',
					content: [content],
				};
				const result = processRawValue(schema, initialEntity);
				expect(result).toBeDefined();
				expect(result!.toJSON()).toEqual(expectedEntity);
			});
		});
	});
});
