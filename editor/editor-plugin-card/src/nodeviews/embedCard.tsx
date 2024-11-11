import React from 'react';

import PropTypes from 'prop-types';
import rafSchedule from 'raf-schd';

import type { RichMediaLayout } from '@atlaskit/adf-schema';
import { SetAttrsStep } from '@atlaskit/adf-schema/steps';
import type { DispatchAnalyticsEvent } from '@atlaskit/editor-common/analytics';
import type { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type { getPosHandler } from '@atlaskit/editor-common/react-node-view';
import ReactNodeView from '@atlaskit/editor-common/react-node-view';
import type {
	ColumnResizingPluginState,
	ExtractInjectionAPI,
	GridType,
	PMPluginFactoryParams,
} from '@atlaskit/editor-common/types';
import {
	findOverflowScrollParent,
	MediaSingle as RichMediaWrapper,
	UnsupportedBlock,
} from '@atlaskit/editor-common/ui';
import { floatingLayouts, isRichMediaInsideOfBlockNode } from '@atlaskit/editor-common/utils';
import { type EditorViewModePluginState } from '@atlaskit/editor-plugin-editor-viewmode';
import type { Highlights } from '@atlaskit/editor-plugin-grid';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorState, PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import {
	DEFAULT_EMBED_CARD_HEIGHT,
	DEFAULT_EMBED_CARD_WIDTH,
} from '@atlaskit/editor-shared-styles';
import { fg } from '@atlaskit/platform-feature-flags';
import { EmbedResizeMessageListener, Card as SmartCard } from '@atlaskit/smart-card';

import type { cardPlugin } from '../index';
import { registerCard } from '../pm-plugins/actions';
import ResizableEmbedCard from '../ui/ResizableEmbedCard';

import type { SmartCardProps } from './genericCard';
import { Card } from './genericCard';

interface CardProps {
	layout: RichMediaLayout;
	pctWidth?: number;
	fullWidthMode?: boolean;
}

interface CardInnerProps {
	pluginInjectionApi: ExtractInjectionAPI<typeof cardPlugin> | undefined;
	getPosSafely: () => number | undefined;
	view: EditorView;
	getLineLength: (view: EditorView, pos: number | boolean, originalLineLength: number) => number;
	smartCard: React.ReactElement;
	eventDispatcher: EventDispatcher;
	updateSize: (pctWidth: number | null, layout: RichMediaLayout) => boolean | undefined;
	getPos: getPosHandler;
	aspectRatio: number;
	allowResizing: boolean | undefined;
	hasPreview: boolean;
	heightAlone: number;
	cardProps: CardProps;
	dispatchAnalyticsEvent: DispatchAnalyticsEvent | undefined;
}

const CardInner = ({
	pluginInjectionApi,
	getPosSafely,
	getLineLength,
	view,
	smartCard,
	eventDispatcher,
	updateSize,
	getPos,
	aspectRatio,
	allowResizing,
	hasPreview,
	heightAlone,
	cardProps,
	dispatchAnalyticsEvent,
}: CardInnerProps) => {
	const { widthState, editorDisabledState } = useSharedPluginState(pluginInjectionApi, [
		'width',
		'editorDisabled',
	]);

	const widthStateLineLength = widthState?.lineLength || 0;
	const widthStateWidth = widthState?.width || 0;

	const pos = getPosSafely();
	if (pos === undefined) {
		return null;
	}
	const lineLength = getLineLength(view, pos, widthStateLineLength);

	const containerWidth = isRichMediaInsideOfBlockNode(view, pos) ? lineLength : widthStateWidth;

	if (!allowResizing || !hasPreview || editorDisabledState?.editorDisabled) {
		// There are two ways `width` and `height` can be defined here:
		// 1) Either as `heightAlone` as height value and no width
		// 2) or as `1` for height and aspectRation (defined or a default one) as a width
		// See above for how aspectRation is calculated.
		const defaultAspectRatio = DEFAULT_EMBED_CARD_WIDTH / DEFAULT_EMBED_CARD_HEIGHT;

		let richMediaWrapperHeight = 1;
		let richMediaWrapperWidth: number | undefined = aspectRatio || defaultAspectRatio;

		if (heightAlone) {
			richMediaWrapperHeight = heightAlone;
			richMediaWrapperWidth = undefined;
		}

		return (
			<RichMediaWrapper
				{...cardProps}
				height={richMediaWrapperHeight}
				width={richMediaWrapperWidth}
				nodeType="embedCard"
				hasFallbackContainer={hasPreview}
				lineLength={lineLength}
				containerWidth={containerWidth}
			>
				{smartCard}
			</RichMediaWrapper>
		);
	}

	const displayGrid = (visible: boolean, gridType: GridType, highlight: number[] | string[]) =>
		pluginInjectionApi?.grid?.actions?.displayGrid(view)({
			visible,
			gridType,
			highlight: highlight as Highlights,
		});

	return (
		<ResizableEmbedCard
			{...cardProps}
			height={heightAlone}
			aspectRatio={aspectRatio}
			view={view}
			getPos={getPos}
			lineLength={lineLength}
			gridSize={12}
			containerWidth={containerWidth}
			displayGrid={displayGrid}
			updateSize={updateSize}
			dispatchAnalyticsEvent={dispatchAnalyticsEvent}
		>
			{smartCard}
		</ResizableEmbedCard>
	);
};

export type EmbedCardState = {
	hasPreview: boolean;
	liveHeight?: number;
	initialAspectRatio?: number;
};

// eslint-disable-next-line @repo/internal/react/no-class-components
export class EmbedCardComponent extends React.PureComponent<SmartCardProps, EmbedCardState> {
	private scrollContainer?: HTMLElement;
	private embedIframeRef = React.createRef<HTMLIFrameElement>();

	constructor(props: SmartCardProps) {
		super(props);
		this.scrollContainer = findOverflowScrollParent(props.view.dom as HTMLElement) || undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	context: any;

	static contextTypes = {
		contextAdapter: PropTypes.object,
	};

	state: EmbedCardState = {
		hasPreview: true,
	};

	private getPosSafely = () => {
		const { getPos } = this.props;
		if (!getPos || typeof getPos === 'boolean') {
			return;
		}
		try {
			return getPos();
		} catch (e) {
			// Can blow up in rare cases, when node has been removed.
		}
	};

	onResolve = (data: { url?: string; title?: string; aspectRatio?: number }) => {
		const { view } = this.props;

		const { title, url, aspectRatio } = data;
		const { originalHeight, originalWidth } = this.props.node.attrs;
		if (aspectRatio && !originalHeight && !originalWidth) {
			// Assumption here is if ADF already have both height and width set,
			// we will going to use that later on in this class as aspectRatio
			// Most likely we dealing with an embed that received aspectRatio via onResolve previously
			// and now this information already stored in ADF.
			this.setState({
				initialAspectRatio: aspectRatio,
			});
			this.saveOriginalDimensionsAttributes(
				DEFAULT_EMBED_CARD_HEIGHT,
				DEFAULT_EMBED_CARD_HEIGHT * aspectRatio,
			);
		}

		// don't dispatch immediately since we might be in the middle of
		// rendering a nodeview
		rafSchedule(() => {
			const pos = this.getPosSafely();
			if (pos === undefined) {
				return;
			}
			return view.dispatch(
				registerCard({
					title,
					url,
					pos,
				})(view.state.tr),
			);
		})();

		try {
			const cardContext = this.context.contextAdapter
				? this.context.contextAdapter.card
				: undefined;

			const hasPreview = cardContext && cardContext.value.extractors.getPreview(url, 'web');

			if (!hasPreview) {
				this.setState({
					hasPreview: false,
				});
			}
		} catch (e) {}
	};

	updateSize = (pctWidth: number | null, layout: RichMediaLayout) => {
		const { state, dispatch } = this.props.view;
		const pos = this.getPosSafely();
		if (pos === undefined) {
			return;
		}
		const tr = state.tr.setNodeMarkup(pos, undefined, {
			...this.props.node.attrs,
			width: pctWidth,
			layout,
		});
		tr.setMeta('scrollIntoView', false);
		dispatch(tr);
		return true;
	};

	private getLineLength = (
		view: EditorView,
		pos: number | boolean,
		originalLineLength: number,
	): number => {
		if (typeof pos === 'number' && isRichMediaInsideOfBlockNode(view, pos)) {
			const $pos = view.state.doc.resolve(pos);
			const domNode = view.nodeDOM($pos.pos);

			if (
				$pos.nodeAfter &&
				floatingLayouts.indexOf($pos.nodeAfter.attrs.layout) > -1 &&
				domNode &&
				domNode.parentElement
			) {
				return domNode.parentElement.offsetWidth;
			}

			if (domNode instanceof HTMLElement) {
				return domNode.offsetWidth;
			}
		}

		return originalLineLength;
	};

	/**
	 * Even though render is capable of listening and reacting to iframely wrapper iframe sent `resize` events
	 * it's good idea to store latest actual height in ADF, so that when renderer (well, editor as well) is loading
	 * we will show embed window of appropriate size and avoid unnecessary content jumping.
	 */
	saveOriginalDimensionsAttributes = (height: number, width: number | undefined) => {
		const { view } = this.props;

		// TODO: ED-15663
		// Please, do not copy or use this kind of code below
		// @ts-ignore
		const fakeTableResizePluginKey = {
			key: 'tableFlexiColumnResizing$',
			getState: (state: EditorState) => {
				// eslint-disable-next-line
				return (state as any)['tableFlexiColumnResizing$'];
			},
		} as PluginKey;
		const fakeTableResizeState = fakeTableResizePluginKey.getState(view.state) as
			| ColumnResizingPluginState
			| undefined
			| null;

		// We are not updating ADF when this function fired while table is resizing.
		// Changing ADF in the middle of resize will break table resize plugin logic
		// (tables will be considered different at the end of the drag and cell size won't be stored)
		// But this is not a big problem, editor user will be seeing latest height anyway (via updated state)
		// And even if page to be saved with slightly outdated height, renderer is capable of reading latest height value
		// when embed loads, and so it won't be a problem.
		if (fakeTableResizeState?.dragging) {
			return;
		}

		rafSchedule(() => {
			const pos = this.getPosSafely();
			if (pos === undefined) {
				return;
			}
			view.dispatch(
				view.state.tr
					.step(
						new SetAttrsStep(pos, {
							originalHeight: height,
							originalWidth: width,
						}),
					)
					.setMeta('addToHistory', false),
			);
		})();
	};

	onHeightUpdate = (height: number) => {
		this.setState({ liveHeight: height });
		this.saveOriginalDimensionsAttributes(height, undefined);
	};

	onError = ({ err }: { err?: Error }) => {
		if (err) {
			throw err;
		}
	};

	render() {
		const {
			node,
			cardContext,
			allowResizing,
			fullWidthMode,
			view,
			dispatchAnalyticsEvent,
			getPos,
			pluginInjectionApi,
			actionOptions,
			onClick,
		} = this.props;

		let { url, width: pctWidth, layout, originalHeight, originalWidth } = node.attrs;

		const { hasPreview, liveHeight, initialAspectRatio } = this.state;

		// We don't want to use `originalHeight` when `originalWidth` also present,
		// since `heightAlone` is defined only when just height is available.
		let heightAlone = liveHeight ?? ((!originalWidth && originalHeight) || undefined);

		const aspectRatio =
			(!heightAlone && // No need getting aspectRatio if heightAlone defined already
				(initialAspectRatio || // If we have initialAspectRatio (coming from iframely) we should go with that
					(originalHeight && originalWidth && originalWidth / originalHeight))) || // If ADF contains both width and height we get ratio from that
			undefined;

		const cardProps = {
			layout,
			pctWidth,
			fullWidthMode,
		};

		const smartCard = (
			<SmartCard
				key={url}
				url={url}
				appearance="embed"
				onClick={onClick}
				onResolve={this.onResolve}
				onError={this.onError}
				frameStyle="show"
				inheritDimensions={true}
				platform={'web'}
				container={this.scrollContainer}
				embedIframeRef={this.embedIframeRef}
				actionOptions={actionOptions}
			/>
		);

		const cardInner = (
			<EmbedResizeMessageListener
				embedIframeRef={this.embedIframeRef}
				onHeightUpdate={this.onHeightUpdate}
			>
				<CardInner
					pluginInjectionApi={pluginInjectionApi}
					smartCard={smartCard}
					hasPreview={hasPreview}
					getPosSafely={this.getPosSafely}
					view={view}
					getLineLength={this.getLineLength}
					eventDispatcher={this.props.eventDispatcher as EventDispatcher}
					updateSize={this.updateSize}
					getPos={getPos}
					aspectRatio={aspectRatio}
					allowResizing={allowResizing}
					heightAlone={heightAlone}
					cardProps={cardProps}
					dispatchAnalyticsEvent={dispatchAnalyticsEvent}
				/>
			</EmbedResizeMessageListener>
		);

		// [WS-2307]: we only render card wrapped into a Provider when the value is ready
		return (
			<>
				{cardContext && cardContext.value ? (
					<cardContext.Provider value={cardContext.value}>{cardInner}</cardContext.Provider>
				) : null}
			</>
		);
	}
}

const WrappedBlockCard = Card(EmbedCardComponent, UnsupportedBlock);

export type EmbedCardNodeViewProps = Pick<
	SmartCardProps,
	| 'eventDispatcher'
	| 'allowResizing'
	| 'fullWidthMode'
	| 'dispatchAnalyticsEvent'
	| 'pluginInjectionApi'
	| 'actionOptions'
	| 'onClickCallback'
>;

export class EmbedCard extends ReactNodeView<EmbedCardNodeViewProps> {
	unsubscribe: (() => void) | undefined;

	viewShouldUpdate(nextNode: PMNode) {
		if (this.node.attrs !== nextNode.attrs) {
			return true;
		}

		return super.viewShouldUpdate(nextNode);
	}

	createDomRef(): HTMLElement {
		const domRef = document.createElement('div');
		// It is a tradeoff for the bug mentioned that occurs in Chrome: https://product-fabric.atlassian.net/browse/ED-5379, https://github.com/ProseMirror/prosemirror/issues/884
		if (fg('linking-platform-contenteditable-false-live-view')) {
			this.unsubscribe =
				this.reactComponentProps.pluginInjectionApi?.editorViewMode?.sharedState.onChange(
					({ nextSharedState }) => this.updateContentEditable(nextSharedState, domRef),
				);
			this.updateContentEditable(
				this.reactComponentProps.pluginInjectionApi?.editorViewMode?.sharedState.currentState(),
				domRef,
			);
		} else {
			domRef.contentEditable = 'true';
		}
		domRef.setAttribute('spellcheck', 'false');
		return domRef;
	}

	private updateContentEditable = (
		editorViewModeState: EditorViewModePluginState | null | undefined,
		divElement: HTMLDivElement,
	) => {
		divElement.contentEditable = editorViewModeState?.mode === 'view' ? 'false' : 'true';
	};

	render() {
		const {
			eventDispatcher,
			allowResizing,
			fullWidthMode,
			dispatchAnalyticsEvent,
			pluginInjectionApi,
			onClickCallback,
		} = this.reactComponentProps;

		return (
			<WrappedBlockCard
				node={this.node}
				view={this.view}
				eventDispatcher={eventDispatcher}
				getPos={this.getPos}
				allowResizing={allowResizing}
				fullWidthMode={fullWidthMode}
				dispatchAnalyticsEvent={dispatchAnalyticsEvent}
				pluginInjectionApi={pluginInjectionApi}
				onClickCallback={onClickCallback}
			/>
		);
	}

	destroy() {
		this.unsubscribe?.();
	}
}

export interface EmbedCardNodeViewProperties {
	allowResizing: EmbedCardNodeViewProps['allowResizing'];
	fullWidthMode: EmbedCardNodeViewProps['fullWidthMode'];
	pmPluginFactoryParams: PMPluginFactoryParams;
	pluginInjectionApi: ExtractInjectionAPI<typeof cardPlugin> | undefined;
	actionOptions: EmbedCardNodeViewProps['actionOptions'];
	onClickCallback: EmbedCardNodeViewProps['onClickCallback'];
}

export const embedCardNodeView =
	({
		allowResizing,
		fullWidthMode,
		pmPluginFactoryParams,
		pluginInjectionApi,
		actionOptions,
		onClickCallback,
	}: EmbedCardNodeViewProperties) =>
	(node: PMNode, view: EditorView, getPos: () => number | undefined) => {
		const { portalProviderAPI, eventDispatcher, dispatchAnalyticsEvent } = pmPluginFactoryParams;
		const reactComponentProps: EmbedCardNodeViewProps = {
			eventDispatcher,
			allowResizing,
			fullWidthMode,
			dispatchAnalyticsEvent,
			pluginInjectionApi,
			actionOptions,
			onClickCallback: onClickCallback,
		};
		return new EmbedCard(
			node,
			view,
			getPos,
			portalProviderAPI,
			eventDispatcher,
			reactComponentProps,
			undefined,
		).init();
	};
