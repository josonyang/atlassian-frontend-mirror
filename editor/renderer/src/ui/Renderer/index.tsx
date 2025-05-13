/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, {
	Fragment,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
} from 'react';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { getSchemaBasedOnStage } from '@atlaskit/adf-schema/schema-default';
import { ProviderFactory, ProviderFactoryProvider } from '@atlaskit/editor-common/provider-factory';
import {
	BaseTheme,
	IntlErrorBoundary,
	UnsupportedBlock,
	WidthProvider,
	WithCreateAnalyticsEvent,
} from '@atlaskit/editor-common/ui';
import type { Node as PMNode, Schema } from '@atlaskit/editor-prosemirror/model';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { browser } from '@atlaskit/editor-common/browser';
import { startMeasure, stopMeasure } from '@atlaskit/editor-common/performance-measures';
import { getDistortedDurationMonitor } from '@atlaskit/editor-common/performance/measure-render';
import { getResponseEndTime } from '@atlaskit/editor-common/performance/navigation';
import {
	getAnalyticsAppearance,
	getAnalyticsEventSeverity,
	shouldForceTracking,
} from '@atlaskit/editor-common/utils';
import { fg } from '@atlaskit/platform-feature-flags';

import { FabricChannel } from '@atlaskit/analytics-listeners/types';
import { FabricEditorAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { ACTION, ACTION_SUBJECT, EVENT_TYPE } from '@atlaskit/editor-common/analytics';
import { normalizeFeatureFlags } from '@atlaskit/editor-common/normalize-feature-flags';
import uuid from 'uuid/v4';
import type { MediaSSR, RendererContext } from '../../';
import { ReactSerializer, renderDocument } from '../../';
import AnalyticsContext from '../../analytics/analyticsContext';
import type { AnalyticsEventPayload, FireAnalyticsCallback } from '../../analytics/events';
import { MODE, PLATFORM } from '../../analytics/events';
import type { ReactSerializerInit } from '../../react';
import { EditorMediaClientProvider } from '../../react/utils/EditorMediaClientProvider';
import { getActiveHeadingId, isNestedHeaderLinksEnabled } from '../../react/utils/links';
import { RendererContextProvider, useRendererContext } from '../../renderer-context';
import { type Serializer } from '../../serializer';
import { findInTree } from '../../utils';
import {
	RendererContext as ActionsContext,
	RendererActionsContext,
} from '../RendererActionsContext';
import { Provider as SmartCardStorageProvider } from '../SmartCardStorage';
import { ActiveHeaderIdProvider } from '../active-header-id-provider';
import { AnnotationsPositionContext, AnnotationsWrapper } from '../annotations';
import type { RendererProps } from '../renderer-props';
import { ErrorBoundary } from './ErrorBoundary';
import { BreakoutSSRInlineScript } from './breakout-ssr';
import { isInteractiveElement } from './click-to-edit';
import { countNodes } from './count-nodes';
import { TELEPOINTER_ID } from './style';
import { TruncatedWrapper } from './truncated-wrapper';
import type { RendererAppearance } from './types';
import { ValidationContext } from './ValidationContext';
import { RendererStyleContainer } from './RendererStyleContainer';
import { getBaseFontSize } from './get-base-font-size';
import { removeEmptySpaceAroundContent } from './rendererHelper';
import { useMemoFromPropsDerivative } from './useMemoFromPropsDerivative';
import { PortalContext } from './PortalContext';

export const NORMAL_SEVERITY_THRESHOLD = 2000;
export const DEGRADED_SEVERITY_THRESHOLD = 3000;

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

const setAsQueryContainerStyles = css({
	containerName: 'ak-renderer-wrapper',
	containerType: 'inline-size',
});

const handleMouseTripleClickInTables = (event: MouseEvent) => {
	if (browser.ios || browser.android) {
		return;
	}
	const badBrowser = browser.chrome || browser.safari;
	const tripleClick = event.detail >= 3;
	if (!(badBrowser && tripleClick)) {
		return;
	}
	const selection = window.getSelection();
	if (!selection) {
		return;
	}
	const { type, anchorNode, focusNode } = selection;
	const rangeSelection = Boolean(type === 'Range' && anchorNode && focusNode);
	if (!rangeSelection) {
		return;
	}
	// Ignored via go/ees005
	// eslint-disable-next-line @atlaskit/editor/no-as-casting
	const target = event.target as HTMLElement;
	const tableCell = target.closest('td,th');
	const clickedInCell = Boolean(tableCell);
	if (!clickedInCell) {
		return;
	}
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const anchorInCell = tableCell!.contains(anchorNode);
	// Ignored via go/ees005
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const focusInCell = tableCell!.contains(focusNode);
	const selectionStartsOrEndsOutsideClickedCell = !(anchorInCell && focusInCell);
	if (!selectionStartsOrEndsOutsideClickedCell) {
		return;
	}

	// Ensure that selecting text in the renderer doesn't trigger onUnhandledClick
	// This logic originated in jira-frontend:
	// src/packages/issue/issue-view/src/views/field/rich-text/rich-text-inline-edit-view.js

	// The selection is required to be checked in `onMouseDown` and here. If not here, a new
	// selection isn't reported; if not in `onMouseDown`, a click outside the selection will
	// return an empty selection, which will erroneously fire onUnhandledClick.

	const elementToSelect: Element | null | undefined = anchorInCell
		? // Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			anchorNode!.parentElement?.closest('div,p')
		: focusInCell
			? // Ignored via go/ees005
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				focusNode!.parentElement?.closest('div,p')
			: tableCell;
	if (elementToSelect) {
		selection.selectAllChildren(elementToSelect);
	}
};

/**
 * Handle clicks inside renderer. If the click isn't on media, in the media picker, or on a
 * link, call the onUnhandledClick eventHandler (which in Jira for example, may switch the
 * renderer out for the editor).
 * @param event Click event anywhere inside renderer
 */
const handleWrapperOnClick = (
	event: React.MouseEvent,
	props: RendererProps & { startPos?: number },
	mouseDownSelection: React.MutableRefObject<string | undefined>,
) => {
	// Ignored via go/ees005
	// eslint-disable-next-line @atlaskit/editor/no-as-casting
	const targetElement = event.target as HTMLElement;

	handleMouseTripleClickInTables(event as unknown as MouseEvent);

	// ED-14862: When a user triple clicks to select a line of content inside a
	// a table cell, but the browser incorrectly moves the selection start or end into
	// a different table cell, we manually set the selection back to within the original
	// table cell the user intended to target
	if (!props.eventHandlers?.onUnhandledClick) {
		return;
	}
	if (!(targetElement instanceof window.Element)) {
		return;
	}

	// Ignored via go/ees005
	// eslint-disable-next-line @atlaskit/editor/no-as-casting
	const rendererWrapper = event.currentTarget as HTMLElement;

	const isInteractiveElementInTree = findInTree(
		targetElement,
		rendererWrapper,
		isInteractiveElement,
	);
	if (isInteractiveElementInTree) {
		return;
	}

	// Ensure that selecting text in the renderer doesn't trigger onUnhandledClick
	// This logic originated in jira-frontend:
	// src/packages/issue/issue-view/src/views/field/rich-text/rich-text-inline-edit-view.js

	// The selection is required to be checked in `onMouseDown` and here. If not here, a new
	// selection isn't reported; if not in `onMouseDown`, a click outside the selection will
	// return an empty selection, which will erroneously fire onUnhandledClick.
	const windowSelection = window.getSelection();
	const selection: string | undefined =
		windowSelection !== null ? windowSelection.toString() : undefined;
	const hasSelection = selection && selection.length !== 0;

	const hasSelectionMouseDown =
		mouseDownSelection.current && mouseDownSelection.current.length !== 0;
	const allowEditBasedOnSelection = !hasSelection && !hasSelectionMouseDown;

	if (allowEditBasedOnSelection) {
		props.eventHandlers.onUnhandledClick(event);
	}
};

export const RendererFunctionalComponent = (
	props: RendererProps & { startPos?: number; skipValidation?: boolean },
) => {
	const { createAnalyticsEvent } = props;
	const mouseDownSelection = useRef<string | undefined>(undefined);
	const providerFactory = useMemo(
		() => props.dataProviders || new ProviderFactory(),
		[props.dataProviders],
	);

	const createRendererContext = useMemo(
		() =>
			(
				featureFlags: RendererProps['featureFlags'],
				isTopLevelRenderer: RendererProps['isTopLevelRenderer'],
			) => {
				const normalizedFeatureFlags = normalizeFeatureFlags(featureFlags);
				return {
					featureFlags: normalizedFeatureFlags,
					isTopLevelRenderer: isTopLevelRenderer === undefined,
				};
			},
		[],
	);

	const fireAnalyticsEventOld: FireAnalyticsCallback = useCallback(
		(event) => {
			const { createAnalyticsEvent } = props;

			if (createAnalyticsEvent) {
				const channel = FabricChannel.editor;
				createAnalyticsEvent(event).fire(channel);
			}
		},
		[props],
	);

	const fireAnalyticsEventNew: FireAnalyticsCallback = useCallback(
		(event) => {
			if (createAnalyticsEvent) {
				const channel = FabricChannel.editor;
				createAnalyticsEvent(event).fire(channel);
			}
		},
		[createAnalyticsEvent],
	);

	const fireAnalyticsEvent = editorExperiment(
		'platform_renderer_fix_analytics_memo_callback',
		true,
		{ exposure: true },
	)
		? fireAnalyticsEventNew
		: fireAnalyticsEventOld;

	const deriveSerializerProps = useCallback(
		(props: RendererProps & { startPos?: number }): ReactSerializerInit => {
			const stickyHeaders = props.stickyHeaders
				? props.stickyHeaders === true
					? {}
					: props.stickyHeaders
				: undefined;
			const { annotationProvider } = props;
			const allowAnnotationsDraftMode = Boolean(
				annotationProvider &&
					annotationProvider.inlineComment &&
					annotationProvider.inlineComment.allowDraftMode,
			);
			const { featureFlags } = createRendererContext(props.featureFlags, props.isTopLevelRenderer);
			return {
				startPos: props.startPos ?? 0,
				providers: providerFactory,
				eventHandlers: props.eventHandlers,
				extensionHandlers: props.extensionHandlers,
				portal: props.portal,
				objectContext: {
					adDoc: props.shouldRemoveEmptySpaceAroundContent
						? removeEmptySpaceAroundContent(props.document)
						: props.document,
					schema: props.schema,
					...props.rendererContext,
				} as RendererContext,
				appearance: props.appearance,
				disableHeadingIDs: props.disableHeadingIDs,
				disableActions: props.disableActions,
				allowHeadingAnchorLinks: props.allowHeadingAnchorLinks,
				allowColumnSorting: props.allowColumnSorting,
				fireAnalyticsEvent: fireAnalyticsEvent,
				shouldOpenMediaViewer: props.shouldOpenMediaViewer,
				allowAltTextOnImages: props.allowAltTextOnImages,
				stickyHeaders,
				allowMediaLinking: props.media && props.media.allowLinking,
				surroundTextNodesWithTextWrapper: allowAnnotationsDraftMode,
				media: props.media,
				emojiResourceConfig: props.emojiResourceConfig,
				smartLinks: props.smartLinks,
				extensionViewportSizes: props.extensionViewportSizes,
				allowCopyToClipboard: props.allowCopyToClipboard,
				allowWrapCodeBlock: props.allowWrapCodeBlock,
				allowCustomPanels: props.allowCustomPanels,
				allowAnnotations: props.allowAnnotations,
				allowSelectAllTrap: props.allowSelectAllTrap,
				allowPlaceholderText: props.allowPlaceholderText,
				nodeComponents: props.nodeComponents,
				allowWindowedCodeBlock: featureFlags?.allowWindowedCodeBlock,
				isInsideOfInlineExtension: props.isInsideOfInlineExtension,
				isPresentational: props.UNSTABLE_isPresentational,
				textHighlighter: props.textHighlighter || props.UNSTABLE_textHighlighter,
				allowTableAlignment: props.UNSTABLE_allowTableAlignment,
				allowTableResizing: props.UNSTABLE_allowTableResizing,
			};
		},
		[createRendererContext, providerFactory, fireAnalyticsEvent],
	);

	// Abstract out the logic into its own function
	const serializer = useMemoFromPropsDerivative(
		(serializerProps) => {
			// If progressive rendering is enabled, create a new serializer
			if (fg('cc_complexit_fe_progressive_adf_rendering')) {
				const newSerializer = props.createSerializer?.(serializerProps);
				if (newSerializer) {
					return newSerializer;
				}
			}
			return new ReactSerializer(serializerProps);
		},
		deriveSerializerProps,
		props,
	);

	const localRef = useRef<HTMLDivElement>(null);
	const editorRef = props.innerRef || localRef;
	const id = useMemo(() => uuid(), []);
	const renderedMeasurementDistortedDurationMonitor = useMemo(
		() => getDistortedDurationMonitor(),
		[],
	);

	// we are doing this to ensure it runs as
	// early as possible in the React lifecycle
	// to avoid any other side effects
	const measureStarted = useRef(false);

	const startAnalyticsMeasure = () => {
		startMeasure(`Renderer Render Time: ${id}`);
	};

	if (!measureStarted.current) {
		startAnalyticsMeasure();
		measureStarted.current = true;
	}

	const anchorLinkAnalytics = useCallback(() => {
		const hash = window.location.hash && decodeURIComponent(window.location.hash.slice(1));
		const disableHeadingIDs = props.disableHeadingIDs;

		if (!disableHeadingIDs && hash && editorRef && editorRef.current instanceof HTMLElement) {
			const anchorLinkElement = document.getElementById(hash);
			if (anchorLinkElement && editorRef.current.contains(anchorLinkElement)) {
				fireAnalyticsEvent({
					action: ACTION.VIEWED,
					actionSubject: ACTION_SUBJECT.ANCHOR_LINK,
					attributes: { platform: PLATFORM.WEB, mode: MODE.RENDERER },
					eventType: EVENT_TYPE.UI,
				});
			}
		}
	}, [props.disableHeadingIDs, editorRef, fireAnalyticsEvent]);

	const getSchema = useMemo(() => {
		return (schema?: Schema, adfStage?: 'final' | 'stage0') => {
			if (schema) {
				return schema;
			}
			return getSchemaBasedOnStage(adfStage);
		};
	}, []);

	const onMouseDownEditView = () => {
		const windowSelection = window.getSelection();
		mouseDownSelection.current = windowSelection !== null ? windowSelection.toString() : undefined;
	};

	const { dataProviders, analyticsEventSeverityTracking } = props;

	useEffect(() => {
		let rafID: number;

		const handleAnalytics = () => {
			fireAnalyticsEvent({
				action: ACTION.STARTED,
				actionSubject: ACTION_SUBJECT.RENDERER,
				attributes: { platform: PLATFORM.WEB },
				eventType: EVENT_TYPE.UI,
			});

			rafID = requestAnimationFrame(() => {
				stopMeasure(`Renderer Render Time: ${id}`, (duration) => {
					const forceSeverityTracking =
						typeof analyticsEventSeverityTracking === 'undefined' && shouldForceTracking();

					const severity =
						!!forceSeverityTracking || analyticsEventSeverityTracking?.enabled
							? getAnalyticsEventSeverity(
									duration,
									analyticsEventSeverityTracking?.severityNormalThreshold ??
										NORMAL_SEVERITY_THRESHOLD,
									analyticsEventSeverityTracking?.severityDegradedThreshold ??
										DEGRADED_SEVERITY_THRESHOLD,
								)
							: undefined;

					const isTTRTrackingExplicitlyDisabled = analyticsEventSeverityTracking?.enabled === false;

					if (!isTTRTrackingExplicitlyDisabled) {
						fireAnalyticsEvent({
							action: ACTION.RENDERED,
							actionSubject: ACTION_SUBJECT.RENDERER,
							attributes: {
								platform: PLATFORM.WEB,
								duration,
								// Ignored via go/ees005
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								distortedDuration: renderedMeasurementDistortedDurationMonitor!.distortedDuration,
								ttfb: getResponseEndTime(),
								nodes: countNodes(props.document),
								severity,
							},
							eventType: EVENT_TYPE.OPERATIONAL,
						});
					}

					// Ignored via go/ees005
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					renderedMeasurementDistortedDurationMonitor!.cleanup();
				});
				anchorLinkAnalytics();
			});
		};

		handleAnalytics();

		return () => {
			if (rafID) {
				window.cancelAnimationFrame(rafID);
			}

			// if this is the ProviderFactory which was created in constructor
			// it's safe to destroy it on Renderer unmount
			// updated to match existing class component
			if (!dataProviders) {
				providerFactory.destroy();
			}
		};
		// we are going to ignore this because I'm doing this on purpose
		// having a dependency array means we run stopMeasure twice per render
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const rendererContext = useMemo(
		() => createRendererContext(props.featureFlags, props.isTopLevelRenderer),
		[props.featureFlags, props.isTopLevelRenderer, createRendererContext],
	);

	try {
		const schema = getSchema(props.schema, props.adfStage);
		const { result, stat, pmDoc } = renderDocument(
			props.shouldRemoveEmptySpaceAroundContent
				? removeEmptySpaceAroundContent(props.document)
				: props.document,
			serializer as Serializer<JSX.Element>,
			schema,
			props.adfStage,
			props.useSpecBasedValidator,
			id,
			fireAnalyticsEvent,
			props.unsupportedContentLevelsTracking,
			props.appearance,
			props.includeNodesCountInStats,
			props.skipValidation,
		);
		if (props.onComplete) {
			props.onComplete(stat);
		}

		const rendererOutput = (
			<RendererContextProvider value={rendererContext}>
				<ActiveHeaderIdProvider value={getActiveHeadingId(props.allowHeadingAnchorLinks)}>
					<AnalyticsContext.Provider
						value={{
							fireAnalyticsEvent: (event: AnalyticsEventPayload) => fireAnalyticsEvent(event),
						}}
					>
						<SmartCardStorageProvider>
							<ProviderFactoryProvider value={providerFactory}>
								<RendererWrapper
									allowAnnotations={props.allowAnnotations}
									appearance={props.appearance}
									allowNestedHeaderLinks={isNestedHeaderLinksEnabled(props.allowHeadingAnchorLinks)}
									allowColumnSorting={props.allowColumnSorting}
									allowCopyToClipboard={props.allowCopyToClipboard}
									allowWrapCodeBlock={props.allowWrapCodeBlock}
									allowCustomPanels={props.allowCustomPanels}
									allowPlaceholderText={props.allowPlaceholderText}
									useBlockRenderForCodeBlock={
										rendererContext.featureFlags.useBlockRenderForCodeBlock ?? true
									}
									addTelepointer={props.addTelepointer}
									innerRef={editorRef}
									onClick={(event) => handleWrapperOnClick(event, props, mouseDownSelection)}
									onMouseDown={onMouseDownEditView}
									ssr={props.media?.ssr}
									isInsideOfInlineExtension={props.isInsideOfInlineExtension}
									isTopLevelRenderer={rendererContext.isTopLevelRenderer}
									shouldRemoveEmptySpaceAroundContent={props.shouldRemoveEmptySpaceAroundContent}
								>
									{props.enableSsrInlineScripts || props.noOpSSRInlineScript ? (
										<BreakoutSSRInlineScript
											noOpSSRInlineScript={Boolean(props.noOpSSRInlineScript)}
										/>
									) : null}
									<RendererActionsInternalUpdater
										doc={pmDoc}
										schema={schema}
										onAnalyticsEvent={fireAnalyticsEvent}
									>
										{result}
									</RendererActionsInternalUpdater>
								</RendererWrapper>
							</ProviderFactoryProvider>
						</SmartCardStorageProvider>
					</AnalyticsContext.Provider>
				</ActiveHeaderIdProvider>
			</RendererContextProvider>
		);

		const rendererResult = props.truncated ? (
			<TruncatedWrapper height={props.maxHeight} fadeHeight={props.fadeOutHeight}>
				{rendererOutput}
			</TruncatedWrapper>
		) : (
			rendererOutput
		);

		return <Fragment>{rendererResult}</Fragment>;
	} catch (e) {
		if (props.onError) {
			props.onError(e);
		}
		return (
			<RendererWrapper
				allowAnnotations={props.allowAnnotations}
				appearance={props.appearance}
				allowCopyToClipboard={props.allowCopyToClipboard}
				allowWrapCodeBlock={props.allowWrapCodeBlock}
				allowPlaceholderText={props.allowPlaceholderText}
				allowColumnSorting={props.allowColumnSorting}
				allowNestedHeaderLinks={isNestedHeaderLinksEnabled(props.allowHeadingAnchorLinks)}
				useBlockRenderForCodeBlock={rendererContext.featureFlags.useBlockRenderForCodeBlock ?? true}
				addTelepointer={props.addTelepointer}
				onClick={(event) => handleWrapperOnClick(event, props, mouseDownSelection)}
				isTopLevelRenderer={rendererContext.isTopLevelRenderer}
			>
				<UnsupportedBlock />
			</RendererWrapper>
		);
	}
};

const RendererFunctionalComponentMemoized = React.memo(RendererFunctionalComponent);

const RendererFunctionalComponentWithPortalContext = (
	props: RendererProps & { startPos?: number; skipValidation?: boolean },
) => {
	const { portal, ...propsWithoutPortal } = props;

	return (
		<PortalContext.Provider value={portal}>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<RendererFunctionalComponent {...propsWithoutPortal} />
		</PortalContext.Provider>
	);
};

const RendererFunctionalComponentWithPortalContextMemoized = React.memo(
	RendererFunctionalComponentWithPortalContext,
);

const getRendererComponent = (nodeComponents: RendererProps['nodeComponents']) => {
	// If nodeComponents are provided, for now we don't want to remove portal from props
	// and use context instead because at this time we cannot guarantee that existing
	// consumers of Atlaskit Renderer will update to use the new portal context.
	if (!Boolean(nodeComponents) && fg('cc_complexit_reduce_portal_rerenders')) {
		if (fg('cc_perf_reduce_rerenders')) {
			return RendererFunctionalComponentWithPortalContextMemoized;
		}
		return RendererFunctionalComponentWithPortalContext;
	}

	if (fg('cc_perf_reduce_rerenders')) {
		return RendererFunctionalComponentMemoized;
	}

	return RendererFunctionalComponent;
};

export function Renderer(props: RendererProps) {
	const { startPos } = React.useContext(AnnotationsPositionContext);
	const { isTopLevelRenderer } = useRendererContext();
	const { skipValidation } = useContext(ValidationContext) || {};

	const RendererComponent = getRendererComponent(props.nodeComponents);

	return (
		<RendererComponent
			// Ignored via go/ees005
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
			startPos={startPos}
			isTopLevelRenderer={isTopLevelRenderer}
			skipValidation={skipValidation}
		/>
	);
}

// Usage notes:
// Used by Confluence for View page renderer
// For the nested renderers - see RendererWithAnnotationSelection.
export const RendererWithAnalytics = React.memo((props: RendererProps) => (
	<FabricEditorAnalyticsContext
		data={{
			appearance: getAnalyticsAppearance(props.appearance),
			packageName,
			packageVersion,
			componentName: 'renderer',
			editorSessionId: uuid(),
		}}
	>
		<WithCreateAnalyticsEvent
			render={(createAnalyticsEvent) => {
				// `IntlErrorBoundary` only captures Internationalisation errors, leaving others for `ErrorBoundary`.
				return (
					<ErrorBoundary
						component={ACTION_SUBJECT.RENDERER}
						rethrowError
						fallbackComponent={null}
						createAnalyticsEvent={createAnalyticsEvent}
					>
						<IntlErrorBoundary>
							<Renderer
								// Ignored via go/ees005
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...props}
								createAnalyticsEvent={createAnalyticsEvent}
							/>
						</IntlErrorBoundary>
					</ErrorBoundary>
				);
			}}
		/>
	</FabricEditorAnalyticsContext>
));

export type RendererWrapperProps = {
	allowAnnotations?: boolean;
	appearance: RendererAppearance;
	innerRef?: React.RefObject<HTMLDivElement>;
	allowColumnSorting?: boolean;
	allowCopyToClipboard?: boolean;
	allowWrapCodeBlock?: boolean;
	allowPlaceholderText?: boolean;
	allowCustomPanels?: boolean;
	addTelepointer?: boolean;
	allowNestedHeaderLinks: boolean;
	useBlockRenderForCodeBlock: boolean;
	onClick?: (event: React.MouseEvent) => void;
	onMouseDown?: (event: React.MouseEvent) => void;
	ssr?: MediaSSR;
	isInsideOfInlineExtension?: boolean;
	allowTableResizing?: boolean;
	isTopLevelRenderer?: boolean;
	shouldRemoveEmptySpaceAroundContent?: boolean;
} & { children?: React.ReactNode };

const RendererWrapper = React.memo((props: RendererWrapperProps) => {
	const {
		allowColumnSorting,
		allowNestedHeaderLinks,
		innerRef,
		appearance,
		children,
		onClick,
		onMouseDown,
		useBlockRenderForCodeBlock,
		addTelepointer,
		ssr,
		isInsideOfInlineExtension,
		allowTableResizing,
		isTopLevelRenderer,
	} = props;

	const createTelepointer = () => {
		const telepointer = document.createElement('span');
		telepointer.textContent = '\u200b';
		telepointer.id = TELEPOINTER_ID;
		return telepointer;
	};

	const initialUpdate = React.useRef(true);

	useEffect(() => {
		// We must check if window is defined, if it isn't we are in a SSR environment
		// and we don't want to add the telepointer
		if (typeof window !== 'undefined' && addTelepointer && innerRef?.current) {
			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const renderer = innerRef.current.querySelector<HTMLElement>('.ak-renderer-document')!;

			if (initialUpdate.current) {
				const lastChild = renderer.lastChild;
				lastChild && lastChild.appendChild(createTelepointer());
			}

			const mutateTelepointer = (mutations: MutationRecord[]) => {
				mutations.forEach((mutation: MutationRecord) => {
					if (initialUpdate.current) {
						const oldTelepointer = renderer.querySelector(`#${TELEPOINTER_ID}`);
						if (oldTelepointer) {
							oldTelepointer.remove();
						}
						const lastChild = renderer.lastChild;
						lastChild && lastChild.appendChild(createTelepointer());
						initialUpdate.current = false;
					}

					if (mutation.type === 'characterData') {
						const parentNode = mutation.target.parentElement;

						if (parentNode) {
							const oldTelepointer = renderer.querySelector(`#${TELEPOINTER_ID}`);
							if (oldTelepointer) {
								oldTelepointer.remove();
							}
							// Ignored via go/ees005
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							parentNode!.appendChild(createTelepointer());
						}
					}
				});
			};

			const observer = new MutationObserver(mutateTelepointer);

			observer.observe(innerRef.current, {
				characterData: true,
				attributes: false,
				childList: true,
				subtree: true,
			});

			return () => observer.disconnect();
		}
	}, [innerRef, addTelepointer]);

	const renderer = (
		<WidthProvider
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className={`ak-renderer-wrapper is-${appearance}`}
			data-appearance={appearance}
			shouldCheckExistingValue={isInsideOfInlineExtension}
		>
			<BaseTheme baseFontSize={getBaseFontSize(appearance)}>
				<EditorMediaClientProvider ssr={ssr}>
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
					<RendererStyleContainer
						innerRef={innerRef}
						onClick={onClick}
						onMouseDown={onMouseDown}
						appearance={appearance}
						allowNestedHeaderLinks={allowNestedHeaderLinks}
						allowColumnSorting={!!allowColumnSorting}
						useBlockRenderForCodeBlock={useBlockRenderForCodeBlock}
						allowAnnotations={props.allowAnnotations}
						allowTableResizing={allowTableResizing}
					>
						{children}
					</RendererStyleContainer>
				</EditorMediaClientProvider>
			</BaseTheme>
		</WidthProvider>
	);

	// We can only make the wrapper div query container when we have a known width.
	// This is also required for SSR to work correctly. As WidthProvider/WithConsumer will not have the correct width during SSR.
	//
	// We are setting this wrapper div as query container conditionally.
	// Only apply container-type = inline-size when having a known width in full-page/full-width/comment mode.
	// Otherwise when appearance is unspecified the renderer size is decided by the content.
	// In this case we can't set the container-type = inline-size as it will collapse width to 0.
	return appearance === 'comment' &&
		// In case of having excerpt-include on page there are multiple renderers nested.
		// Make sure only the root renderer is set to be query container.
		isTopLevelRenderer &&
		fg('platform-ssr-table-resize') ? (
		<div css={setAsQueryContainerStyles}>{renderer}</div>
	) : (
		renderer
	);
});

const RootRendererContext = React.createContext<{ doc?: PMNode } | null>(null);

function RendererActionsInternalUpdater({
	children,
	doc,
	schema,
	onAnalyticsEvent,
}: {
	doc?: PMNode;
	schema: Schema;
	children: JSX.Element | null;
	onAnalyticsEvent?: (event: AnalyticsEventPayload) => void;
}) {
	const rootRendererContextValue = React.useContext(RootRendererContext);
	const actions = useContext(ActionsContext);
	const rendererRef = useRef(null);

	// This doc is used by the renderer actions when applying comments to the document.
	// (via hand crafted steps based on non prosemirror based position calculations)
	// It is set to the root renderer's doc as otherwise the resulting document will
	// be incorrect (nested renderers use a fake document which represents a subset
	// of the actual document).
	let _doc: PMNode | undefined;

	if (editorExperiment('comment_on_bodied_extensions', true) && rootRendererContextValue) {
		// If rootRendererContextValue is set -- we are inside a nested renderer
		// and should always use the doc from the root renderer
		_doc = rootRendererContextValue.doc;
	} else {
		// If rootRendererContextValue is not set -- we are in the root renderer
		// and set the doc to the current doc.
		_doc = doc;
	}

	useLayoutEffect(() => {
		if (_doc) {
			actions._privateRegisterRenderer(rendererRef, _doc, schema, onAnalyticsEvent);
		} else {
			actions._privateUnregisterRenderer();
		}

		return () => actions._privateUnregisterRenderer();
	}, [actions, schema, _doc, onAnalyticsEvent]);

	if (editorExperiment('comment_on_bodied_extensions', true)) {
		return (
			<RootRendererContext.Provider value={{ doc: _doc }}>{children}</RootRendererContext.Provider>
		);
	}

	return children;
}

// Usage notes:
// Used by Confluence for nested renderers
// For the View page renderer - see RendererWithAnalytics
const RendererWithAnnotationSelection = (props: RendererProps) => {
	const { allowAnnotations, document: adfDocument } = props;
	const localRef = React.useRef<HTMLDivElement>(null);
	const innerRef = props.innerRef || localRef;

	if (!allowAnnotations) {
		// Ignored via go/ees005
		// eslint-disable-next-line react/jsx-props-no-spreading
		return <RendererWithAnalytics innerRef={innerRef} {...props} />;
	}

	return (
		<RendererActionsContext>
			<AnnotationsWrapper
				rendererRef={innerRef}
				adfDocument={adfDocument}
				annotationProvider={props.annotationProvider}
				isNestedRender
			>
				<RendererWithAnalytics
					innerRef={innerRef}
					// Ignored via go/ees005
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}
					featureFlags={props.featureFlags}
				/>
			</AnnotationsWrapper>
		</RendererActionsContext>
	);
};

// eslint-disable-next-line @repo/internal/deprecations/deprecation-ticket-required -- Ignored via go/ED-25883
/* @deprecated using this version of the renderer causes the RendererActions to inaccessible from any consumers */
export default RendererWithAnnotationSelection;
