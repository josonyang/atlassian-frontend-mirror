const mockStopMeasureDuration = 1234;
const mockStartTime = 1;
const mockResponseTime = 200;
jest.mock('@atlaskit/editor-common/performance-measures', () => ({
	...jest.requireActual<Object>('@atlaskit/editor-common/performance-measures'),
	startMeasure: jest.fn(),
	stopMeasure: jest.fn(
		(
			measureName: string,
			onMeasureComplete?: (measurement: {
				duration: number;
				startTime: number;
				distortedDuration: boolean;
			}) => void,
		) => {
			onMeasureComplete &&
				onMeasureComplete({
					duration: mockStopMeasureDuration,
					startTime: mockStartTime,
					distortedDuration: false,
				});
		},
	),
}));
jest.mock('@atlaskit/editor-common/performance/navigation', () => ({
	...jest.requireActual<Object>('@atlaskit/editor-common/performance/navigation'),
	getResponseEndTime: jest.fn(() => mockResponseTime),
}));

jest.mock('@atlaskit/editor-common/is-performance-api-available', () => ({
	...jest.requireActual<Object>('@atlaskit/editor-common/is-performance-api-available'),
	isPerformanceAPIAvailable: jest.fn(() => true),
}));

jest.mock('@atlaskit/editor-common/performance/measure-render', () => ({
	...jest.requireActual<Object>('@atlaskit/editor-common/performance/measure-render'),
	measureRender: jest.fn(async (name: string, callback: Function) => {
		await Promise.resolve(0);
		callback({
			duration: mockStopMeasureDuration,
			startTime: mockStartTime,
			distortedDuration: false,
		});
	}),
}));

jest.mock('@atlaskit/editor-plugin-base/src/pm-plugins/utils/inputTrackingConfig', () => ({
	inputTracking: {
		enabled: true,
		samplingRate: 1,
		countNodes: true,
		trackSeverity: true,
		trackRenderingTime: false,
		trackSingleKeypress: false,
		severityDegradedThreshold: 3000,
		severityNormalThreshold: 2000,
	},
}));

jest.mock('@atlaskit/editor-common/analytics', () => ({
	...jest.requireActual<Object>('@atlaskit/editor-common/analytics'),
	fireAnalyticsEvent: jest.fn(),
}));

import React from 'react';

import { createIntl } from 'react-intl-next';

import { FabricChannel } from '@atlaskit/analytics-listeners';
import { fireAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { FireAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import { type EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import * as ProcessRawValueModule from '@atlaskit/editor-common/process-raw-value';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type { PublicPluginAPI } from '@atlaskit/editor-common/types';
import { measureRender, SEVERITY, toJSON } from '@atlaskit/editor-common/utils';
import { replaceDocument } from '@atlaskit/editor-plugin-collab-edit/src/pm-plugins/utils';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugins/analytics';
import { EditorState } from '@atlaskit/editor-prosemirror/state';
import { type EditorView } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import createAnalyticsEventMock from '@atlaskit/editor-test-helpers/create-analytics-event-mock';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { blockquote, code_block, doc, p, mention } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { renderWithIntl } from '@atlaskit/editor-test-helpers/rtl';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
// Ignored via go/ees005
// eslint-disable-next-line import/no-named-as-default
import defaultSchema from '@atlaskit/editor-test-helpers/schema';
import type { MentionProvider } from '@atlaskit/mention/resource';
import { fg } from '@atlaskit/platform-feature-flags';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { mentionResourceProvider } from '@atlaskit/util-data-test/mention-story-data';
import { ffTest } from '@atlassian/feature-flags-test-utils';

import type { EditorConfig } from '../../../types/editor-config';
import {
	PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD,
	PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD,
} from '../../consts';
import { createUniversalPreset } from '../../create-universal-preset';
import ReactEditorView from '../../ReactEditorView';
import * as useDispatchTransactionModule from '../../ReactEditorView/useDispatchTransaction';

const initializeCollab = (view: EditorView) =>
	view.dispatch(view.state.tr.setMeta('collabInitialised', true));

export const editorAnalyticsChannel = FabricChannel.editor;

const portalProviderAPI: any = {
	render() {},
	remove() {},
};
const nodeViewPortalProviderAPI: any = {
	render() {},
	remove() {},
};

const getPromiseResolver = () => {
	let resolver = (_: unknown) => {};
	const requestPromise = new Promise((r) => {
		resolver = r;
	});
	return {
		resolver: () => resolver(true),
		requestPromise,
	};
};

const requiredProps = () => ({
	providerFactory: ProviderFactory.create({}),
	portalProviderAPI,
	nodeViewPortalProviderAPI,
	onEditorCreated: () => {},
	onEditorDestroyed: () => {},
	editorProps: {},
	intl: createIntl({ locale: 'en' }),
	preset: createUniversalPreset({ props: {} }),
	editorAPI: {},
});

const analyticsProps = () => ({
	allowAnalyticsGASV3: true,
	createAnalyticsEvent: createAnalyticsEventMock() as any,
});

type Props = {
	view: EditorView;
	config: EditorConfig;
};
describe('@atlaskit/editor-core', () => {
	let mockFire: ReturnType<FireAnalyticsEvent>;

	beforeEach(() => {
		mockFire = jest.fn();
		(fireAnalyticsEvent as jest.Mock).mockReturnValue(mockFire);
	});

	afterEach(jest.clearAllMocks);

	it('should trigger editor started analytics event', () => {
		renderWithIntl(<ReactEditorView {...requiredProps()} {...analyticsProps()} />);

		expect(mockFire).toHaveBeenCalledWith({
			payload: expect.objectContaining({
				action: 'started',
				actionSubject: 'editor',
			}),
		});
	});

	ffTest.on('platform_editor_reduce_scroll_jump_on_editor_start', '', () => {
		it('When the editor has already been scrolled, ReactEditorView persists the scroll on load', async () => {
			const mockElement = { scrollTop: 9001, scrollTo: jest.fn() };
			const querySelectorSpy = jest.spyOn(document, 'querySelector');
			// @ts-expect-error	mock implementation
			querySelectorSpy.mockImplementation(() => mockElement);

			renderWithIntl(
				// eslint-disable-next-line react/jsx-props-no-spreading
				<ReactEditorView {...{ ...requiredProps(), editorProps: { appearance: 'full-page' } }} />,
			);

			expect(mockElement.scrollTo).toHaveBeenCalledWith({ behavior: 'instant', top: 9001 });
		});
		it('When the editor has not already been scrolled, ReactEditorView does not attempt to scroll on load', async () => {
			const mockElement = { scrollTop: 0, scrollTo: jest.fn() };
			const querySelectorSpy = jest.spyOn(document, 'querySelector');
			// @ts-expect-error	mock implementation
			querySelectorSpy.mockImplementation(() => mockElement);

			renderWithIntl(
				// eslint-disable-next-line react/jsx-props-no-spreading
				<ReactEditorView {...{ ...requiredProps(), editorProps: { appearance: 'full-page' } }} />,
			);

			expect(mockElement.scrollTo).not.toHaveBeenCalled();
		});
	});

	describe('sanitize private content', () => {
		const document = doc(p('hello', mention({ id: '1', text: '@cheese' })(), '{endPos}'))(
			defaultSchema,
		);

		const mentionProvider: Promise<MentionProvider> = Promise.resolve(mentionResourceProvider);

		it('mentions should be sanitized when sanitizePrivateContent true', async () => {
			const editorProps = {
				defaultValue: toJSON(document),
				mentionProvider,
				sanitizePrivateContent: true,
			};
			const preset = createUniversalPreset({ props: editorProps });

			renderWithIntl(
				<ReactEditorView
					{...requiredProps()}
					preset={preset}
					editorProps={editorProps}
					providerFactory={ProviderFactory.create({ mentionProvider })}
				/>,
			);

			// Expect document changed with mention text attr empty
			const apiPromise = new Promise((resolve) => preset.apiResolver.on((api) => resolve(api)));
			const editorAPI = (await apiPromise) as PublicPluginAPI<[AnalyticsPlugin]>;
			const { resolver, requestPromise } = getPromiseResolver();

			editorAPI?.core.actions.requestDocument((document) => {
				expect(document).toEqual({
					type: 'doc',
					version: 1,
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'hello',
								},
								{
									type: 'mention',
									attrs: {
										id: '1',
										text: '',
										accessLevel: '',
									},
								},
							],
						},
					],
				});
				resolver();
			});
			(requestAnimationFrame as any).step();
			await requestPromise;
		});

		it('mentions should not be sanitized when sanitizePrivateContent false', async () => {
			const editorProps = {
				defaultValue: toJSON(document),
				sanitizePrivateContent: false,
				mentionProvider,
			};

			const preset = createUniversalPreset({ props: editorProps });

			renderWithIntl(
				<ReactEditorView
					{...requiredProps()}
					editorProps={editorProps}
					preset={preset}
					providerFactory={ProviderFactory.create({ mentionProvider })}
				/>,
			);

			const apiPromise = new Promise((resolve) => preset.apiResolver.on((api) => resolve(api)));
			const editorAPI = (await apiPromise) as PublicPluginAPI<[AnalyticsPlugin]>;
			const { resolver, requestPromise } = getPromiseResolver();

			// Expect document unchanged
			editorAPI?.core.actions.requestDocument((document) => {
				expect(document).toEqual({
					type: 'doc',
					version: 1,
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'hello',
								},
								{
									type: 'mention',
									attrs: {
										id: '1',
										text: '@cheese',
										accessLevel: '',
									},
								},
							],
						},
					],
				});
				resolver();
			});
			(requestAnimationFrame as any).step();
			await requestPromise;
		});

		it('mentions should not be sanitized when no collabEdit options', async () => {
			const editorProps = {
				defaultValue: toJSON(document),
				mentionProvider,
			};
			const preset = createUniversalPreset({ props: editorProps });

			renderWithIntl(
				<ReactEditorView
					{...requiredProps()}
					editorProps={editorProps}
					preset={preset}
					providerFactory={ProviderFactory.create({ mentionProvider })}
				/>,
			);

			const apiPromise = new Promise((resolve) => preset.apiResolver.on((api) => resolve(api)));
			const editorAPI = (await apiPromise) as PublicPluginAPI<[AnalyticsPlugin]>;
			const { resolver, requestPromise } = getPromiseResolver();

			// Expect document unchanged
			editorAPI?.core.actions.requestDocument((document) => {
				expect(document).toEqual({
					type: 'doc',
					version: 1,
					content: [
						{
							type: 'paragraph',
							content: [
								{
									type: 'text',
									text: 'hello',
								},
								{
									type: 'mention',
									attrs: {
										id: '1',
										text: '@cheese',
										accessLevel: '',
									},
								},
							],
						},
					],
				});
				resolver();
			});
			(requestAnimationFrame as any).step();
			await requestPromise;
		});
	});

	describe('onEditorViewStateUpdated', () => {
		describe('when EditorView dispatch is called', () => {
			it('should call onEditorViewStateUpdated from editor configuration', () => {
				const document = doc(p('hello{endPos}'))(defaultSchema);
				const mock = jest.fn();
				const onEditorCreated = ({ view, config }: Props) => {
					config.onEditorViewStateUpdatedCallbacks.push({
						pluginName: 'mock',
						callback: mock,
					});

					const { tr } = view!.state;
					tr.setMeta('lol', 'lol');
					view!.dispatch(tr);
				};
				renderWithIntl(
					<ReactEditorView
						{...requiredProps()}
						onEditorCreated={onEditorCreated}
						editorProps={{ defaultValue: toJSON(document) }}
					/>,
				);

				expect(mock).toHaveBeenCalled();
			});
		});
	});

	describe('Remote onChange', () => {
		const document = doc(p('hello{endPos}'))(defaultSchema);
		let onChange = jest.fn();

		beforeEach(() => {
			onChange = jest.fn();
		});

		describe('when transaction is local', () => {
			it('should be called with source local', () => {
				const onEditorCreated = ({ view, config }: Props) => {
					const { tr } = view!.state;
					tr.insertText('a', 2);
					view!.dispatch(tr);
				};
				renderWithIntl(
					<ReactEditorView
						{...requiredProps()}
						onEditorCreated={onEditorCreated}
						editorProps={{ defaultValue: toJSON(document), onChange }}
					/>,
				);

				expect(onChange).toHaveBeenCalledTimes(1);
				expect(onChange).toHaveBeenCalledWith(expect.anything(), {
					source: 'local',
				});
			});
		});
		describe('when transaction is remote', () => {
			it('should be called with source remote', () => {
				const onEditorCreated = ({ view, config }: Props) => {
					const { tr } = view!.state;
					tr.setMeta('isRemote', 'true');
					tr.insertText('a', 2);
					view!.dispatch(tr);
				};

				renderWithIntl(
					<ReactEditorView
						{...requiredProps()}
						onEditorCreated={onEditorCreated}
						editorProps={{ defaultValue: toJSON(document), onChange }}
					/>,
				);

				expect(onChange).toHaveBeenCalledTimes(1);
				expect(onChange).toHaveBeenCalledWith(expect.anything(), {
					source: 'remote',
				});
			});
		});

		describe('when transaction does not change the document', () => {
			it('should not be called', () => {
				const onEditorCreated = ({ view, config }: Props) => {
					const { tr } = view!.state;
					tr.setMeta('isRemote', 'true');
					view!.dispatch(tr);
				};

				const editorProps = { defaultValue: toJSON(document), onChange };
				renderWithIntl(
					<ReactEditorView
						{...requiredProps()}
						onEditorCreated={onEditorCreated}
						preset={createUniversalPreset({ props: editorProps })}
						editorProps={editorProps}
					/>,
				);

				expect(onChange).not.toHaveBeenCalled();
			});
		});
	});

	describe('proseMirrorRenderedSeverity', () => {
		it.each`
			condition                                                                         | threshold                                               | severity
			${'when duration <= NORMAL_SEVERITY_THRESHOLD'}                                   | ${PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD}       | ${SEVERITY.NORMAL}
			${'when duration > NORMAL_SEVERITY_THRESHOLD and <= DEGRADED_SEVERITY_THRESHOLD'} | ${PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD + 1}   | ${SEVERITY.DEGRADED}
			${'when duration > DEGRADED_SEVERITY_THRESHOLD'}                                  | ${PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD + 1} | ${SEVERITY.BLOCKING}
		`('should set $severity to severity when $condition', ({ condition, threshold, severity }) => {
			(measureRender as any).mockImplementationOnce((name: any, callback: any) => {
				callback && requestAnimationFrame(() => callback({ duration: threshold, startTime: 1 }));
			});

			const editorProps = {};

			renderWithIntl(
				<ReactEditorView
					{...requiredProps()}
					{...analyticsProps()}
					preset={createUniversalPreset({ props: editorProps })}
					editorProps={editorProps}
				/>,
			);

			(requestAnimationFrame as any).step();

			expect(mockFire).toHaveBeenLastCalledWith({
				payload: expect.objectContaining({
					attributes: expect.objectContaining({
						severity,
					}),
				}),
			});
		});
	});

	describe('resetEditorState', () => {
		it('should call createEditorState', async () => {
			const dispatcherRef: { current: EventDispatcher | null } = { current: null };
			const document = doc(p('hello{endPos}'))(defaultSchema);
			const editorProps = { defaultValue: toJSON(document) };

			const preset = createUniversalPreset({ props: editorProps });

			renderWithIntl(
				<ReactEditorView
					{...requiredProps()}
					preset={preset}
					editorProps={editorProps}
					onEditorCreated={({ eventDispatcher }) => {
						dispatcherRef.current = eventDispatcher;
					}}
				/>,
			);
			const apiPromise = new Promise((resolve) => preset.apiResolver.on((api) => resolve(api)));
			const editorAPI = (await apiPromise) as PublicPluginAPI<[AnalyticsPlugin]>;
			const { resolver, requestPromise } = getPromiseResolver();

			const mock = jest.spyOn(EditorState, 'create');
			dispatcherRef.current?.emit('resetEditorState', { doc: '', shouldScrollToBottom: false });

			expect(mock).toHaveBeenCalled();
			editorAPI?.core.actions.requestDocument((document) => {
				expect(document).toStrictEqual({
					version: 1,
					type: 'doc',
					content: [],
				});
				resolver();
			});
			(requestAnimationFrame as any).step();
			await requestPromise;
		});

		it('should not create a new schema when resetting editorState', async () => {
			const dispatcherRef: { current: EventDispatcher | null } = { current: null };
			const preset = createUniversalPreset({ props: {} });

			renderWithIntl(
				<ReactEditorView
					{...requiredProps()}
					preset={preset}
					onEditorCreated={({ eventDispatcher }) => {
						dispatcherRef.current = eventDispatcher;
					}}
				/>,
			);
			const apiPromise = new Promise((resolve) => preset.apiResolver.on((api) => resolve(api)));
			const editorAPI = (await apiPromise) as PublicPluginAPI<[AnalyticsPlugin]>;

			const schema = editorAPI?.core.actions.createTransformer(
				(schema) =>
					// @ts-expect-error - hacky way to access internal schema
					schema,
			);
			expect(schema).not.toBeNull();
			dispatcherRef.current?.emit('resetEditorState', { doc: '', shouldScrollToBottom: false });

			const newSchema = editorAPI?.core.actions.createTransformer(
				(schema) =>
					// @ts-expect-error - hacky way to access internal schema
					schema,
			);

			expect(schema === newSchema).toBeTruthy();
		});
	});

	ffTest.on(
		'editor_load_conf_collab_docs_without_checks',
		'calling processRawValue in createEditorState',
		() => {
			it('When setup without the collab plugin -- should call processRawValue', () => {
				// call feature gate to avoid the ffTest failing
				fg('editor_load_conf_collab_docs_without_checks');
				const mockDocument = doc(p('example doc'))(defaultSchema).toJSON();
				const processRawValueSpy = jest.spyOn(ProcessRawValueModule, 'processRawValue');
				const { editorView } = createEditorFactory()({
					editorProps: {
						defaultValue: mockDocument,
					},
				});

				expect(processRawValueSpy).toHaveBeenCalledTimes(1);

				expect(editorView.state.doc.toJSON()).toEqual({
					...mockDocument,
					version: undefined,
				});
			});

			it('When setup with the collab plugin -- should not call processRawValue', () => {
				const mockDocument = doc(p('example doc'))(defaultSchema).toJSON();
				const processRawValueSpy = jest.spyOn(ProcessRawValueModule, 'processRawValue');
				const processRawValueWithoutValidationSpy = jest.spyOn(
					ProcessRawValueModule,
					'processRawValueWithoutValidation',
				);

				const { editorView } = createEditorFactory()({
					editorProps: {
						defaultValue: mockDocument,
						collabEdit: {},
					},
				});

				expect(processRawValueSpy).not.toHaveBeenCalled();
				expect(processRawValueWithoutValidationSpy).toHaveBeenCalledTimes(1);

				expect(editorView.state.doc.toJSON()).toEqual({
					...mockDocument,
					version: undefined,
				});
			});

			it('When setup with the collab plugin -- with string document', () => {
				const mockDocument =
					'{"type":"doc","content":[{"type":"blockquote","content":[{"type":"codeBlock","attrs":{"language":null,"uniqueId":null}}]}]}';
				const processRawValueSpy = jest.spyOn(ProcessRawValueModule, 'processRawValue');
				const processRawValueWithoutValidationSpy = jest.spyOn(
					ProcessRawValueModule,
					'processRawValueWithoutValidation',
				);

				const { editorView } = createEditorFactory()({
					editorProps: {
						defaultValue: mockDocument,
						collabEdit: {},
					},
				});

				expect(processRawValueSpy).not.toHaveBeenCalled();
				expect(processRawValueWithoutValidationSpy).toHaveBeenCalledTimes(1);

				expect(editorView.state.doc.toJSON()).toEqual(
					doc(blockquote(code_block()()))(defaultSchema).toJSON(),
				);
			});
		},
	);

	ffTest.off(
		'editor_load_conf_collab_docs_without_checks',
		'calling processRawValue in createEditorState',
		() => {
			// Ignored via go/ees005
			// eslint-disable-next-line jest/no-identical-title
			it('When setup without the collab plugin -- should call processRawValue', () => {
				// call feature gate to avoid the ffTest failing
				fg('editor_load_conf_collab_docs_without_checks');
				const mockDocument = doc(p('example doc'))(defaultSchema).toJSON();
				const processRawValueSpy = jest.spyOn(ProcessRawValueModule, 'processRawValue');

				const { editorView } = createEditorFactory()({
					editorProps: {
						defaultValue: mockDocument,
					},
				});

				expect(processRawValueSpy).toHaveBeenCalledTimes(1);

				expect(editorView.state.doc.toJSON()).toEqual({
					...mockDocument,
					version: undefined,
				});
			});

			it('When setup with the collab plugin -- should call processRawValue', () => {
				const mockDocument = doc(p('example doc'))(defaultSchema).toJSON();
				const processRawValueSpy = jest.spyOn(ProcessRawValueModule, 'processRawValue');
				const processRawValueWithoutValidationSpy = jest.spyOn(
					ProcessRawValueModule,
					'processRawValueWithoutValidation',
				);

				const { editorView } = createEditorFactory()({
					editorProps: {
						defaultValue: mockDocument,
						collabEdit: {},
					},
				});

				expect(processRawValueSpy).toHaveBeenCalledTimes(1);
				expect(processRawValueWithoutValidationSpy).not.toHaveBeenCalled();

				expect(editorView.state.doc.toJSON()).toEqual({
					...mockDocument,
					version: undefined,
				});
			});

			it('When setup with the collab plugin --- with string document', () => {
				const mockDocument =
					'{"type":"doc","content":[{"type":"blockquote","content":[{"type":"codeBlock","attrs":{"language":null,"uniqueId":null}}]}]}';
				const processRawValueSpy = jest.spyOn(ProcessRawValueModule, 'processRawValue');
				const processRawValueWithoutValidationSpy = jest.spyOn(
					ProcessRawValueModule,
					'processRawValueWithoutValidation',
				);

				const { editorView } = createEditorFactory()({
					editorProps: {
						defaultValue: mockDocument,
						collabEdit: {},
					},
				});

				expect(processRawValueSpy).toHaveBeenCalledTimes(1);
				expect(processRawValueWithoutValidationSpy).not.toHaveBeenCalled();

				expect(editorView.state.doc.toJSON()).toEqual(
					doc(blockquote(code_block()()))(defaultSchema).toJSON(),
				);
			});
		},
	);

	describe('Allowing remote replaceDocument transactions to skip validation', () => {
		let useDispatchTransactionSpy: jest.SpyInstance;

		beforeEach(() => {
			useDispatchTransactionSpy = jest.spyOn(
				useDispatchTransactionModule,
				'useDispatchTransaction',
			);
		});

		afterEach(() => {
			useDispatchTransactionSpy.mockRestore();
		});

		it('should pass isRemoteReplaceDocumentTransaction() to useDispatchTransaction if collab plugin is in use', () => {
			createEditorFactory()({
				doc: doc(p('hello world')),
				editorProps: {
					collabEdit: {},
				},
			});

			expect(useDispatchTransactionSpy).toHaveBeenCalledWith(
				expect.objectContaining({
					isRemoteReplaceDocumentTransaction: expect.any(Function),
				}),
			);
		});

		it('should not pass isRemoteReplaceDocumentTransaction() to useDispatchTransaction if collab plugin is not in use', () => {
			createEditorFactory()({
				doc: doc(p('hello world')),
				editorProps: {},
			});

			expect(useDispatchTransactionSpy).not.toHaveBeenCalledWith(
				expect.objectContaining({
					isRemoteReplaceDocumentTransaction: expect.any(Function),
				}),
			);
		});

		ffTest.on(
			'platform_editor_transaction_skip_validation',
			'should skip validation of a remote replaceDocument transaction if feature flag is enabled',
			() => {
				it('useDispatchTransaction should allow invalid nodes in the transaction when remote replaceDocument transaction is invoked', () => {
					const onChange = jest.fn();

					const { editorView } = createEditorFactory()({
						doc: doc(p('hello world')),
						editorProps: {
							collabEdit: {},
							allowLayouts: true,
							onChange,
						},
					});

					initializeCollab(editorView);

					const mockDocument = {
						type: 'doc',
						content: [
							{
								type: 'blockquote',
								content: [
									{
										type: 'layoutSection',
										content: [
											{
												type: 'layoutColumn',
												attrs: {
													width: 33.33,
												},
												content: [
													{
														type: 'paragraph',
														attrs: {
															localId: null,
														},
														content: [
															{
																type: 'text',
																text: 'This column is a 1/3rd.',
															},
														],
													},
												],
											},
											{
												type: 'layoutColumn',
												attrs: {
													width: 66.66,
												},
												content: [
													{
														type: 'paragraph',
														attrs: {
															localId: null,
														},
														content: [
															{
																type: 'text',
																text: 'This column is 2/3rds.',
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

					const tr = replaceDocument(mockDocument, editorView.state);
					tr.setMeta('isRemote', true);
					editorView.dispatch(tr);

					expect(editorView.state.doc.toJSON()).toEqual(mockDocument);
				});
			},
		);

		it('useDispatchTransaction should not allow invalid nodes in the transaction if its not a remote replaceDocument transaction', () => {
			const { editorView, editorAPI } = createEditorFactory()({
				doc: doc(p('hello world')),
				editorProps: {
					allowLayouts: true,
				},
			});

			const mockDocument = {
				type: 'doc',
				content: [
					{
						type: 'blockquote',
						content: [
							{
								type: 'layoutSection',
								content: [
									{
										type: 'layoutColumn',
										attrs: {
											width: 33.33,
										},
										content: [
											{
												type: 'paragraph',
												attrs: {
													localId: null,
												},
												content: [
													{
														type: 'text',
														text: 'This column is a 1/3rd.',
													},
												],
											},
										],
									},
									{
										type: 'layoutColumn',
										attrs: {
											width: 66.66,
										},
										content: [
											{
												type: 'paragraph',
												attrs: {
													localId: null,
												},
												content: [
													{
														type: 'text',
														text: 'This column is 2/3rds.',
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

			editorAPI?.core.actions.replaceDocument(mockDocument, { skipValidation: true });
			expect(editorView.state.doc.toJSON()).toEqual(doc(p('hello world'))(defaultSchema).toJSON());
		});

		ffTest.off(
			'platform_editor_transaction_skip_validation',
			'with skip validation for remote replaceDocument transactions flag disabled',
			() => {
				it('useDispatchTransaction does not allow invalid nodes in a remote replaceDocument transaction when collab edit plugin is in use', () => {
					const { editorView, editorAPI } = createEditorFactory()({
						doc: doc(p('hello world')),
						editorProps: {
							collabEdit: {},
							allowLayouts: true,
						},
					});

					initializeCollab(editorView);

					const mockDocument = {
						type: 'doc',
						content: [
							{
								type: 'blockquote',
								content: [
									{
										type: 'layoutSection',
										content: [
											{
												type: 'layoutColumn',
												attrs: {
													width: 33.33,
												},
												content: [
													{
														type: 'paragraph',
														attrs: {
															localId: null,
														},
														content: [
															{
																type: 'text',
																text: 'This column is a 1/3rd.',
															},
														],
													},
												],
											},
											{
												type: 'layoutColumn',
												attrs: {
													width: 66.66,
												},
												content: [
													{
														type: 'paragraph',
														attrs: {
															localId: null,
														},
														content: [
															{
																type: 'text',
																text: 'This column is 2/3rds.',
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

					editorAPI?.core.actions.replaceDocument(mockDocument, { skipValidation: true });
					expect(editorView.state.doc.toJSON()).toEqual(doc(p())(defaultSchema).toJSON());
				});
			},
		);
	});
});
