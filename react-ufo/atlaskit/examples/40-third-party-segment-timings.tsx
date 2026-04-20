/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useCallback, useRef, useState } from 'react';

import { css, jsx } from '@compiled/react';

import UFOLoadHold from '@atlaskit/react-ufo/load-hold';
import UFOSegment, { UFOThirdPartySegment, type IframeSegmentEvent } from '@atlaskit/react-ufo/segment';

const containerStyle = css({
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
	fontFamily: 'Arial, sans-serif',
});

const sectionStyle = css({
	borderColor: '#dddddd',
	borderStyle: 'solid',
	borderWidth: '2px',
	borderRadius: '8px',
	padding: '20px',
	backgroundColor: '#f9f9f9',
});

export default function Example(): JSX.Element {
	const listenersRef = useRef<Set<(event: IframeSegmentEvent) => void>>(new Set());
	const [isContentLoading, setIsContentLoading] = useState(true);

	const onRegisterIframeEventListener = useCallback((listener: (event: IframeSegmentEvent) => void) => {
		listenersRef.current.add(listener);

		// Simulate the event sequence from Forge UI's PerformanceAnalyticsContext (validated timeline):
		//   1. emit-ready-event  (optional; not written to segment3pTimings)
		//   2. lcp-snapshot      → segment3pTimings[segmentId] gets { label: 'lcp-snapshot', data: { ... } }
		//   3. fcp-snapshot      → same array, { label: 'fcp-snapshot', data: { ... } } (resourceTimings shape)
		const timer = setTimeout(() => {
			const emit = (event: IframeSegmentEvent) => {
				listenersRef.current.forEach((l) => l(event));
			};

			emit({ type: 'emit-ready-event', elapsed: performance.now() });
			emit({ type: 'lcp-snapshot', elapsed: performance.now(), size: 1200, start: 250 });
			emit({ type: 'fcp-snapshot', elapsed: performance.now(), start: 120 });

			setIsContentLoading(false);
		}, 200);

		return () => {
			listenersRef.current.delete(listener);
			clearTimeout(timer);
		};
	}, []);

	return (
		<UFOSegment name="third-party-segment-timings-example">
			{/* First-party hold that keeps the interaction alive until iframe events have been emitted.
			    Models the real-world scenario where the host app (Jira, Confluence) has its own loading
			    states active while third-party iframe performance events flow in. */}
			<UFOLoadHold name="test-content-loading" hold={isContentLoading} />
			<div css={containerStyle} data-testid="main">
				<h1>UFO Third-Party Segment timings (segment3pTimings) example</h1>
				<div css={sectionStyle}>
					<h3>UFOThirdPartySegment with onRegisterIframeEventListener</h3>
					<UFOThirdPartySegment
						name="forge-iframe-widget"
						onRegisterIframeEventListener={onRegisterIframeEventListener}
					>
						<div data-testid="iframe-content">Iframe content placeholder</div>
					</UFOThirdPartySegment>
				</div>
			</div>
		</UFOSegment>
	);
}
