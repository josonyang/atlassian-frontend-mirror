import { withProfiling } from '../../../../self-measurements';
import type { VCObserverEntryType } from '../../types';
import type { MutationData } from '../types';

type TagCallback = (props: { target: HTMLElement; rect: DOMRectReadOnly }) =>
	| VCObserverEntryType
	| undefined
	| null
	| {
			type: VCObserverEntryType;
			mutationData: MutationData;
	  };

type ObserveArg_TagOrCallback = VCObserverEntryType | TagCallback;

export interface VCIntersectionObserver {
	disconnect(): void;
	unobserve(target: Element): void;
	watchAndTag: (target: Element, tagOrCallback: ObserveArg_TagOrCallback) => void;
}

const isValidEntry = withProfiling(
	function isValidEntry(entry: IntersectionObserverEntry) {
		return (
			entry.isIntersecting && entry.intersectionRect.width > 0 && entry.intersectionRect.height > 0
		);
	},
	['vc'],
);

export type IntersectionObserverArgs = {
	onEntry: (entry: {
		time: DOMHighResTimeStamp;
		type: VCObserverEntryType;
		target: HTMLElement;
		rect: DOMRectReadOnly;
		mutationData: MutationData | null | undefined;
	}) => void;
	onObserved?: (props: {
		time: DOMHighResTimeStamp;
		elements: ReadonlyArray<WeakRef<HTMLElement>>;
	}) => void;
};

export function createIntersectionObserver(
	args: IntersectionObserverArgs,
): VCIntersectionObserver | null {
	if (!window || typeof window.IntersectionObserver !== 'function') {
		return null;
	}

	const onEntry = withProfiling(args.onEntry, ['vc']);
	const onObserved =
		typeof args.onObserved === 'function' ? withProfiling(args.onObserved, ['vc']) : undefined;

	const callbacksPerElement = new WeakMap<Element, ObserveArg_TagOrCallback>();

	const intersectionObserverCallback: IntersectionObserverCallback = withProfiling(
		function intersectionObserverCallback(entries) {
			const validEntries: Array<WeakRef<HTMLElement>> = [];
			const startTime = performance.now();

			entries.forEach((entry) => {
				if (!(entry.target instanceof HTMLElement) || !isValidEntry(entry)) {
					return;
				}

				let mutationTag: VCObserverEntryType | undefined | null = null;
				let mutationData: MutationData | undefined | null = null;
				const tagOrCallback = callbacksPerElement.get(entry.target);
				if (typeof tagOrCallback === 'function') {
					const tagOrCallbackResult = tagOrCallback({
						target: entry.target,
						rect: entry.intersectionRect,
					});
					if (!tagOrCallbackResult) {
						mutationTag = 'unknown';
					} else if (typeof tagOrCallbackResult === 'string') {
						mutationTag = tagOrCallbackResult;
					} else {
						mutationTag = tagOrCallbackResult.type;
						mutationData = tagOrCallbackResult.mutationData;
					}
				} else if (typeof tagOrCallback === 'string') {
					mutationTag = tagOrCallback;
				}

				onEntry({
					target: entry.target,
					rect: entry.intersectionRect,
					time: entry.time,
					type: mutationTag ?? 'unknown',
					mutationData,
				});
				validEntries.push(new WeakRef(entry.target));

				callbacksPerElement.delete(entry.target);
				observer.unobserve(entry.target);
			});

			onObserved?.({
				time: startTime,
				elements: validEntries,
			});
		},
	);

	const observer = new IntersectionObserver(intersectionObserverCallback);

	return {
		disconnect: withProfiling(
			function disconnect() {
				observer.disconnect();
			},
			['vc'],
		),
		unobserve: withProfiling(
			function unobserve(target: Element) {
				observer.unobserve(target);
			},
			['vc'],
		),
		watchAndTag: withProfiling(
			function watchAndTag(target: Element, tagOrCallback: ObserveArg_TagOrCallback) {
				callbacksPerElement.set(target, tagOrCallback);
				observer.observe(target);
			},
			['vc'],
		),
	};
}
