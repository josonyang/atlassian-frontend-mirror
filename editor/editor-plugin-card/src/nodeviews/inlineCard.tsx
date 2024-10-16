import React, { memo, useCallback, useMemo, useState } from 'react';

import rafSchedule from 'raf-schd';

import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import { handleNavigation } from '@atlaskit/editor-common/link';
import type { InlineNodeViewComponentProps } from '@atlaskit/editor-common/react-node-view';
import { type getInlineNodeViewProducer } from '@atlaskit/editor-common/react-node-view';
import { findOverflowScrollParent, UnsupportedInline } from '@atlaskit/editor-common/ui';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import { NodeSelection } from '@atlaskit/editor-prosemirror/state';
import type { Decoration, EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';
import { Card as SmartCard } from '@atlaskit/smart-card';

import { registerCard } from '../pm-plugins/actions';
import OverlayWrapper from '../ui/ConfigureOverlay';
import { getAwarenessProps } from '../utils';

import type { SmartCardProps } from './genericCard';
import { Card } from './genericCard';
import {
	InlineCardWithAwareness,
	type InlineCardWithAwarenessProps,
} from './inlineCardWithAwareness';

export const InlineCard = memo(
	({
		node,
		cardContext,
		actionOptions,
		useAlternativePreloader,
		view,
		getPos,
		onClick,
		onResolve: onRes,
		isHovered,
		showHoverPreview,
		hoverPreviewOptions,
	}: SmartCardProps) => {
		const { url, data } = node.attrs;

		const scrollContainer: HTMLElement | undefined = useMemo(
			() => findOverflowScrollParent(view.dom as HTMLElement) || undefined,
			[view.dom],
		);

		const onResolve = useCallback(
			(data: { url?: string; title?: string }) => {
				if (!getPos || typeof getPos === 'boolean') {
					return;
				}

				const { title, url } = data;
				// don't dispatch immediately since we might be in the middle of
				// rendering a nodeview
				rafSchedule(() => {
					// prosemirror-bump-fix
					const pos = getPos();

					if (typeof pos !== 'number') {
						return;
					}

					const tr = view.state.tr;

					registerCard({
						title,
						url,
						pos,
					})(tr);

					onRes?.(tr, title);

					view.dispatch(tr);
				})();
			},
			[getPos, view, onRes],
		);

		const onError = useCallback(
			(data: { url?: string; err?: Error }) => {
				const { url, err } = data;
				if (err) {
					throw err;
				}
				onResolve({ url });
			},
			[onResolve],
		);

		const card = useMemo(
			() => (
				<SmartCard
					key={url}
					url={url}
					data={data}
					appearance="inline"
					onClick={onClick}
					container={scrollContainer}
					onResolve={onResolve}
					onError={onError}
					inlinePreloaderStyle={useAlternativePreloader ? 'on-right-without-skeleton' : undefined}
					actionOptions={actionOptions}
					isHovered={isHovered}
					showHoverPreview={showHoverPreview}
					hoverPreviewOptions={hoverPreviewOptions}
				/>
			),
			[
				url,
				data,
				onClick,
				scrollContainer,
				onResolve,
				onError,
				useAlternativePreloader,
				actionOptions,
				isHovered,
				showHoverPreview,
				hoverPreviewOptions,
			],
		);

		// [WS-2307]: we only render card wrapped into a Provider when the value is ready,
		// otherwise if we got data, we can render the card directly since it doesn't need the Provider
		return cardContext && cardContext.value ? (
			<cardContext.Provider value={cardContext.value}>{card}</cardContext.Provider>
		) : data ? (
			card
		) : null;
	},
);

const WrappedInlineCardWithAwareness = Card(InlineCardWithAwareness, UnsupportedInline);
const WrappedInlineCard = Card(InlineCard, UnsupportedInline);

export type InlineCardNodeViewProps = Pick<
	SmartCardProps,
	| 'useAlternativePreloader'
	| 'actionOptions'
	| 'allowEmbeds'
	| 'allowBlockCards'
	| 'enableInlineUpgradeFeatures'
	| 'pluginInjectionApi'
	| 'onClickCallback'
	| '__livePage'
>;

export function InlineCardNodeView(
	props: InlineNodeViewComponentProps & InlineCardNodeViewProps & InlineCardWithAwarenessProps,
) {
	const {
		useAlternativePreloader,
		node,
		view,
		getPos,
		actionOptions,
		allowEmbeds,
		allowBlockCards,
		enableInlineUpgradeFeatures,
		pluginInjectionApi,
		onClickCallback,
		__livePage,
	} = props;

	const [isOverlayHovered, setIsOverlayHovered] = useState(false);

	const { editorViewModeState, selectionState } = useSharedPluginState(pluginInjectionApi, [
		'selection',
		'editorViewMode',
	]);

	const floatingToolbarNode =
		selectionState?.selection instanceof NodeSelection && selectionState?.selection.node;

	if (__livePage && fg('linking_platform_smart_links_in_live_pages')) {
		const showHoverPreview = floatingToolbarNode !== node;
		const livePagesHoverCardFadeInDelay = 800;

		const inlineCard = (
			<WrappedInlineCard
				isHovered={isOverlayHovered}
				node={node}
				view={view}
				getPos={getPos}
				actionOptions={actionOptions}
				useAlternativePreloader={useAlternativePreloader}
				onClickCallback={onClickCallback}
				showHoverPreview={showHoverPreview}
				hoverPreviewOptions={{ fadeInDelay: livePagesHoverCardFadeInDelay }}
			/>
		);

		return editorViewModeState?.mode === 'view' ? (
			inlineCard
		) : (
			<OverlayWrapper
				targetElementPos={getPos()}
				view={view}
				isHoveredCallback={setIsOverlayHovered}
				onOpenLinkClick={(event) => {
					handleNavigation({
						fireAnalyticsEvent: pluginInjectionApi?.analytics?.actions.fireAnalyticsEvent,
						onClickCallback,
						url: node.attrs.url,
						event,
					});
				}}
			>
				{inlineCard}
			</OverlayWrapper>
		);
	}

	return (
		<WrappedInlineCardWithAwareness
			node={node}
			view={view}
			getPos={getPos}
			actionOptions={actionOptions}
			useAlternativePreloader={useAlternativePreloader}
			pluginInjectionApi={pluginInjectionApi}
			onClickCallback={onClickCallback}
			{...(enableInlineUpgradeFeatures &&
				getAwarenessProps(
					view.state,
					getPos,
					allowEmbeds,
					allowBlockCards,
					editorViewModeState?.mode === 'view',
				))}
		/>
	);
}

export interface InlineCardNodeViewProperties {
	inlineCardViewProducer: ReturnType<typeof getInlineNodeViewProducer>;
}

export const inlineCardNodeView =
	({ inlineCardViewProducer }: InlineCardNodeViewProperties) =>
	(
		node: PMNode,
		view: EditorView,
		getPos: () => number | undefined,
		decorations: readonly Decoration[],
	) => {
		return inlineCardViewProducer(node, view, getPos, decorations);
	};
