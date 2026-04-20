import React, { useEffect, useContext, useRef } from 'react';

import UFOInteractionContext from '../interaction-context';
import UFOInteractionIDContext from '../interaction-id-context';
import { addIframeSegmentData } from '../interaction-metrics';

import UFOSegment, { type Props as SegmentProps } from './segment';

// Event types from ExhaustiveFrameEventTransformMap that carry segment timing data.
const SEGMENT_TIMING_EVENTS = new Set([
	// 'user-interacted',
	'navigation-timing',
	// 'resource-timing',
	// 'dcls-score',
	'fcp-snapshot',
	'lcp-snapshot',
]);

/**
 * A typed subset of AppPerformanceProfilingEvent for timeline-driven segment timings.
 * Kept generic (no forge-ui import) so react-ufo stays decoupled.
 */
export type IframeSegmentEvent = {
	type: string;
	elapsed: number;
	[key: string]: unknown;
};

/**
 * Reads the segmentId from the UFOInteractionContext that UFOSegment provides
 * to its children, then stores it in a ref accessible to the timeline handler.
 */
function IframeSegmentIdReader({
	segmentIdRef,
}: {
	segmentIdRef: React.MutableRefObject<string | undefined>;
}) {
	const context = useContext(UFOInteractionContext);
	const labelStack = context?.labelStack;
	const segmentId =
		labelStack && labelStack.length > 0
			? (labelStack[labelStack.length - 1] as { segmentId?: string }).segmentId
			: undefined;

	if (segmentId && segmentIdRef.current !== segmentId) {
		segmentIdRef.current = segmentId;
	}

	return null;
}

/**
 * Renders null but subscribes to the performance timeline (via onRegisterIframeEventListener)
 * and forwards segment timing events into segment3pTimings. Activated only when
 * onRegisterIframeEventListener is provided to UFOThirdPartySegment.
 *
 * Raw window.postMessage / __ready handling is intentionally not implemented here;
 * consumers (e.g. Forge UI) should push validated events through the same callback.
 */
function IframeSegment({
	onRegisterIframeEventListener,
}: {
	onRegisterIframeEventListener: (listener: (event: IframeSegmentEvent) => void) => () => void;
}): React.JSX.Element {
	const interactionId = useContext(UFOInteractionIDContext);
	const segmentIdRef = useRef<string | undefined>(undefined);

	// Subscribe to the performance event timeline for segment timing data only.
	// (No timing sensitivity — these events arrive well after the listener is registered.)
	useEffect(() => {
		const handleEvent = (event: IframeSegmentEvent) => {
			if (SEGMENT_TIMING_EVENTS.has(event.type) && interactionId.current && segmentIdRef.current) {
				const { type, ...rest } = event;
				addIframeSegmentData(interactionId.current, segmentIdRef.current, {
					label: type,
					data: rest as Record<string, unknown>,
				});
			}
		};

		const unregister = onRegisterIframeEventListener(handleEvent);

		return () => {
			unregister();
		};
	}, [onRegisterIframeEventListener, interactionId]);

	return <IframeSegmentIdReader segmentIdRef={segmentIdRef} />;
}

type ThirdPartySegmentProps = Omit<SegmentProps, 'type'> & {
	/**
	 * When provided, activates iframe-specific behavior: timeline subscription that feeds
	 * segment3pTimings via addIframeSegmentData (e.g. Forge UI PerformanceAnalyticsContext).
	 */
	onRegisterIframeEventListener?: (listener: (event: IframeSegmentEvent) => void) => () => void;
};

export const UFOThirdPartySegment: {
	(props: ThirdPartySegmentProps): React.JSX.Element;
	displayName: string;
} = (props: ThirdPartySegmentProps): React.JSX.Element => {
	const { children, onRegisterIframeEventListener, ...otherProps } = props;
	return (
		<UFOSegment type="third-party" {...otherProps}>
			{onRegisterIframeEventListener && (
				<IframeSegment onRegisterIframeEventListener={onRegisterIframeEventListener} />
			)}
			{children}
		</UFOSegment>
	);
};

UFOThirdPartySegment.displayName = 'UFOThirdPartySegment';
