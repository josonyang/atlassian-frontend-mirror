import React from 'react';

import { injectIntl } from 'react-intl-next';
import type { WrappedComponentProps } from 'react-intl-next';
import uuid from 'uuid/v4';

import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next/types';
import {
	ACTION,
	ACTION_SUBJECT,
	EVENT_TYPE,
	fireAnalyticsEvent,
	FULL_WIDTH_MODE,
	getAnalyticsEventsFromTransaction,
	PLATFORMS,
} from '@atlaskit/editor-common/analytics';
import type {
	AnalyticsDispatch,
	AnalyticsEventPayload,
	DispatchAnalyticsEvent,
	FireAnalyticsCallback,
	PluginPerformanceReportData,
	SimplifiedNode,
} from '@atlaskit/editor-common/analytics';
import { browser } from '@atlaskit/editor-common/browser';
import { getDocStructure } from '@atlaskit/editor-common/core-utils';
import { countNodes } from '@atlaskit/editor-common/count-nodes';
import type { ErrorReporter } from '@atlaskit/editor-common/error-reporter';
import { createDispatch, EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import type { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import { getEnabledFeatureFlagKeys } from '@atlaskit/editor-common/normalize-feature-flags';
import { startMeasure, stopMeasure } from '@atlaskit/editor-common/performance-measures';
import { measureRender } from '@atlaskit/editor-common/performance/measure-render';
import { getResponseEndTime } from '@atlaskit/editor-common/performance/navigation';
import type { PortalProviderAPI } from '@atlaskit/editor-common/portal';
import type {
	AllEditorPresetPluginTypes,
	EditorPresetBuilder,
} from '@atlaskit/editor-common/preset';
import { EditorPluginInjectionAPI } from '@atlaskit/editor-common/preset';
import {
	processRawValue,
	processRawValueWithoutValidation,
} from '@atlaskit/editor-common/process-raw-value';
import type {
	ContextIdentifierProvider,
	ProviderFactory,
} from '@atlaskit/editor-common/provider-factory';
import type {
	EditorAppearance,
	EditorPlugin,
	FeatureFlags,
	PublicPluginAPI,
	Transformer,
} from '@atlaskit/editor-common/types';
import { ReactEditorViewContext } from '@atlaskit/editor-common/ui-react';
import {
	analyticsEventKey,
	getAnalyticsEventSeverity,
	type SEVERITY,
} from '@atlaskit/editor-common/utils/analytics';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { Plugin, Transaction } from '@atlaskit/editor-prosemirror/state';
import { EditorState, Selection, TextSelection } from '@atlaskit/editor-prosemirror/state';
import { EditorView } from '@atlaskit/editor-prosemirror/view';
import type { DirectEditorProps } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';

import type { EditorConfig, EditorProps } from '../types';
import type { EditorNextProps } from '../types/editor-props';
import { findChangedNodesFromTransaction } from '../utils/findChangedNodesFromTransaction';
import { getNodesCount } from '../utils/getNodesCount';
import { isFullPage } from '../utils/is-full-page';
import { RenderTracking } from '../utils/performance/components/RenderTracking';
import measurements from '../utils/performance/measure-enum';
import { PluginPerformanceObserver } from '../utils/performance/plugin-performance-observer';
import { freezeUnsafeTransactionProperties } from '../utils/performance/safer-transactions';
import { EVENT_NAME_ON_CHANGE } from '../utils/performance/track-transactions';
import { validateNodes, validNode } from '../utils/validateNodes';

import {
	PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD,
	PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD,
} from './consts';
import { createErrorReporter, createPMPlugins, processPluginsList } from './create-editor';
import createPluginsList from './create-plugins-list';
import { createSchema } from './create-schema';
import { createFeatureFlagsFromProps } from './feature-flags-from-props';
import { editorMessages } from './messages';

const EDIT_AREA_ID = 'ak-editor-textarea';

export interface EditorViewProps {
	editorProps: (EditorProps | EditorNextProps) & {
		preset?: EditorNextProps['preset'];
	};
	createAnalyticsEvent?: CreateUIAnalyticsEvent;
	providerFactory: ProviderFactory;
	portalProviderAPI: PortalProviderAPI;
	nodeViewPortalProviderAPI: PortalProviderAPI;
	disabled?: boolean;
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	editorAPI: PublicPluginAPI<any> | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setEditorAPI?: (editorApi: PublicPluginAPI<any>) => void;
	render?: (props: {
		editor: JSX.Element;
		view?: EditorView;
		config: EditorConfig;
		eventDispatcher: EventDispatcher;
		transformer?: Transformer<string>;
		dispatchAnalyticsEvent: DispatchAnalyticsEvent;
		editorRef: React.RefObject<HTMLDivElement>;
		// We can't know this type at runtime
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		editorAPI: PublicPluginAPI<any> | undefined;
	}) => JSX.Element;
	onEditorCreated: (instance: {
		view: EditorView;
		config: EditorConfig;
		eventDispatcher: EventDispatcher;
		transformer?: Transformer<string>;
	}) => void;
	onEditorDestroyed: (instance: {
		view: EditorView;
		config: EditorConfig;
		eventDispatcher: EventDispatcher;
		transformer?: Transformer<string>;
	}) => void;
	preset: EditorPresetBuilder<string[], AllEditorPresetPluginTypes[]>;
}

function handleEditorFocus(view: EditorView): number | undefined {
	if (view.hasFocus()) {
		return;
	}

	return window.setTimeout(() => {
		if (view.hasFocus()) {
			return;
		}
		if (!window.getSelection) {
			view.focus();
			return;
		}
		const domSelection = window.getSelection();
		if (!domSelection || domSelection.rangeCount === 0) {
			view.focus();
			return;
		}
		const range = domSelection.getRangeAt(0);
		// if selection is outside editor focus and exit
		if (range.startContainer.contains(view.dom)) {
			view.focus();
			return;
		}
		// set cursor/selection and focus
		const anchor = view.posAtDOM(range.startContainer, range.startOffset);
		const head = view.posAtDOM(range.endContainer, range.endOffset);
		// if anchor or head < 0 focus and exit
		if (anchor < 0 || head < 0) {
			view.focus();
			return;
		}
		const selection = TextSelection.create(view.state.doc, anchor, head);
		const tr = view.state.tr.setSelection(selection);
		view.dispatch(tr);
		view.focus();
	}, 0);
}

interface CreateEditorStateOptions {
	props: EditorViewProps;
	doc?: string | Object | PMNode;
	resetting?: boolean;
	selectionAtStart?: boolean;
}

// Ignored via go/ees005
// eslint-disable-next-line @repo/internal/react/no-class-components
export class ReactEditorView<T = Object> extends React.Component<
	EditorViewProps & WrappedComponentProps & T,
	Object
> {
	view?: EditorView;
	eventDispatcher: EventDispatcher;
	contentTransformer?: Transformer<string>;
	config!: EditorConfig;
	editorState: EditorState;
	errorReporter: ErrorReporter;
	dispatch: Dispatch;
	proseMirrorRenderedSeverity?: SEVERITY;

	editorRef = React.createRef<HTMLDivElement>();

	// ProseMirror is instantiated prior to the initial React render cycle,
	// so we allow transactions by default, to avoid discarding the initial one.
	private canDispatchTransactions = true;

	private focusTimeoutId?: number;
	private reliabilityInterval?: number;

	private pluginPerformanceObserver: PluginPerformanceObserver;

	private featureFlags: FeatureFlags;

	private pluginInjectionAPI: EditorPluginInjectionAPI;

	private onPluginObservation = (report: PluginPerformanceReportData) => {
		this.dispatchAnalyticsEvent({
			action: ACTION.TRANSACTION_DISPATCHED,
			actionSubject: ACTION_SUBJECT.EDITOR,
			eventType: EVENT_TYPE.OPERATIONAL,
			attributes: {
				report,
				participants:
					this.pluginInjectionAPI
						.api()
						.collabEdit?.sharedState.currentState()
						?.participants?.size() || 1,
			},
		});
	};

	//TODO: clean up
	get transactionTracking() {
		return {
			enabled: false,
		};
	}

	private getPluginNames() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return this.editorState.plugins.map((p: any) => p.key);
	}

	private countNodes() {
		return countNodes(this.editorState);
	}

	constructor(props: EditorViewProps & WrappedComponentProps & T) {
		super(props);

		this.pluginInjectionAPI = new EditorPluginInjectionAPI({
			getEditorState: this.getEditorState,
			getEditorView: this.getEditorView,
			fireAnalyticsEvent: this.handleAnalyticsEvent,
		});

		const api = this.pluginInjectionAPI.api();
		props.setEditorAPI?.(api);

		this.eventDispatcher = new EventDispatcher();

		this.dispatch = createDispatch(this.eventDispatcher);
		this.errorReporter = createErrorReporter(props.editorProps.errorReporterHandler);

		this.pluginPerformanceObserver = new PluginPerformanceObserver((report) =>
			this.onPluginObservation(report),
		)
			.withPlugins(() => this.getPluginNames())
			.withNodeCounts(() => this.countNodes());

		this.featureFlags = createFeatureFlagsFromProps(this.props.editorProps.featureFlags);
		const featureFlagsEnabled = this.featureFlags
			? getEnabledFeatureFlagKeys(this.featureFlags)
			: [];

		// This needs to be before initialising editorState because
		// we dispatch analytics events in plugin initialisation
		this.eventDispatcher.on(analyticsEventKey, this.handleAnalyticsEvent);

		this.eventDispatcher.on('resetEditorState', this.resetEditorState);

		this.editorState = this.createEditorState({
			props,
			doc: props.editorProps.defaultValue,
			// ED-4759: Don't set selection at end for full-page editor - should be at start.
			selectionAtStart: isFullPage(props.editorProps.appearance),
		});

		this.dispatchAnalyticsEvent({
			action: ACTION.STARTED,
			actionSubject: ACTION_SUBJECT.EDITOR,
			attributes: {
				platform: PLATFORMS.WEB,
				featureFlags: featureFlagsEnabled,
			},
			eventType: EVENT_TYPE.UI,
		});
	}

	getEditorState = () => this.view?.state;
	getEditorView = () => this.view;

	// Ignored via go/ees005
	// eslint-disable-next-line react/no-unsafe
	UNSAFE_componentWillReceiveProps(nextProps: EditorViewProps) {
		if (this.view && this.props.editorProps.disabled !== nextProps.editorProps.disabled) {
			// Disables the contentEditable attribute of the editor if the editor is disabled
			this.view.setProps({
				editable: (_state) => !nextProps.editorProps.disabled,
			} as DirectEditorProps);

			if (!nextProps.editorProps.disabled && nextProps.editorProps.shouldFocus) {
				this.focusTimeoutId = handleEditorFocus(this.view);
			}
		}

		const { appearance } = this.props.editorProps;
		const { appearance: nextAppearance } = nextProps.editorProps;

		if (this.props.preset !== nextProps.preset) {
			this.reconfigureState(nextProps);
		}

		if (nextAppearance !== appearance) {
			if (nextAppearance === 'full-width' || appearance === 'full-width') {
				this.dispatchAnalyticsEvent({
					action: ACTION.CHANGED_FULL_WIDTH_MODE,
					actionSubject: ACTION_SUBJECT.EDITOR,
					eventType: EVENT_TYPE.TRACK,
					attributes: {
						previousMode: this.formatFullWidthAppearance(appearance),
						newMode: this.formatFullWidthAppearance(nextAppearance),
					},
				});
			}
		}

		if (
			nextProps.editorProps.assistiveLabel !== this.props.editorProps.assistiveLabel ||
			nextProps.editorProps?.assistiveDescribedBy !== this.props.editorProps?.assistiveDescribedBy
		) {
			this.editor = this.createEditor(
				nextProps.editorProps.assistiveLabel,
				nextProps.editorProps?.assistiveDescribedBy,
			);
		}
	}

	formatFullWidthAppearance = (appearance: EditorAppearance | undefined): FULL_WIDTH_MODE => {
		if (appearance === 'full-width') {
			return FULL_WIDTH_MODE.FULL_WIDTH;
		}
		return FULL_WIDTH_MODE.FIXED_WIDTH;
	};

	resetEditorState = ({
		doc,
		shouldScrollToBottom,
	}: {
		doc: string;
		shouldScrollToBottom: boolean;
	}) => {
		if (!this.view) {
			return;
		}

		// We cannot currently guarentee when all the portals will have re-rendered during a reconfigure
		// so we blur here to stop ProseMirror from trying to apply selection to detached nodes or
		// nodes that haven't been re-rendered to the document yet.
		this.blur();

		this.featureFlags = createFeatureFlagsFromProps(this.props.editorProps.featureFlags);

		this.editorState = this.createEditorState({
			props: this.props,
			doc: doc,
			resetting: true,
			selectionAtStart: !shouldScrollToBottom,
		});

		this.view.updateState(this.editorState);
		this.props.editorProps.onChange?.(this.view, { source: 'local' });
	};

	blur = () => {
		if (!this.view) {
			return;
		}

		if (this.view.dom instanceof HTMLElement && this.view.hasFocus()) {
			this.view.dom.blur();
		}

		// The selectionToDOM method uses the document selection to determine currently selected node
		// We need to mimic blurring this as it seems doing the above is not enough.
		// @ts-expect-error
		const sel = (this.view.root as DocumentOrShadowRoot).getSelection();
		if (sel) {
			sel.removeAllRanges();
		}
	};

	reconfigureState(props: EditorViewProps) {
		if (!this.view) {
			return;
		}

		// We cannot currently guarentee when all the portals will have re-rendered during a reconfigure
		// so we blur here to stop ProseMirror from trying to apply selection to detached nodes or
		// nodes that haven't been re-rendered to the document yet.
		this.blur();

		const editorPlugins = this.getPlugins(props.preset);

		this.config = processPluginsList(editorPlugins);

		const state = this.editorState;

		const plugins = createPMPlugins({
			schema: state.schema,
			dispatch: this.dispatch,
			errorReporter: this.errorReporter,
			editorConfig: this.config,
			eventDispatcher: this.eventDispatcher,
			providerFactory: props.providerFactory,
			portalProviderAPI: props.portalProviderAPI,
			nodeViewPortalProviderAPI: props.nodeViewPortalProviderAPI,
			dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
			featureFlags: createFeatureFlagsFromProps(props.editorProps.featureFlags),
			getIntl: () => this.props.intl,
			onEditorStateUpdated: fg('platform_editor_catch_missing_injection_states')
				? this.pluginInjectionAPI.onEditorViewUpdated
				: undefined,
		});

		const newState = state.reconfigure({ plugins: plugins as Plugin[] });

		// need to update the state first so when the view builds the nodeviews it is
		// using the latest plugins
		this.view.updateState(newState);

		return this.view.update({ ...this.view.props, state: newState });
	}

	handleAnalyticsEvent: FireAnalyticsCallback = (payload) => {
		fireAnalyticsEvent(this.props.createAnalyticsEvent)(payload);
	};

	componentDidMount() {
		// Transaction dispatching is already enabled by default prior to
		// mounting, but we reset it here, just in case the editor view
		// instance is ever recycled (mounted again after unmounting) with
		// the same key.
		// Although storing mounted state is an anti-pattern in React,
		// we do so here so that we can intercept and abort asynchronous
		// ProseMirror transactions when a dismount is imminent.
		this.canDispatchTransactions = true;
	}

	/**
	 * Clean up any non-PM resources when the editor is unmounted
	 */
	componentWillUnmount() {
		// We can ignore any transactions from this point onwards.
		// This serves to avoid potential runtime exceptions which could arise
		// from an async dispatched transaction after it's unmounted.
		this.canDispatchTransactions = false;

		clearTimeout(this.focusTimeoutId);
		if (this.reliabilityInterval) {
			clearInterval(this.reliabilityInterval);
		}

		this.pluginPerformanceObserver.disconnect();

		if (this.view) {
			// Destroy the state if the Editor is being unmounted
			const editorState = this.view.state;
			editorState.plugins.forEach((plugin) => {
				const state = plugin.getState(editorState);
				if (state && state.destroy) {
					state.destroy();
				}
			});
		}

		this.eventDispatcher.destroy();
		// this.view will be destroyed when React unmounts in handleEditorViewRef
	}

	private editorPlugins: EditorPlugin[] = [];

	// Helper to allow tests to inject plugins directly
	getPlugins(preset: EditorPresetBuilder<string[], AllEditorPresetPluginTypes[]>): EditorPlugin[] {
		const plugins = createPluginsList(preset, this.props.editorProps, this.pluginInjectionAPI);

		this.editorPlugins = plugins;

		return this.editorPlugins;
	}

	createEditorState = (options: CreateEditorStateOptions) => {
		let schema;
		if (this.view) {
			if (options.resetting) {
				/**
				 * ReactEditorView currently does NOT handle dynamic schema,
				 * We are reusing the existing schema, and rely on #reconfigureState
				 * to update `this.config`
				 */
				schema = this.view.state.schema;
			} else {
				/**
				 * There's presently a number of issues with changing the schema of a
				 * editor inflight. A significant issue is that we lose the ability
				 * to keep track of a user's history as the internal plugin state
				 * keeps a list of Steps to undo/redo (which are tied to the schema).
				 * Without a good way to do work around this, we prevent this for now.
				 */
				// eslint-disable-next-line no-console
				console.warn('The editor does not support changing the schema dynamically.');
				return this.editorState;
			}
		} else {
			this.config = processPluginsList(this.getPlugins(options.props.preset));
			schema = createSchema(this.config);
		}

		const { contentTransformerProvider } = options.props.editorProps;

		const plugins = createPMPlugins({
			schema,
			dispatch: this.dispatch,
			errorReporter: this.errorReporter,
			editorConfig: this.config,
			eventDispatcher: this.eventDispatcher,
			providerFactory: options.props.providerFactory,
			portalProviderAPI: this.props.portalProviderAPI,
			nodeViewPortalProviderAPI: this.props.nodeViewPortalProviderAPI,
			dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
			featureFlags: this.featureFlags,
			getIntl: () => this.props.intl,
			onEditorStateUpdated: fg('platform_editor_catch_missing_injection_states')
				? this.pluginInjectionAPI.onEditorViewUpdated
				: undefined,
		});

		this.contentTransformer = contentTransformerProvider
			? contentTransformerProvider(schema)
			: undefined;

		let doc;

		const api = this.pluginInjectionAPI.api();
		// If we have a doc prop, we need to process it into a PMNode

		if (options.doc) {
			// if the collabEdit API is set, skip this validation due to potential pm validation errors
			// from docs that end up with invalid marks after processing (See #hot-111702 for more details)

			if (
				(api?.collabEdit !== undefined && fg('editor_load_conf_collab_docs_without_checks')) ||
				options.props.editorProps.skipValidation
			) {
				doc = processRawValueWithoutValidation(schema, options.doc, this.dispatchAnalyticsEvent);
			} else {
				doc = processRawValue(
					schema,
					options.doc,
					options.props.providerFactory,
					options.props.editorProps.sanitizePrivateContent,
					this.contentTransformer,
					this.dispatchAnalyticsEvent,
				);
			}
		}

		const isViewMode = api?.editorViewMode?.sharedState.currentState().mode === 'view';

		let selection: Selection | undefined;

		if (doc) {
			if (isViewMode) {
				const emptySelection = new TextSelection(doc.resolve(0));
				return EditorState.create({
					schema,
					plugins: plugins as Plugin[],
					doc,
					selection: emptySelection,
				});
			} else {
				selection = options.selectionAtStart ? Selection.atStart(doc) : Selection.atEnd(doc);
			}
		}
		// Workaround for ED-3507: When media node is the last element, scrollIntoView throws an error
		const patchedSelection = selection
			? Selection.findFrom(selection.$head, -1, true) || undefined
			: undefined;

		return EditorState.create({
			schema,
			plugins: plugins as Plugin[],
			doc,
			selection: patchedSelection,
		});
	};

	private onEditorViewStateUpdated = ({
		originalTransaction,
		transactions,
		oldEditorState,
		newEditorState,
	}: {
		originalTransaction: Transaction;
		transactions: ReadonlyArray<Transaction>;
		oldEditorState: EditorState;
		newEditorState: EditorState;
	}) => {
		this.config.onEditorViewStateUpdatedCallbacks.forEach((entry) => {
			entry.callback({
				originalTransaction,
				transactions,
				oldEditorState,
				newEditorState,
			});
		});
	};

	private dispatchTransaction = (unsafeTransaction: Transaction) => {
		if (!this.view) {
			return;
		}

		const nodes: PMNode[] = findChangedNodesFromTransaction(unsafeTransaction);
		const changedNodesValid = validateNodes(nodes);
		const transaction = new Proxy(
			unsafeTransaction,
			freezeUnsafeTransactionProperties<Transaction>({
				dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
				pluginKey: 'unknown-reacteditorview',
			}),
		);

		if (changedNodesValid) {
			const oldEditorState = this.view.state;

			// go ahead and update the state now we know the transaction is good
			const { state: editorState, transactions } = this.view.state.applyTransaction(transaction);
			if (editorState === oldEditorState) {
				return;
			}

			this.view.updateState(editorState);

			if (!fg('platform_editor_catch_missing_injection_states')) {
				this.pluginInjectionAPI.onEditorViewUpdated({
					newEditorState: editorState,
					oldEditorState,
				});
			}

			// ED-25839: Investigate if we also want to migrate this API to use `onEditorStateUpdated` in `createPMPlugins`
			this.onEditorViewStateUpdated({
				originalTransaction: transaction,
				transactions,
				oldEditorState,
				newEditorState: editorState,
			});
			if (this.props.editorProps.onChange && transaction.docChanged) {
				const source = transaction.getMeta('isRemote') ? 'remote' : 'local';

				startMeasure(EVENT_NAME_ON_CHANGE);
				this.props.editorProps.onChange(this.view, { source });
				stopMeasure(EVENT_NAME_ON_CHANGE, (duration: number, startTime: number) => {
					this.dispatchAnalyticsEvent({
						action: ACTION.ON_CHANGE_CALLBACK,
						actionSubject: ACTION_SUBJECT.EDITOR,
						eventType: EVENT_TYPE.OPERATIONAL,
						attributes: {
							duration,
							startTime,
						},
					});
				});
			}
			this.editorState = editorState;
		} else {
			const invalidNodes = nodes
				.filter((node) => !validNode(node))
				.map<SimplifiedNode | string>((node) => getDocStructure(node, { compact: true }));

			this.dispatchAnalyticsEvent({
				action: ACTION.DISPATCHED_INVALID_TRANSACTION,
				actionSubject: ACTION_SUBJECT.EDITOR,
				eventType: EVENT_TYPE.OPERATIONAL,
				attributes: {
					analyticsEventPayloads: getAnalyticsEventsFromTransaction(transaction),
					invalidNodes,
				},
			});
		}
	};

	getDirectEditorProps = (state?: EditorState): DirectEditorProps => {
		return {
			state: state || this.editorState,
			dispatchTransaction: (tr: Transaction) => {
				// Block stale transactions:
				// Prevent runtime exeptions from async transactions that would attempt to
				// update the DOM after React has unmounted the Editor.
				if (this.canDispatchTransactions) {
					this.dispatchTransaction(tr);
				}
			},
			// Disables the contentEditable attribute of the editor if the editor is disabled
			editable: (_state) => !this.props.editorProps.disabled,
			attributes: { 'data-gramm': 'false' },
		};
	};

	private createEditorView = (node: HTMLDivElement) => {
		measureRender(
			measurements.PROSEMIRROR_RENDERED,
			({ duration, startTime, distortedDuration }) => {
				this.proseMirrorRenderedSeverity = getAnalyticsEventSeverity(
					duration,
					PROSEMIRROR_RENDERED_NORMAL_SEVERITY_THRESHOLD,
					PROSEMIRROR_RENDERED_DEGRADED_SEVERITY_THRESHOLD,
				);

				if (this.view) {
					const nodes = getNodesCount(this.view.state.doc);
					const ttfb = getResponseEndTime();

					const contextIdentifier = this.pluginInjectionAPI
						.api()
						.base?.sharedState.currentState() as ContextIdentifierProvider | undefined;

					this.dispatchAnalyticsEvent({
						action: ACTION.PROSEMIRROR_RENDERED,
						actionSubject: ACTION_SUBJECT.EDITOR,
						attributes: {
							duration,
							startTime,
							nodes,
							ttfb,
							severity: this.proseMirrorRenderedSeverity,
							objectId: contextIdentifier?.objectId,
							distortedDuration,
						},
						eventType: EVENT_TYPE.OPERATIONAL,
					});
				}
			},
		);

		// Creates the editor-view from this.editorState. If an editor has been mounted
		// previously, this will contain the previous state of the editor.
		this.view = new EditorView({ mount: node }, this.getDirectEditorProps());
		this.pluginInjectionAPI.onEditorViewUpdated({
			newEditorState: this.view.state,
			oldEditorState: undefined,
		});
	};

	handleEditorViewRef = (node: HTMLDivElement) => {
		if (!this.view && node) {
			this.createEditorView(node);
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const view = this.view!;
			this.props.onEditorCreated({
				view,
				config: this.config,
				eventDispatcher: this.eventDispatcher,
				transformer: this.contentTransformer,
			});

			if (
				this.props.editorProps.shouldFocus &&
				view.props.editable &&
				view.props.editable(view.state)
			) {
				this.focusTimeoutId = handleEditorFocus(view);
			}

			// Force React to re-render so consumers get a reference to the editor view
			this.forceUpdate();
		} else if (this.view && !node) {
			// When the appearance is changed, React will call handleEditorViewRef with node === null
			// to destroy the old EditorView, before calling this method again with node === div to
			// create the new EditorView
			this.props.onEditorDestroyed({
				view: this.view,
				config: this.config,
				eventDispatcher: this.eventDispatcher,
				transformer: this.contentTransformer,
			});

			// Allows us to dispatch analytics within the plugin view.destory methods
			const analyticsConnected = this.eventDispatcher.has(
				analyticsEventKey,
				this.handleAnalyticsEvent,
			);
			if (!analyticsConnected) {
				this.eventDispatcher.on(analyticsEventKey, this.handleAnalyticsEvent);
			}

			this.view.destroy(); // Destroys the dom node & all node views

			if (!analyticsConnected) {
				this.eventDispatcher.off(analyticsEventKey, this.handleAnalyticsEvent);
			}

			this.view = undefined;
		}
	};

	dispatchAnalyticsEvent = (payload: AnalyticsEventPayload): void => {
		if (this.eventDispatcher) {
			const dispatch: AnalyticsDispatch = createDispatch(this.eventDispatcher);
			dispatch(analyticsEventKey, {
				payload,
			});
		}
	};

	private editorId = uuid();

	private createEditor = (assistiveLabel?: string, assistiveDescribedBy?: string) => {
		return (
			<div
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				className={getUAPrefix()}
				key="ProseMirror"
				ref={this.handleEditorViewRef}
				aria-label={
					assistiveLabel || this.props.intl.formatMessage(editorMessages.editorAssistiveLabel)
				}
				// setting aria-multiline to true when not mobile appearance.
				//  because somehow mobile tests are failing when it set.
				//  don't know why that is happening.
				// Created https://product-fabric.atlassian.net/jira/servicedesk/projects/DTR/queues/issue/DTR-1675
				//  to investigate further.
				aria-multiline={true}
				role="textbox"
				id={EDIT_AREA_ID}
				aria-describedby={assistiveDescribedBy}
				data-editor-id={this.editorId}
			/>
		);
	};
	private editor = this.createEditor(
		this.props.editorProps.assistiveLabel,
		this.props.editorProps?.assistiveDescribedBy,
	);

	render() {
		// Render tracking is firing too many events in Jira so we are disabling them for now. See - https://product-fabric.atlassian.net/browse/ED-25616
		const renderTrackingEnabled = !fg('platform_editor_disable_rerender_tracking_jira');
		const useShallow = true;

		return (
			<ReactEditorViewContext.Provider
				value={{
					editorRef: this.editorRef,
					editorView: this.view,
					popupsMountPoint: this.props.editorProps.popupsMountPoint,
				}}
			>
				{renderTrackingEnabled && (
					<RenderTracking
						componentProps={this.props}
						action={ACTION.RE_RENDERED}
						actionSubject={ACTION_SUBJECT.REACT_EDITOR_VIEW}
						handleAnalyticsEvent={this.handleAnalyticsEvent}
						useShallow={useShallow}
					/>
				)}
				{this.props.render
					? this.props.render?.({
							editor: this.editor,
							view: this.view,
							config: this.config,
							eventDispatcher: this.eventDispatcher,
							transformer: this.contentTransformer,
							dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
							editorRef: this.editorRef,
							editorAPI: this.props.editorAPI,
						}) ?? this.editor
					: this.editor}
			</ReactEditorViewContext.Provider>
		);
	}
}

function getUAPrefix() {
	if (browser.chrome) {
		return 'ua-chrome';
	} else if (browser.ie) {
		return 'ua-ie';
	} else if (browser.gecko) {
		return 'ua-firefox';
	} else if (browser.safari) {
		return 'ua-safari';
	}
	return '';
}

export default injectIntl(ReactEditorView);
