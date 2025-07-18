import { fg } from '@atlaskit/platform-feature-flags';

import { isContainedWithinMediaWrapper } from '../../vc-observer/media-wrapper/vc-utils';
import isNonVisualStyleMutation from '../../vc-observer/observers/non-visual-styles/is-non-visual-style-mutation';
import { RLLPlaceholderHandlers } from '../../vc-observer/observers/rll-placeholders';
import { type VCObserverEntryType } from '../types';

import { createIntersectionObserver, type VCIntersectionObserver } from './intersection-observer';
import createMutationObserver from './mutation-observer';
import createPerformanceObserver from './performance-observer';
import { type MutationData } from './types';
import checkWithinComponentAndExtractChildProps from './utils/check-within-component-and-extract-child-props';
import isInVCIgnoreIfNoLayoutShiftMarker from './utils/is-in-vc-ignore-if-no-layout-shift-marker';

function isElementVisible(element: Element) {
	if (!(element instanceof HTMLElement)) {
		return true;
	}

	try {
		const visible = element.checkVisibility({
			// @ts-ignore - visibilityProperty may not exist in all TS environments
			visibilityProperty: true,
			contentVisibilityAuto: true,
			opacityProperty: true,
		});

		return visible;
	} catch (e) {
		// there is no support for checkVisibility
		return true;
	}
}

function sameRectSize(a: DOMRect | null | undefined, b: DOMRect | null | undefined) {
	if (!a || !b) {
		return false;
	}

	return a.width === b.width && a.height === b.height;
}

function sameRectDimensions(a: DOMRect | null | undefined, b: DOMRect | null | undefined) {
	if (!a || !b) {
		return false;
	}

	return a.width === b.width && a.height === b.height && a.x === b.x && a.y === b.y;
}

export type ViewPortObserverConstructorArgs = {
	onChange(onChangeArgs: {
		readonly time: DOMHighResTimeStamp;
		readonly type: VCObserverEntryType;
		readonly elementRef: WeakRef<HTMLElement>;
		readonly visible: boolean;
		readonly rect: DOMRectReadOnly;
		readonly previousRect: DOMRectReadOnly | undefined;
		readonly mutationData?: MutationData | undefined | null;
	}): void;
	getSSRState?: () => any;
	getSSRPlaceholderHandler?: () => any;
};

const createElementMutationsWatcher =
	(removedNodeRects: (DOMRect | undefined)[]) =>
	({ target, rect }: { rect: DOMRectReadOnly; target: HTMLElement }) => {
		const isNoLsMarkerEnabled = fg('platform_vc_ignore_no_ls_mutation_marker');
		const isInIgnoreLsMarker = isInVCIgnoreIfNoLayoutShiftMarker(target);

		if (!isInIgnoreLsMarker && isNoLsMarkerEnabled) {
			return 'mutation:element';
		}

		const isRLLPlaceholder = RLLPlaceholderHandlers.getInstance().isRLLPlaceholderHydration(rect);
		if (isRLLPlaceholder && (!isNoLsMarkerEnabled || isInIgnoreLsMarker)) {
			return 'mutation:rll-placeholder';
		}

		const wasDeleted = removedNodeRects.some((nr) => sameRectDimensions(nr, rect));
		// When fg('platform_vc_ignore_no_ls_mutation_marker') is not enabled,
		// no layout shift mutation is excluded as per existing fy25.03 logic
		if (wasDeleted && (!isNoLsMarkerEnabled || isInIgnoreLsMarker)) {
			return 'mutation:element-replacement';
		}

		return 'mutation:element';
	};

export default class ViewportObserver {
	private intersectionObserver: VCIntersectionObserver | null;
	private mutationObserver: MutationObserver | null;
	private performanceObserver: PerformanceObserver | null;
	private mapVisibleNodeRects: WeakMap<Element, DOMRect>;
	private onChange: ViewPortObserverConstructorArgs['onChange'];
	private isStarted: boolean;

	// SSR context functions
	private getSSRState?: () => any;
	private getSSRPlaceholderHandler?: () => any;

	constructor({
		onChange,
		getSSRState,
		getSSRPlaceholderHandler,
	}: ViewPortObserverConstructorArgs) {
		this.mapVisibleNodeRects = new WeakMap();
		this.onChange = onChange;
		this.isStarted = false;
		this.intersectionObserver = null;
		this.mutationObserver = null;
		this.performanceObserver = null;

		// Initialize SSR context functions
		this.getSSRState = getSSRState;
		this.getSSRPlaceholderHandler = getSSRPlaceholderHandler;
	}

	private handleIntersectionEntry = ({
		target,
		rect,
		time,
		type,
		mutationData,
	}: {
		target: HTMLElement | null;
		rect: DOMRectReadOnly;
		time: DOMHighResTimeStamp;
		type: VCObserverEntryType;
		mutationData?: MutationData | null;
	}) => {
		if (!target) {
			return;
		}

		const visible = isElementVisible(target);
		const lastElementRect = this.mapVisibleNodeRects.get(target);
		this.mapVisibleNodeRects.set(target, rect);

		this.onChange({
			time,
			type,
			elementRef: new WeakRef(target),
			visible,
			rect,
			previousRect: lastElementRect,
			mutationData,
		});
	};

	private handleChildListMutation = async ({
		target,
		addedNodes,
		removedNodes,
		timestamp,
	}: {
		target: WeakRef<HTMLElement>;
		addedNodes: readonly WeakRef<HTMLElement>[];
		removedNodes: readonly WeakRef<HTMLElement>[];
		timestamp: DOMHighResTimeStamp;
	}) => {
		const removedNodeRects = removedNodes.map((ref) => {
			const n = ref.deref();

			if (!n) {
				return;
			}

			return this.mapVisibleNodeRects.get(n);
		});

		const targetNode = target.deref();

		for (const addedNodeRef of addedNodes) {
			const addedNode = addedNodeRef.deref();
			if (!addedNode) {
				continue;
			}

			// SSR hydration logic
			if (this.getSSRState && fg('platform_ufo_vc_v3_ssr_placeholder')) {
				const ssrState = this.getSSRState();
				const SSRStateEnum = { normal: 1, waitingForFirstRender: 2, ignoring: 3 };

				if (
					ssrState.state === SSRStateEnum.waitingForFirstRender &&
					timestamp > ssrState.renderStart &&
					targetNode === ssrState.reactRootElement
				) {
					ssrState.state = SSRStateEnum.ignoring;
					if (ssrState.renderStop === -1) {
						// arbitrary 500ms DOM update window
						ssrState.renderStop = timestamp + 500;
					}
					this.intersectionObserver?.watchAndTag(addedNode, 'ssr-hydration');
					continue;
				}

				if (
					ssrState.state === SSRStateEnum.ignoring &&
					timestamp > ssrState.renderStart &&
					targetNode === ssrState.reactRootElement
				) {
					if (timestamp <= ssrState.renderStop) {
						this.intersectionObserver?.watchAndTag(addedNode, 'ssr-hydration');
						continue;
					} else {
						ssrState.state = SSRStateEnum.normal;
					}
				}
			}

			// SSR placeholder logic - check and handle with await
			if (this.getSSRPlaceholderHandler && fg('platform_ufo_vc_v3_ssr_placeholder')) {
				const ssrPlaceholderHandler = this.getSSRPlaceholderHandler();
				if (ssrPlaceholderHandler) {
					if (
						ssrPlaceholderHandler.isPlaceholder(addedNode) ||
						ssrPlaceholderHandler.isPlaceholderIgnored(addedNode)
					) {
						const result = await ssrPlaceholderHandler.checkIfExistedAndSizeMatching(addedNode);
						if (result !== false) {
							this.intersectionObserver?.watchAndTag(addedNode, 'mutation:ssr-placeholder');
							continue;
						}
						// If result is false, continue to normal mutation logic below
					}

					if (
						ssrPlaceholderHandler.isPlaceholderReplacement(addedNode) ||
						ssrPlaceholderHandler.isPlaceholderIgnored(addedNode)
					) {
						const result =
							await ssrPlaceholderHandler.validateReactComponentMatchToPlaceholder(addedNode);
						if (result !== false) {
							this.intersectionObserver?.watchAndTag(addedNode, 'mutation:ssr-placeholder');
							continue;
						}
						// If result is false, continue to normal mutation logic below
					}
				}
			}

			const sameDeletedNode = removedNodes.find((ref) => {
				const n = ref.deref();
				if (!n || !addedNode) {
					return false;
				}
				return n.isEqualNode(addedNode);
			});

			const isInIgnoreLsMarker = isInVCIgnoreIfNoLayoutShiftMarker(addedNode);
			const isNoLsMarkerEnabled = fg('platform_vc_ignore_no_ls_mutation_marker');

			// When fg('platform_vc_ignore_no_ls_mutation_marker') is not enabled,
			// no layout shift mutation is excluded as per existing fy25.03 logic
			if (sameDeletedNode && (!isNoLsMarkerEnabled || isInIgnoreLsMarker)) {
				this.intersectionObserver?.watchAndTag(addedNode, 'mutation:remount');
				continue;
			}

			if (isContainedWithinMediaWrapper(addedNode)) {
				this.intersectionObserver?.watchAndTag(addedNode, 'mutation:media');
				continue;
			}

			const { isWithin: isWithinThirdPartySegment } = checkWithinComponentAndExtractChildProps(
				addedNode,
				'UFOThirdPartySegment',
			);
			if (isWithinThirdPartySegment) {
				this.intersectionObserver?.watchAndTag(addedNode, 'mutation:third-party-element');
				continue;
			}

			this.intersectionObserver?.watchAndTag(
				addedNode,
				createElementMutationsWatcher(removedNodeRects),
			);
		}
	};

	private handleAttributeMutation = ({
		target,
		attributeName,
		oldValue,
		newValue,
	}: {
		target: HTMLElement;
		attributeName: string;
		oldValue?: string | undefined | null;
		newValue?: string | undefined | null;
	}) => {
		this.intersectionObserver?.watchAndTag(target, ({ target, rect }) => {
			if (isContainedWithinMediaWrapper(target)) {
				return {
					type: 'mutation:media',
					mutationData: {
						attributeName,
						oldValue,
						newValue,
					},
				};
			}

			if (isNonVisualStyleMutation({ target, attributeName, type: 'attributes' })) {
				return {
					type: 'mutation:attribute:non-visual-style',
					mutationData: {
						attributeName,
						oldValue,
						newValue,
					},
				};
			}

			const isRLLPlaceholder = RLLPlaceholderHandlers.getInstance().isRLLPlaceholderHydration(rect);
			if (isRLLPlaceholder) {
				return {
					type: 'mutation:rll-placeholder',
					mutationData: {
						attributeName,
						oldValue,
						newValue,
					},
				};
			}

			const { isWithin: isWithinThirdPartySegment } = checkWithinComponentAndExtractChildProps(
				target,
				'UFOThirdPartySegment',
			);
			if (isWithinThirdPartySegment) {
				return {
					type: 'mutation:third-party-element',
					mutationData: {
						attributeName,
						oldValue,
						newValue,
					},
				};
			}

			const lastElementRect = this.mapVisibleNodeRects.get(target);
			if (lastElementRect && sameRectSize(rect, lastElementRect)) {
				return {
					type: 'mutation:attribute:no-layout-shift',
					mutationData: {
						attributeName,
						oldValue,
						newValue,
					},
				};
			}

			return {
				type: 'mutation:attribute',
				mutationData: {
					attributeName,
					oldValue,
					newValue,
				},
			};
		});
	};

	private handleLayoutShift = ({
		time,
		changedRects,
	}: {
		time: DOMHighResTimeStamp;
		changedRects: Array<{
			node: HTMLElement;
			rect: DOMRectReadOnly;
			previousRect: DOMRectReadOnly;
		}>;
	}) => {
		for (const changedRect of changedRects) {
			const target = changedRect.node;

			if (target) {
				this.onChange({
					time,
					elementRef: new WeakRef(target),
					visible: true,
					rect: changedRect.rect,
					previousRect: changedRect.previousRect,
					type: 'layout-shift',
				});
			}
		}
	};

	private initializeObservers() {
		if (this.isStarted) {
			return;
		}

		this.intersectionObserver = createIntersectionObserver({
			onEntry: this.handleIntersectionEntry,
		});

		this.mutationObserver = createMutationObserver({
			onChildListMutation: this.handleChildListMutation,
			onAttributeMutation: this.handleAttributeMutation,
		});

		this.performanceObserver = createPerformanceObserver({
			onLayoutShift: this.handleLayoutShift,
		});
	}

	start() {
		if (this.isStarted) {
			return;
		}

		this.initializeObservers();

		this.mutationObserver?.observe(document.body, {
			attributeOldValue: true,
			attributes: true,
			childList: true,
			subtree: true,
		});

		this.performanceObserver?.observe({
			type: 'layout-shift',
			buffered: true,
			// @ts-ignore-error
			durationThreshold: 30,
		});

		this.isStarted = true;
	}

	stop() {
		if (!this.isStarted) {
			return;
		}

		this.mutationObserver?.disconnect();
		this.intersectionObserver?.disconnect();
		this.performanceObserver?.disconnect();
		this.isStarted = false;
	}
}
